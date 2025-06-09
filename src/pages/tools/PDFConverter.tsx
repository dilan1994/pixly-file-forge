import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Image, 
  Download, 
  Settings, 
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Configure PDF.js worker with fallback options
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
  } catch (error) {
    console.warn('Failed to set PDF.js worker, using fallback');
    // Fallback to local worker if CDN fails
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }
}

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: Blob;
  error?: string;
}

interface ConversionSettings {
  outputFormat: 'jpg' | 'png';
  quality: number;
  dpi: number;
  pageSize: 'A4' | 'Letter' | 'Legal' | 'Custom';
  orientation: 'portrait' | 'landscape';
  compression: 'low' | 'medium' | 'high';
}

type ConversionMode = 'pdf-to-images' | 'images-to-pdf';

const PDFConverter: React.FC = () => {
  const [mode, setMode] = useState<ConversionMode>('pdf-to-images');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState<ConversionSettings>({
    outputFormat: 'jpg',
    quality: 85,
    dpi: 150,
    pageSize: 'A4',
    orientation: 'portrait',
    compression: 'medium'
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize PDF.js when component mounts
  React.useEffect(() => {
    console.log('Worker source:', pdfjsLib.GlobalWorkerOptions.workerSrc);
    
    // Test if PDF.js is working by checking its API
    if (!pdfjsLib.getDocument) {
      console.error('PDF.js getDocument not available');
      toast.error('PDF processing is not available. Please refresh the page.');
    } else {
      console.log('PDF.js initialized successfully');
    }
  }, []);

  // File validation
  const validateFile = (file: File): string | null => {
    if (mode === 'pdf-to-images') {
      if (file.type !== 'application/pdf') {
        return 'Please select PDF files only';
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        return 'PDF file size must be less than 50MB';
      }
    } else {
      if (!file.type.startsWith('image/')) {
        return 'Please select image files only';
      }
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        return 'Image file size must be less than 20MB';
      }
    }
    return null;
  };

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error: any) => {
        toast.error(`${file.name}: ${error.message}`);
      });
    });

    // Process accepted files
    acceptedFiles.forEach(file => {
      const validationError = validateFile(file);
      if (validationError) {
        toast.error(`${file.name}: ${validationError}`);
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        progress: 0
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles(prev => prev.map(f => 
            f.id === newFile.id 
              ? { ...f, preview: e.target?.result as string }
              : f
          ));
        };
        reader.readAsDataURL(file);
      }

      setFiles(prev => [...prev, newFile]);
    });
  }, [mode]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mode === 'pdf-to-images' 
      ? { 'application/pdf': ['.pdf'] }
      : { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'] },
    multiple: mode === 'images-to-pdf'
  });

  // Remove file
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Clear all files
  const clearAllFiles = () => {
    setFiles([]);
  };

  // Convert PDF to Images
  const convertPdfToImages = async (file: UploadedFile): Promise<Blob[]> => {
    try {
      console.log('Starting PDF to Images conversion for:', file.name);
      const arrayBuffer = await file.file.arrayBuffer();
      console.log('ArrayBuffer size:', arrayBuffer.byteLength);
      
      // Load PDF document
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useSystemFonts: true,
        disableFontFace: false,
        enableXfa: false
      } as any);
      
      console.log('Loading task created, waiting for promise...');
      const pdf = await loadingTask.promise;
      console.log('PDF loaded successfully, pages:', pdf.numPages);
      
      const images: Blob[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        console.log(`Processing page ${pageNum}/${pdf.numPages}`);
        
        const page = await pdf.getPage(pageNum);
        const scale = settings.dpi / 72; // Convert DPI to scale
        const viewport = page.getViewport({ scale });
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Failed to get 2D context');
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        console.log(`Page ${pageNum} rendered to canvas`);

        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          }, `image/${settings.outputFormat}`, settings.quality / 100);
        });

        images.push(blob);
        console.log(`Page ${pageNum} converted to ${settings.outputFormat}`);

        // Update progress
        const progress = (pageNum / pdf.numPages) * 100;
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ));
      }

      console.log('PDF conversion completed, total images:', images.length);
      return images;
    } catch (error) {
      console.error('Error in convertPdfToImages:', error);
      throw error;
    }
  };

  // Convert Images to PDF
  const convertImagesToPdf = async (files: UploadedFile[]): Promise<Blob> => {
    try {
      console.log('Starting Images to PDF conversion for', files.length, 'files');
      
      const pdf = new jsPDF({
        orientation: settings.orientation,
        unit: 'mm',
        format: settings.pageSize.toLowerCase() as any
      });

      let isFirstPage = true;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Processing image ${i + 1}/${files.length}:`, file.name);
        
        // Create image element
        const img = document.createElement('img');
        
        // Load image
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = (error) => {
            console.error('Failed to load image:', error);
            reject(new Error(`Failed to load image: ${file.name}`));
          };
          
          if (file.preview) {
            img.src = file.preview;
          } else {
            const reader = new FileReader();
            reader.onload = (e) => {
              img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file.file);
          }
        });

        // Add new page (except for the first image)
        if (!isFirstPage) {
          pdf.addPage();
        }
        isFirstPage = false;

        // Calculate dimensions to fit page while maintaining aspect ratio
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;

        let width, height, x, y;
        
        if (imgRatio > pageRatio) {
          // Image is wider than page ratio
          width = pageWidth;
          height = pageWidth / imgRatio;
          x = 0;
          y = (pageHeight - height) / 2;
        } else {
          // Image is taller than page ratio
          height = pageHeight;
          width = pageHeight * imgRatio;
          x = (pageWidth - width) / 2;
          y = 0;
        }

        // Add image to PDF
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = canvas.toDataURL(`image/${settings.outputFormat}`, settings.quality / 100);
        pdf.addImage(imageData, settings.outputFormat.toUpperCase(), x, y, width, height);
        
        console.log(`Image ${i + 1} added to PDF`);

        // Update progress
        const progress = ((i + 1) / files.length) * 100;
        setFiles(prev => prev.map(f => 
          files.includes(f) ? { ...f, progress } : f
        ));
      }

      const pdfBlob = pdf.output('blob');
      console.log('PDF creation completed');
      return pdfBlob;
    } catch (error) {
      console.error('Error in convertImagesToPdf:', error);
      throw error;
    }
  };

  // Start conversion process
  const startConversion = async () => {
    console.log('Start conversion button clicked!');
    
    if (files.length === 0) {
      toast.error('Please upload files first');
      return;
    }

    console.log('Starting conversion process...');
    console.log('Mode:', mode);
    console.log('Files to convert:', files.length);
    console.log('Settings:', settings);

    setIsProcessing(true);
    toast.loading('Starting conversion...');

    try {
      if (mode === 'pdf-to-images') {
        // Convert each PDF file
        for (const file of files) {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'processing' } : f
          ));

          try {
            const images = await convertPdfToImages(file);
            
            // Create ZIP if multiple images
            if (images.length > 1) {
              const zip = new JSZip();
              images.forEach((img, index) => {
                const filename = `${file.name.replace('.pdf', '')}_page_${index + 1}.${settings.outputFormat}`;
                zip.file(filename, img);
              });
              const zipBlob = await zip.generateAsync({ type: 'blob' });
              
              setFiles(prev => prev.map(f => 
                f.id === file.id 
                  ? { ...f, status: 'completed', progress: 100, result: zipBlob }
                  : f
              ));
            } else {
              setFiles(prev => prev.map(f => 
                f.id === file.id 
                  ? { ...f, status: 'completed', progress: 100, result: images[0] }
                  : f
              ));
            }
          } catch (error) {
            console.error('PDF conversion error:', error);
            setFiles(prev => prev.map(f => 
              f.id === file.id 
                ? { ...f, status: 'error', error: 'Failed to convert PDF' }
                : f
            ));
          }
        }
      } else {
        // Convert images to PDF
        const imageFiles = files.filter(f => f.status === 'pending');
        
        setFiles(prev => prev.map(f => 
          imageFiles.includes(f) ? { ...f, status: 'processing' } : f
        ));

        try {
          const pdfBlob = await convertImagesToPdf(imageFiles);
          
          setFiles(prev => prev.map(f => 
            imageFiles.includes(f) 
              ? { ...f, status: 'completed', progress: 100, result: pdfBlob }
              : f
          ));
        } catch (error) {
          console.error('Images to PDF conversion error:', error);
          setFiles(prev => prev.map(f => 
            imageFiles.includes(f) 
              ? { ...f, status: 'error', error: 'Failed to create PDF' }
              : f
          ));
        }
      }

      toast.dismiss(); // Dismiss loading toast
      toast.success('Conversion completed!');
    } catch (error) {
      console.error('Conversion error:', error);
      toast.dismiss(); // Dismiss loading toast
      toast.error('Conversion failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download file
  const downloadFile = (file: UploadedFile) => {
    if (!file.result) return;

    const url = URL.createObjectURL(file.result);
    const a = document.createElement('a');
    a.href = url;
    
    if (mode === 'pdf-to-images') {
      a.download = file.result.type === 'application/zip' 
        ? `${file.name.replace('.pdf', '')}_pages.zip`
        : `${file.name.replace('.pdf', '')}.${settings.outputFormat}`;
    } else {
      a.download = 'converted_images.pdf';
    }
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const hasResults = completedFiles.length > 0;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      {/* Hidden canvas for PDF rendering */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Tools</span>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">
            PDF Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert PDF to images and images to PDF with professional quality
          </p>
        </div>

        {/* Mode Selector */}
        <div className="mb-8">
          <div className="flex bg-gray-800 rounded-2xl p-1.5 max-w-md futuristic-mode-selector">
            <button
              onClick={() => {
                setMode('pdf-to-images');
                clearAllFiles();
              }}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                mode === 'pdf-to-images'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/50 scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-700/50'
              }`}
            >
              <FileText size={20} />
              <span className="font-semibold">PDF to Images</span>
            </button>
            
            <button
              onClick={() => {
                setMode('images-to-pdf');
                clearAllFiles();
              }}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                mode === 'images-to-pdf'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-xl shadow-purple-500/50 scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-700/50'
              }`}
            >
              <Image size={20} />
              <span className="font-semibold">Images to PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload and Files Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload Area */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {mode === 'pdf-to-images' ? 'Upload PDF Files' : 'Upload Images'}
              </h3>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <input {...getInputProps()} />
                <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground mb-2">
                  {isDragActive
                    ? 'Drop files here...'
                    : 'Drag and drop files here, or click to select'}
                </p>
                <p className="text-muted-foreground text-sm">
                  {mode === 'pdf-to-images' 
                    ? 'Supports PDF files up to 50MB'
                    : 'Supports JPG, PNG, GIF, BMP, WebP up to 20MB each'
                  }
                </p>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Uploaded Files ({files.length})
                  </h3>
                  <button
                    onClick={clearAllFiles}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {files.map(file => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg"
                    >
                      {/* File Icon/Preview */}
                      <div className="flex-shrink-0">
                        {file.preview ? (
                          <img 
                            src={file.preview} 
                            alt={file.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                            <FileText size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {formatFileSize(file.size)}
                        </p>
                        
                        {/* Progress Bar */}
                        {file.status === 'processing' && (
                          <div className="mt-2">
                            <div className="bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {Math.round(file.progress)}% complete
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {file.status === 'pending' && (
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                        {file.status === 'processing' && (
                          <Loader size={18} className="text-blue-400 animate-spin" />
                        )}
                        {file.status === 'completed' && (
                          <div className="flex gap-2">
                            <CheckCircle size={18} className="text-green-400" />
                            <button
                              onClick={() => downloadFile(file)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Download size={18} />
                            </button>
                          </div>
                        )}
                        {file.status === 'error' && (
                          <AlertCircle size={18} className="text-red-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings and Actions */}
          <div className="space-y-6">
            {/* Conversion Settings */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings size={20} />
                Settings
              </h3>
              
              {mode === 'pdf-to-images' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Output Format
                    </label>
                    <select
                      value={settings.outputFormat}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        outputFormat: e.target.value as 'jpg' | 'png' 
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="jpg">JPG</option>
                      <option value="png">PNG</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Quality: {settings.quality}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={settings.quality}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        quality: parseInt(e.target.value) 
                      }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      DPI: {settings.dpi}
                    </label>
                    <input
                      type="range"
                      min="72"
                      max="300"
                      value={settings.dpi}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        dpi: parseInt(e.target.value) 
                      }))}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Page Size
                    </label>
                    <select
                      value={settings.pageSize}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        pageSize: e.target.value as any 
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="A4">A4</option>
                      <option value="Letter">Letter</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Orientation
                    </label>
                    <select
                      value={settings.orientation}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        orientation: e.target.value as 'portrait' | 'landscape' 
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Compression
                    </label>
                    <select
                      value={settings.compression}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        compression: e.target.value as any 
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="low">Low (Best Quality)</option>
                      <option value="medium">Medium</option>
                      <option value="high">High (Smallest Size)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Convert Button */}
            <button
              onClick={startConversion}
              disabled={files.length === 0 || isProcessing}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all ${
                files.length === 0 || isProcessing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader size={20} className="animate-spin" />
                  Converting...
                </div>
              ) : (
                'Start Conversion'
              )}
            </button>

            {/* Download All Button */}
            {hasResults && (
              <button
                onClick={() => {
                  completedFiles.forEach(file => downloadFile(file));
                }}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download All ({completedFiles.length})
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-12 bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <div>
                <h4 className="text-foreground font-medium">High Quality Output</h4>
                <p className="text-muted-foreground text-sm">Maintain image quality with customizable DPI settings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <div>
                <h4 className="text-foreground font-medium">Batch Processing</h4>
                <p className="text-muted-foreground text-sm">Convert multiple files simultaneously</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <div>
                <h4 className="text-foreground font-medium">Multiple Formats</h4>
                <p className="text-muted-foreground text-sm">Support for JPG, PNG, and various image formats</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <div>
                <h4 className="text-foreground font-medium">No File Size Limits</h4>
                <p className="text-muted-foreground text-sm">Process large PDF files up to 50MB</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <div>
                <h4 className="text-foreground font-medium">Privacy Focused</h4>
                <p className="text-muted-foreground text-sm">All processing happens in your browser</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <div>
                <h4 className="text-foreground font-medium">Custom Page Sizes</h4>
                <p className="text-muted-foreground text-sm">Choose from A4, Letter, Legal, and more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFConverter;