import { useState, useCallback } from 'react';

interface CompressionOptions {
  quality?: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'webp' | 'png';
  maintainAspectRatio?: boolean;
  progressive?: boolean;
  stripMetadata?: boolean;
}

interface CompressionResult {
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  timeTaken: number;
  dimensions: {
    original: { width: number; height: number };
    compressed: { width: number; height: number };
  };
}

interface CompressionState {
  isCompressing: boolean;
  progress: number;
  error: string | null;
  lastResult: CompressionResult | null;
}

const defaultOptions: Required<CompressionOptions> = {
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
  format: 'jpeg',
  maintainAspectRatio: true,
  progressive: true,
  stripMetadata: true
};

export const useImageCompression = () => {
  const [state, setState] = useState<CompressionState>({
    isCompressing: false,
    progress: 0,
    error: null,
    lastResult: null
  });

  // Get optimal compression settings based on device capabilities
  const getOptimalSettings = useCallback((
    originalSize: number,
    deviceType: 'mobile' | 'tablet' | 'desktop' = 'mobile',
    connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium'
  ): CompressionOptions => {
    let settings: CompressionOptions = { ...defaultOptions };

    // Adjust based on device type
    if (deviceType === 'mobile') {
      settings.maxWidth = 1280;
      settings.maxHeight = 720;
      settings.quality = 0.7;
    } else if (deviceType === 'tablet') {
      settings.maxWidth = 1600;
      settings.maxHeight = 900;
      settings.quality = 0.75;
    }

    // Adjust based on connection speed
    if (connectionSpeed === 'slow') {
      settings.quality = Math.max(0.5, settings.quality! - 0.2);
      settings.maxWidth = Math.min(settings.maxWidth!, 1024);
      settings.maxHeight = Math.min(settings.maxHeight!, 576);
    } else if (connectionSpeed === 'fast') {
      settings.quality = Math.min(0.9, settings.quality! + 0.1);
    }

    // Adjust based on original file size
    if (originalSize > 10 * 1024 * 1024) { // > 10MB
      settings.quality = Math.max(0.6, settings.quality! - 0.1);
      settings.maxWidth = Math.min(settings.maxWidth!, 1600);
      settings.maxHeight = Math.min(settings.maxHeight!, 900);
    } else if (originalSize < 1024 * 1024) { // < 1MB
      settings.quality = Math.min(0.9, settings.quality! + 0.1);
    }

    return settings;
  }, []);

  // Load image from file
  const loadImage = useCallback((file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  }, []);

  // Calculate new dimensions
  const calculateDimensions = useCallback((
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number,
    maintainAspectRatio: boolean
  ) => {
    if (!maintainAspectRatio) {
      return { width: maxWidth, height: maxHeight };
    }

    const aspectRatio = originalWidth / originalHeight;
    let newWidth = originalWidth;
    let newHeight = originalHeight;

    // Scale down if necessary
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = newWidth / aspectRatio;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    }

    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight)
    };
  }, []);

  // Compress single image
  const compressImage = useCallback(async (
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> => {
    const startTime = Date.now();
    const opts = { ...defaultOptions, ...options };

    setState(prev => ({
      ...prev,
      isCompressing: true,
      progress: 0,
      error: null
    }));

    try {
      // Load image
      setState(prev => ({ ...prev, progress: 20 }));
      const img = await loadImage(file);
      
      const originalDimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };

      // Calculate new dimensions
      setState(prev => ({ ...prev, progress: 40 }));
      const newDimensions = calculateDimensions(
        originalDimensions.width,
        originalDimensions.height,
        opts.maxWidth,
        opts.maxHeight,
        opts.maintainAspectRatio
      );

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      canvas.width = newDimensions.width;
      canvas.height = newDimensions.height;

      // Configure canvas for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw image
      setState(prev => ({ ...prev, progress: 60 }));
      ctx.drawImage(img, 0, 0, newDimensions.width, newDimensions.height);

      // Convert to blob
      setState(prev => ({ ...prev, progress: 80 }));
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          `image/${opts.format}`,
          opts.quality
        );
      });

      // Create compressed file
      const compressedFile = new File(
        [blob],
        file.name.replace(/\.[^/.]+$/, `.${opts.format}`),
        {
          type: `image/${opts.format}`,
          lastModified: Date.now()
        }
      );

      const result: CompressionResult = {
        compressedFile,
        originalSize: file.size,
        compressedSize: blob.size,
        compressionRatio: (1 - blob.size / file.size) * 100,
        timeTaken: Date.now() - startTime,
        dimensions: {
          original: originalDimensions,
          compressed: newDimensions
        }
      };

      setState(prev => ({
        ...prev,
        isCompressing: false,
        progress: 100,
        lastResult: result
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Compression failed';
      
      setState(prev => ({
        ...prev,
        isCompressing: false,
        progress: 0,
        error: errorMessage
      }));

      throw error;
    }
  }, [loadImage, calculateDimensions]);

  // Compress multiple images
  const compressImages = useCallback(async (
    files: File[],
    options: CompressionOptions = {},
    onProgress?: (completed: number, total: number) => void
  ): Promise<CompressionResult[]> => {
    const results: CompressionResult[] = [];
    
    setState(prev => ({
      ...prev,
      isCompressing: true,
      progress: 0,
      error: null
    }));

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update progress
        const overallProgress = (i / files.length) * 100;
        setState(prev => ({ ...prev, progress: overallProgress }));
        onProgress?.(i, files.length);

        try {
          const result = await compressImage(file, options);
          results.push(result);
        } catch (error) {
          console.error(`Failed to compress ${file.name}:`, error);
          // Continue with other files
        }
      }

      setState(prev => ({
        ...prev,
        isCompressing: false,
        progress: 100
      }));

      onProgress?.(files.length, files.length);
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Batch compression failed';
      
      setState(prev => ({
        ...prev,
        isCompressing: false,
        progress: 0,
        error: errorMessage
      }));

      throw error;
    }
  }, [compressImage]);

  // Get compression preview (without actually compressing)
  const getCompressionPreview = useCallback(async (
    file: File,
    options: CompressionOptions = {}
  ): Promise<{
    estimatedSize: number;
    estimatedDimensions: { width: number; height: number };
    estimatedCompressionRatio: number;
  }> => {
    const opts = { ...defaultOptions, ...options };
    
    try {
      const img = await loadImage(file);
      
      const originalDimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };

      const newDimensions = calculateDimensions(
        originalDimensions.width,
        originalDimensions.height,
        opts.maxWidth,
        opts.maxHeight,
        opts.maintainAspectRatio
      );

      // Estimate compressed size based on quality and dimensions
      const pixelReduction = (newDimensions.width * newDimensions.height) / 
                           (originalDimensions.width * originalDimensions.height);
      const qualityFactor = opts.quality;
      const formatFactor = opts.format === 'jpeg' ? 0.8 : opts.format === 'webp' ? 0.7 : 1.0;
      
      const estimatedSize = Math.round(
        file.size * pixelReduction * qualityFactor * formatFactor
      );

      const estimatedCompressionRatio = (1 - estimatedSize / file.size) * 100;

      return {
        estimatedSize,
        estimatedDimensions: newDimensions,
        estimatedCompressionRatio
      };
    } catch (error) {
      throw new Error('Failed to generate compression preview');
    }
  }, [loadImage, calculateDimensions]);

  // Reset state
  const reset = useCallback(() => {
    setState({
      isCompressing: false,
      progress: 0,
      error: null,
      lastResult: null
    });
  }, []);

  // Format file size for display
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    compressImage,
    compressImages,
    getCompressionPreview,
    getOptimalSettings,
    reset,
    
    // Utilities
    formatFileSize,
    
    // Helper functions
    isSupported: (format: string) => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
    },
    
    getSupportedFormats: () => {
      const formats = ['jpeg', 'png'];
      const canvas = document.createElement('canvas');
      
      // Check WebP support
      if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
        formats.push('webp');
      }
      
      return formats;
    }
  };
}; 