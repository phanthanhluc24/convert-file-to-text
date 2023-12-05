import React, { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import "@react-pdf-viewer/core/lib/styles/index.css"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"
export const PdfToText = () => {
    const [text, setText] = useState("")
    const [pdfs, setPdf] = useState(null)
    const [pdfFile, setPdfFile] = useState(null)


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const objectUrl = URL.createObjectURL(file)
        setPdfFile(objectUrl)
        setPdf(file)
    }

    const handleReadPdf = async (e) => {
        e.preventDefault()
        try {
            const loadingTask = pdfjs.getDocument(pdfFile)
            const pdfDocument = await loadingTask.promise
            //
            const page = await pdfDocument.getPage(1);
            const textContent = await page.getTextContent();
            const extractedText = textContent.items.map((item) => item.str).join(' ');
            setText(extractedText);
        } catch (error) {
            console.error('Error reading PDF:', error);
        }
    }
    useEffect(() => {
        // Specify the worker source when the component mounts
        pdfjs.GlobalWorkerOptions.workerSrc =`//unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`;
    }, []);
    return (
        <>
            <p>PDF to text</p>
            <input type="file" name='file' onChange={handleFileChange} />
            {pdfFile && (
                <div style={{width:100,height:120}}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFile} />
                    </Worker>
                </div>
            )}
            <button onClick={handleReadPdf}>Read</button>
            <p style={{ whiteSpace: "pre-line" }}>{text}</p>
        </>
    )
}
