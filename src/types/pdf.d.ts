declare module 'pdfjs-dist' {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getViewport(params: { scale: number }): PDFViewport;
    render(params: { canvasContext: CanvasRenderingContext2D; viewport: PDFViewport }): {
      promise: Promise<void>;
    };
  }

  export interface PDFViewport {
    width: number;
    height: number;
  }

  export function getDocument(params: { data: ArrayBuffer }): {
    promise: Promise<PDFDocumentProxy>;
  };
}

declare module 'jspdf' {
  export interface jsPDFOptions {
    orientation?: 'portrait' | 'landscape';
    unit?: 'mm' | 'pt' | 'in' | 'px';
    format?: string | number[];
  }

  export class jsPDF {
    constructor(options?: jsPDFOptions);
    
    addPage(): void;
    addImage(
      imageData: HTMLImageElement | HTMLCanvasElement | string,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    
    output(type: 'blob'): Blob;
    
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
  }
}

declare module 'jszip' {
  export default class JSZip {
    file(name: string, data: Blob): void;
    generateAsync(options: { type: 'blob' }): Promise<Blob>;
  }
}

declare module 'react-dropzone' {
  export interface DropzoneOptions {
    onDrop?: (acceptedFiles: File[], rejectedFiles: any[]) => void;
    accept?: Record<string, string[]>;
    multiple?: boolean;
  }

  export interface DropzoneState {
    getRootProps: () => React.HTMLAttributes<HTMLElement>;
    getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
    isDragActive: boolean;
  }

  export function useDropzone(options?: DropzoneOptions): DropzoneState;
} 