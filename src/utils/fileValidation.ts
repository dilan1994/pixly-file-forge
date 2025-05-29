
import { SupportedFormat } from '@/types';

export const SUPPORTED_FORMATS: SupportedFormat[] = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'bmp', 'gif'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }

  // Check file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase() as SupportedFormat;
  const isValidType = SUPPORTED_FORMATS.includes(fileExtension) || 
                     file.type.startsWith('image/');

  if (!isValidType) {
    return {
      valid: false,
      error: 'Unsupported file format. Please use JPG, PNG, WebP, HEIC, BMP, or GIF files.'
    };
  }

  return { valid: true };
};

export const getFileFormat = (file: File): string => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'jpeg') return 'jpg';
  return extension || 'unknown';
};
