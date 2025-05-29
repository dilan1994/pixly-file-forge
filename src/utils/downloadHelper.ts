
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { ConvertedFile } from '@/types';

export const downloadSingleFile = (convertedFile: ConvertedFile) => {
  if (convertedFile.convertedBlob) {
    saveAs(convertedFile.convertedBlob, convertedFile.outputFileName);
  }
};

export const downloadMultipleFiles = async (convertedFiles: ConvertedFile[]) => {
  const zip = new JSZip();
  const completedFiles = convertedFiles.filter(file => 
    file.status === 'completed' && file.convertedBlob
  );

  if (completedFiles.length === 0) {
    throw new Error('No completed files to download');
  }

  completedFiles.forEach(file => {
    zip.file(file.outputFileName, file.convertedBlob!);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  saveAs(zipBlob, `converted-images-${timestamp}.zip`);
};
