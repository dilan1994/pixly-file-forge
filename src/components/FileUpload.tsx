import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileImage, AlertCircle, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
  targetFormat: string;
  isConverting: boolean;
}

export const FileUpload = ({ onFilesAdded, targetFormat, isConverting }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((file) => {
        toast.error(`${file.file.name}: ${file.errors[0].message}`);
      });
    }

    if (acceptedFiles.length > 0) {
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null) return 0;
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setUploadProgress(null), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      onFilesAdded(acceptedFiles);
      toast.success(`${acceptedFiles.length} file(s) added for conversion to ${targetFormat.toUpperCase()}`);
    }
  }, [onFilesAdded, targetFormat]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.bmp', '.gif', '.tiff', '.svg', '.ico'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false)
  });

  const getDropzoneStyle = () => {
    if (isDragReject) return 'border-red-500 bg-red-50 dark:bg-red-900/20';
    if (isDragAccept) return 'border-green-500 bg-green-50 dark:bg-green-900/20';
    if (isDragActive || dragActive) return 'border-primary bg-primary/5';
    return 'border-border hover:border-primary/50';
  };

  const getIconColor = () => {
    if (isDragReject) return 'text-red-500';
    if (isDragAccept) return 'text-green-500';
    if (isDragActive || dragActive) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${getDropzoneStyle()}
          ${isConverting ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-xl" />
        </div>

        {/* Upload Content */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {uploadProgress !== null ? (
              <motion.div
                key="progress"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary animate-bounce" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Uploading files...</p>
                  <div className="w-full max-w-xs mx-auto bg-accent rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-6"
              >
                {/* Upload Icon */}
                <motion.div
                  animate={{
                    scale: isDragActive ? 1.1 : 1,
                    rotate: isDragActive ? 5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <div className="w-20 h-20 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
                    {isDragReject ? (
                      <X className={`w-10 h-10 ${getIconColor()}`} />
                    ) : isDragAccept ? (
                      <CheckCircle className={`w-10 h-10 ${getIconColor()}`} />
                    ) : (
                      <FileImage className={`w-10 h-10 ${getIconColor()}`} />
                    )}
                  </div>
                  
                  {/* Floating Upload Icon */}
                  <motion.div
                    animate={{
                      y: isDragActive ? -10 : 0,
                      opacity: isDragActive ? 1 : 0.7
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Upload className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                </motion.div>

                {/* Upload Text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    {isDragActive
                      ? isDragReject
                        ? 'Some files are not supported'
                        : 'Drop your files here'
                      : 'Drag & drop your images here'
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    or{' '}
                    <span className="text-primary font-medium hover:underline">
                      click to browse
                    </span>
                  </p>
                </div>

                {/* Supported Formats */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Converting to: <span className="font-semibold text-primary">{targetFormat.toUpperCase()}</span>
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['JPG', 'PNG', 'WebP', 'HEIC', 'BMP', 'GIF', 'TIFF', 'SVG', 'ICO', 'PDF'].map((format) => (
                      <span
                        key={format}
                        className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs font-medium"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {/* File Limits */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Maximum file size: 10MB per file</p>
                  <p>• Multiple files supported</p>
                  <p>• All processing happens in your browser</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drag Overlay */}
        <AnimatePresence>
          {(isDragActive || dragActive) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/10 rounded-xl border-2 border-primary border-dashed flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-center"
              >
                <Upload className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-lg font-semibold text-primary">
                  {isDragReject ? 'Invalid file type' : 'Drop files here'}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
