
import { X, FileImage, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ConvertedFile } from '@/types';
import { ProgressBar } from './ProgressBar';
import { DownloadButton } from './DownloadButton';

interface FileQueueProps {
  files: ConvertedFile[];
  onRemoveFile: (fileId: string) => void;
}

export const FileQueue = ({ files, onRemoveFile }: FileQueueProps) => {
  if (files.length === 0) {
    return null;
  }

  const getStatusIcon = (status: ConvertedFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'converting':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <FileImage className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          File Queue ({files.length})
        </h3>
        {files.some(f => f.status === 'completed') && (
          <DownloadButton variant="bulk" files={files} />
        )}
      </div>

      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0">
                  {getStatusIcon(file.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.originalFile.name}
                    </p>
                    <button
                      onClick={() => onRemoveFile(file.id)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.originalFile.size)}
                    </p>
                    <p className="text-xs text-gray-500">
                      → {file.outputFormat.toUpperCase()}
                    </p>
                    {file.status === 'completed' && (
                      <DownloadButton variant="single" file={file} />
                    )}
                  </div>

                  {file.status !== 'pending' && (
                    <div className="mt-2">
                      <ProgressBar progress={file.progress} status={file.status} />
                    </div>
                  )}

                  {file.error && (
                    <p className="text-xs text-red-600 mt-1">{file.error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
