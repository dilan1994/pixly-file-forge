
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { ConvertedFile, ConversionSettings } from '@/types';
import { convertImage, getTargetMimeType, getFileExtension } from '@/utils/imageConverter';
import { validateFile, getFileFormat } from '@/utils/fileValidation';

export const useImageConverter = () => {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const addFiles = useCallback((newFiles: File[], targetFormat: string) => {
    const validFiles: ConvertedFile[] = [];

    newFiles.forEach((file) => {
      const validation = validateFile(file);
      
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`);
        return;
      }

      const sourceFormat = getFileFormat(file);
      if (sourceFormat === targetFormat) {
        toast.error(`${file.name} is already in ${targetFormat.toUpperCase()} format`);
        return;
      }

      const convertedFile: ConvertedFile = {
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        status: 'pending',
        progress: 0,
        outputFormat: targetFormat,
        outputFileName: `${file.name.split('.')[0]}.${getFileExtension(targetFormat)}`
      };

      validFiles.push(convertedFile);
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`Added ${validFiles.length} file(s) for conversion`);
    }
  }, []);

  const convertFiles = useCallback(async (settings: ConversionSettings) => {
    const pendingFiles = files.filter(file => file.status === 'pending');
    
    if (pendingFiles.length === 0) {
      toast.error('No files to convert');
      return;
    }

    setIsConverting(true);

    for (const file of pendingFiles) {
      try {
        // Update status to converting
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'converting', progress: 0 }
            : f
        ));

        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === file.id && f.status === 'converting'
              ? { ...f, progress: Math.min(f.progress + 10, 90) }
              : f
          ));
        }, 100);

        const targetMimeType = getTargetMimeType(file.outputFormat);
        const convertedBlob = await convertImage(file.originalFile, targetMimeType, settings);
        
        clearInterval(progressInterval);

        // Update with completed conversion
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: 'completed', 
                progress: 100,
                convertedBlob,
                convertedUrl: URL.createObjectURL(convertedBlob)
              }
            : f
        ));

        toast.success(`Converted ${file.originalFile.name}`);

      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: 'error', 
                progress: 0,
                error: error instanceof Error ? error.message : 'Conversion failed'
              }
            : f
        ));

        toast.error(`Failed to convert ${file.originalFile.name}`);
      }
    }

    setIsConverting(false);
  }, [files]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file?.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach(file => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
    });
    setFiles([]);
    toast.success('Cleared all files');
  }, [files]);

  return {
    files,
    isConverting,
    addFiles,
    convertFiles,
    removeFile,
    clearAll
  };
};
