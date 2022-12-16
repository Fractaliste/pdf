console.log("Started !");

import { PDFDocument } from 'pdf-lib'
import fs from "fs";

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

// These should be Uint8Arrays or ArrayBuffers
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const a3f = fs.readFileSync("NOURRIT R_CDI_02-05-22_FD.pdf")


// // Load a PDFDocument from each of the existing PDFs
const a3 = await PDFDocument.load(a3f)
console.log("File opened", a3.getPageCount());

// let p1 = a3.getPage(0)
// console.log("P1 opened", p1.getMediaBox());


let newP = await pdfDoc.copyPages(a3, [0, 1, 2])
pdfDoc.addPage(newP)

const pdfBytes = await pdfDoc.save()
fs.writeFileSync("p1to3.pdf", pdfBytes)
fs.closeSync()
