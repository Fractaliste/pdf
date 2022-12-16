console.log("Started !");

import { PDFDocument } from 'pdf-lib'
import fs from "fs";

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

// These should be Uint8Arrays or ArrayBuffers
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const i1f = fs.readFileSync("impaire_1.pdf")
const i2f = fs.readFileSync("impaire_2.pdf")
const pf = fs.readFileSync("paire.pdf")


// // Load a PDFDocument from each of the existing PDFs
const i1 = await PDFDocument.load(i1f)
const i2 = await PDFDocument.load(i2f)
const p = await PDFDocument.load(pf)


console.log(i1.getPageCount(), i2.getPageCount(), p.getPageCount());


for (let i = 0; i < p.getPageCount(); i++) {
    console.log("Page %s et %s", i, i + 1);
    var impaire = (i < i1.getPageCount()) ? await pdfDoc.copyPages(i1, [i]) : await pdfDoc.copyPages(i2, [i - i1.getPageCount()])
    var paire = await pdfDoc.copyPages(p, [i])

    pdfDoc.addPage(impaire[0])
    pdfDoc.addPage(paire[0])
}

const pdfBytes = await pdfDoc.save()
fs.writeFileSync("test.pdf", pdfBytes)

// // Copy the 1st page from the first donor document, and
// // the 743rd page from the second donor document
// const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0])
// const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [742])

// // Add the first copied page
// pdfDoc.addPage(firstDonorPage)

// // Insert the second copied page to index 0, so it will be the
// // first page in `pdfDoc`
// pdfDoc.insertPage(0, secondDonorPage)

// // Serialize the PDFDocument to bytes (a Uint8Array)
// const pdfBytes = await pdfDoc.save()