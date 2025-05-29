
import { Download, Package } from 'lucide-react';
import { ConvertedFile } from '@/types';
import { downloadSingleFile, downloadMultipleFiles } from '@/utils/downloadHelper';
import { toast } from 'react-hot-toast';

interface DownloadButtonProps {
  file?: ConvertedFile;
  files?: ConvertedFile[];
  variant: 'single' | 'bulk';
}

export const DownloadButton = ({ file, files, variant }: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      if (variant === 'single' && file) {
        downloadSingleFile(file);
        toast.success('Download started');
      } else if (variant === 'bulk' && files) {
        await downloadMultipleFiles(files);
        toast.success('ZIP file download started');
      }
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const isDisabled = variant === 'single' 
    ? !file || file.status !== 'completed'
    : !files || files.filter(f => f.status === 'completed').length === 0;

  return (
    <button
      onClick={handleDownload}
      disabled={isDisabled}
      className={`
        inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        ${isDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
        }
      `}
    >
      {variant === 'single' ? (
        <>
          <Download className="w-4 h-4 mr-1" />
          Download
        </>
      ) : (
        <>
          <Package className="w-4 h-4 mr-1" />
          Download All
        </>
      )}
    </button>
  );
};
