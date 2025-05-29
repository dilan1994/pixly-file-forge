
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image } from 'lucide-react';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
  targetFormat: string;
  isConverting: boolean;
}

export const FileUpload = ({ onFilesAdded, targetFormat, isConverting }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.bmp', '.gif']
    },
    multiple: true,
    disabled: isConverting
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
        ${isConverting ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          {isDragActive ? (
            <Upload className="w-8 h-8 text-blue-500" />
          ) : (
            <Image className="w-8 h-8 text-gray-500" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900">
            {isDragActive 
              ? 'Drop your images here' 
              : 'Drag & drop images here'
            }
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Converting to {targetFormat.toUpperCase()} • Max 10MB per file
          </p>
        </div>
      </div>
    </div>
  );
};
