
import heic2any from 'heic2any';
import { PDFDocument } from 'pdf-lib';
import { ConvertedFile, ConversionSettings } from '@/types';

export const convertImage = async (
  file: File,
  targetFormat: string,
  settings: ConversionSettings = { quality: 0.9, format: 'image/jpeg', maintainAspectRatio: true }
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      let processedFile = file;

      // Handle PDF to JPG conversion
      if (file.type === 'application/pdf' && targetFormat !== 'application/pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const pages = pdfDoc.getPages();
          
          if (pages.length === 0) {
            reject(new Error('PDF has no pages'));
            return;
          }

          // For now, convert only the first page
          // In a full implementation, you'd want to handle multiple pages
          const page = pages[0];
          const { width, height } = page.getSize();
          
          // Create a canvas to render the PDF page
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;

          // Note: This is a simplified approach. For proper PDF rendering,
          // you'd typically use pdf.js or similar library
          ctx!.fillStyle = '#FFFFFF';
          ctx!.fillRect(0, 0, canvas.width, canvas.height);
          ctx!.fillStyle = '#000000';
          ctx!.font = '16px Arial';
          ctx!.fillText('PDF content (placeholder)', 50, 50);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert PDF page'));
              }
            },
            targetFormat,
            settings.quality
          );
          return;
        } catch (pdfError) {
          console.error('PDF conversion error:', pdfError);
          reject(new Error('Failed to convert PDF file'));
          return;
        }
      }

      // Handle JPG to PDF conversion
      if (targetFormat === 'application/pdf') {
        try {
          const pdfDoc = await PDFDocument.create();
          const img = new Image();
          
          img.onload = async () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              ctx!.drawImage(img, 0, 0);
              
              canvas.toBlob(async (blob) => {
                if (blob) {
                  const imageBytes = await blob.arrayBuffer();
                  const image = await pdfDoc.embedJpg(imageBytes);
                  const page = pdfDoc.addPage([image.width, image.height]);
                  page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                  });
                  
                  const pdfBytes = await pdfDoc.save();
                  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
                  resolve(pdfBlob);
                } else {
                  reject(new Error('Failed to process image for PDF'));
                }
              }, 'image/jpeg', settings.quality);
            } catch (error) {
              reject(new Error('Failed to create PDF'));
            }
          };
          
          img.onerror = () => {
            reject(new Error('Failed to load image for PDF conversion'));
          };
          
          img.src = URL.createObjectURL(file);
          return;
        } catch (error) {
          reject(new Error('PDF creation failed'));
          return;
        }
      }

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
    'gif': 'image/gif',
    'pdf': 'application/pdf'
  };
  return mimeTypes[format.toLowerCase()] || 'image/jpeg';
};

export const getFileExtension = (format: string): string => {
  return format === 'jpg' ? 'jpg' : format.toLowerCase();
};
