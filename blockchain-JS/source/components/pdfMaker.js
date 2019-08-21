const fs = require('fs');
const PDFDocument = require('pdfmake');

class PDFMaker {
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
        })
        this.definitions.content = [];
        this.definitions.content.push(content);

    }

    createPDF() {
        this.defineDocument();
        const output = this.document.createPdfKitDocument(this.definitions, this.options);
        output.pipe(fs.createWriteStream(__dirname  + '/../pdf/billing.pdf'));
        return output.end(); // finalizes document
    }
}

module.exports.PDFMaker = PDFMaker;