
import heic2any from 'heic2any';
import { ConvertedFile, ConversionSettings } from '@/types';

export const convertImage = async (
  file: File,
  targetFormat: string,
  settings: ConversionSettings = { quality: 0.9, format: 'image/jpeg', maintainAspectRatio: true }
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      let processedFile = file;

      // Handle HEIC files first
      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        try {
          const convertedHeic = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: settings.quality
          });
          
          // heic2any can return Blob or Blob[]
          const heicBlob = Array.isArray(convertedHeic) ? convertedHeic[0] : convertedHeic;
          processedFile = new File([heicBlob], file.name.replace(/\.heic$/i, '.jpg'), {
            type: 'image/jpeg'
          });
        } catch (heicError) {
          console.error('HEIC conversion error:', heicError);
          reject(new Error('Failed to convert HEIC file'));
          return;
        }
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;

          // Clear canvas with white background for JPEG
          if (targetFormat === 'image/jpeg') {
            ctx!.fillStyle = '#FFFFFF';
            ctx!.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx!.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert image'));
              }
            },
            targetFormat,
            settings.quality
          );
        } catch (canvasError) {
          reject(new Error('Canvas processing failed'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(processedFile);
    } catch (error) {
      reject(new Error('Image conversion failed'));
    }
  });
};

export const getTargetMimeType = (format: string): string => {
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'bmp': 'image/bmp',
    'gif': 'image/gif'
  };
  return mimeTypes[format.toLowerCase()] || 'image/jpeg';
};

export const getFileExtension = (format: string): string => {
  return format === 'jpg' ? 'jpg' : format.toLowerCase();
};
