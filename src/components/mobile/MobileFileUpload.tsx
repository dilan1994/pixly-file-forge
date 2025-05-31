import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useCamera } from '@/hooks/useCamera';
import { useGestures } from '@/hooks/useGestures';
import { CameraCapture } from '@/components/camera/CameraCapture';
import { 
  Upload, 
  Camera, 
  Image, 
  FileImage, 
  Plus,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

interface MobileFileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFormats?: string[];
  maxFiles?: number;
  maxFileSize?: number;
  className?: string;
}

export const MobileFileUpload: React.FC<MobileFileUploadProps> = ({
  onFilesSelected,
  acceptedFormats = ['image/*'],
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  className = ''
}) => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useMobileDetection();
  const { capabilities: cameraCapabilities } = useCamera();
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCameraCapture, setShowCameraCapture] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Set up gesture handling for mobile
  useGestures(dropZoneRef, {
    onSwipe: (direction) => {
      if (direction === 'up' && isMobile && cameraCapabilities.hasCamera) {
        setShowCameraCapture(true);
      }
    },
    onTap: () => {
      fileInputRef.current?.click();
    },
    onLongPress: () => {
      if (isMobile) {
        // Show options menu
        handleShowOptions();
      }
    }
  });

  const validateFile = useCallback((file: File): boolean => {
    // Check file size
    if (file.size > maxFileSize) {
      setUploadError(`File "${file.name}" is too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB`);
      return false;
    }

    // Check file type
    const isValidType = acceptedFormats.some(format => {
      if (format === 'image/*') {
        return file.type.startsWith('image/');
      }
      return file.type === format || file.name.toLowerCase().endsWith(format.replace('*', ''));
    });

    if (!isValidType) {
      setUploadError(`File "${file.name}" is not a supported format`);
      return false;
    }

    return true;
  }, [maxFileSize, acceptedFormats]);

  const handleFileSelection = useCallback((files: FileList | File[]) => {
    setUploadError(null);
    const fileArray = Array.from(files);
    
    // Validate files
    const validFiles = fileArray.filter(validateFile);
    
    if (validFiles.length === 0) {
      return;
    }

    // Check max files limit
    if (selectedFiles.length + validFiles.length > maxFiles) {
      setUploadError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, maxFiles, validateFile, onFilesSelected]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileSelection(files);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  }, [handleFileSelection]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files) {
      handleFileSelection(files);
    }
  }, [handleFileSelection]);

  const handleCameraCapture = useCallback((file: File) => {
    setShowCameraCapture(false);
    handleFileSelection([file]);
  }, [handleFileSelection]);

  const handleRemoveFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, onFilesSelected]);

  const handleShowOptions = useCallback(() => {
    // Show mobile options menu
    const options = [];
    
    if (cameraCapabilities.hasCamera) {
      options.push({
        label: t('camera.takePhoto'),
        action: () => setShowCameraCapture(true),
        icon: <Camera className="w-5 h-5" />
      });
    }
    
    options.push({
      label: t('camera.chooseFromGallery'),
      action: () => fileInputRef.current?.click(),
      icon: <Image className="w-5 h-5" />
    });

    // For now, just trigger file input - could be enhanced with a proper options modal
    fileInputRef.current?.click();
  }, [cameraCapabilities.hasCamera, t]);

  const isMobileDevice = isMobile || isTablet;

  return (
    <>
      <div className={`mobile-file-upload ${className}`}>
        {/* Main Upload Area */}
        <motion.div
          ref={dropZoneRef}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
            ${isDragOver 
              ? 'border-primary bg-primary/10 scale-105' 
              : 'border-border hover:border-primary/50 hover:bg-accent/20'
            }
            ${isMobileDevice ? 'min-h-[200px] touch-manipulation' : 'min-h-[160px]'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFormats.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            capture={isMobileDevice ? "environment" : undefined}
          />

          <div className="space-y-4">
            {/* Upload Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Upload Text */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isMobileDevice ? t('upload.mobile.title') : t('upload.title')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {isMobileDevice ? t('upload.mobile.subtitle') : t('upload.browse')}
              </p>
            </div>

            {/* Mobile Action Buttons */}
            {isMobileDevice && (
              <div className="flex gap-3 justify-center">
                {cameraCapabilities.hasCamera && (
                  <button
                    onClick={() => setShowCameraCapture(true)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t('camera.takePhoto')}</span>
                  </button>
                )}
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                >
                  <Image className="w-4 h-4" />
                  <span>{t('camera.chooseFromGallery')}</span>
                </button>
              </div>
            )}

            {/* Desktop Click Area */}
            {!isMobileDevice && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                {t('upload.browse')}
              </button>
            )}

            {/* Upload Info */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>{t('upload.max_size')}</p>
              <p>{t('upload.supported_formats')}</p>
              {isMobileDevice && cameraCapabilities.hasCamera && (
                <p className="text-primary">{t('upload.mobile.swipeUp')}</p>
              )}
            </div>
          </div>

          {/* Drag Overlay */}
          <AnimatePresence>
            {isDragOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center"
              >
                <div className="text-center">
                  <Plus className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-primary font-medium">{t('upload.dropHere')}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {uploadError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-red-600 text-sm">{uploadError}</span>
              <button
                onClick={() => setUploadError(null)}
                className="ml-auto text-red-500 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Files Preview */}
        <AnimatePresence>
          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                {t('upload.selectedFiles', { count: selectedFiles.length })}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedFiles.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg border border-border"
                  >
                    <FileImage className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="p-1 hover:bg-red-500/10 rounded text-red-500 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Camera Capture Modal */}
      <AnimatePresence>
        {showCameraCapture && (
          <CameraCapture
            onCapture={handleCameraCapture}
            onClose={() => setShowCameraCapture(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}; 