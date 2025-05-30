export interface ConvertedFile {
  id: string;
  originalFile: File;
  convertedBlob?: Blob;
  convertedUrl?: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress: number;
  outputFormat: string;
  outputFileName: string;
  error?: string;
}

export interface ConversionSettings {
  quality: number;
  format: string;
  maintainAspectRatio: boolean;
}

export type SupportedFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'heic' | 'bmp' | 'gif' | 'pdf' | 'tiff' | 'ico';

export interface ConversionTab {
  id: string;
  label: string;
  fromFormat: SupportedFormat;
  toFormat: SupportedFormat;
  description: string;
  icon?: string;
  gradient?: string;
}
