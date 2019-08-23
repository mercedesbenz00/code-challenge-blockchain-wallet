const fs = require('fs');
const PDFDocument = require('pdfmake');

/**
 * Creates PDF with dynamic data
 * @todo The PDF is empty for some reason. But no error is thrown. Bug appeared in my last minute. So no time t bugfix.
 * @example 
 * let pdfMaker = new PDFMaker(minaCoinData);
 * pdfMaker.createPDF();
 */
export class PDFMaker {
    /**
     * @param {Object} minaCoinData
    */
    constructor(minaCoinData) {
        const fonts = {
            Roboto: {
                normal: __dirname  + '/../fonts/Roboto-Regular.ttf',
                bold: __dirname  + '/../fonts/Roboto-Medium.ttf',
                italics: __dirname  + '/../fonts/Roboto-RegularItalic.ttf',
                bolditalics: __dirname  + '/../fonts/Roboto-MediumItalic.ttf',
            }
        };
        this.minaCoinData = minaCoinData;
        this.document = new PDFDocument(fonts);
        this.definitions = {};
        this.options = {};
    }

    /**
     * Creates the table and styling for the PDF
     * @todo Document Builder Pattern fits here
     * @return {undefined}
     */
    defineDocument () {
        // TODO Document Builder Pattern fits here
        const content = {};
        content.layout = 'lightHorizontalLines';
        content.table = {};
        content.table.headerRows = 1;
        content.table.width = [ '*', '*', 100, '*' ];
        content.table.body = [];
        content.table.body.push([
            { text: 'Quantity', bold: true },
            { text: 'Description', bold: true },
            { text: 'Unit Price', bold: true },
            { text: 'Total', bold: true }
        ]);

        this.minaCoinData.latestBlock.transactions.forEach((transaction) => {
            content.table.body.push([
                transaction.amount,
                'Transaction',
                transaction.amount,
                ''
            ]);
        });
        this.definitions.content = [];
        this.definitions.content.push(content);
    }

    /**
     * Creates the document
     * @return {any}
     */
    createPDF() {
        this.defineDocument();
        const output = this.document.createPdfKitDocument(this.definitions, this.options);
        output.pipe(fs.createWriteStream(__dirname  + '/../pdf/billing.pdf'));
        return output.end(); // finalizes document
    }
}