declare module 'pdf2json' {
  interface PDFParserData {
    [key: string]: unknown;
  }

  interface RenderingOptions {
    [key: string]: unknown;
  }

  class PDFParser {
    constructor(data?: PDFParserData, renderingOptions?: RenderingOptions);
    on(event: 'pdfParser_dataReady', handler: (data: PDFParserData) => void): void;
    on(event: 'pdfParser_dataError', handler: (error: Error | unknown) => void): void;
    parseBuffer(buffer: Buffer): void;
  }
  export default PDFParser;
}