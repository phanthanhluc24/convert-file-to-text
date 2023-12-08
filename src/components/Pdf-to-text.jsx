import React, { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import "@react-pdf-viewer/core/lib/styles/index.css"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"
import CopyToClipboard from 'react-copy-to-clipboard'
export const PdfToText = () => {
    const [text, setText] = useState("")
    const [pdfs, setPdf] = useState(null)
    const [pdfFile, setPdfFile] = useState(null)
    const [isCopied, setCopied] = useState(false)

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
            const numPage = pdfDocument.numPages
            let extractedText = ""
            for (let pageNumber = 1; pageNumber <= numPage; pageNumber++) {
                const page = await pdfDocument.getPage(pageNumber);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join(' ');
                extractedText += pageText + `\n`
            }
            setText(extractedText);
        } catch (error) {
            console.error('Error reading PDF:', error);
        }
    }
    useEffect(() => {
        // Specify the worker source when the component mounts
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`;
    }, []);

    const handleTextCopy = () => {
        setCopied(true)
    }
    const handleStartOver = () => {
        window.location.reload()
    }
    return (
        <>
            {text == "" && (
                <div className='file-upload'>
                    <button className="file-upload-btn" type='button'>Add File PDF</button>
                    <div className="image-upload-wrap">
                        <input type="file" className="file-upload-input" accept='image.*' onChange={handleFileChange} />
                        <div className="drag-text">
                            <h3>Drag and drop a file or select add Image</h3>
                        </div>
                    </div>
                </div>
            )}

            <>
                <div className='file-pdf-display'>
                    {pdfFile && (
                        <div className="pdf-file">
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`} >
                                <div className="worker-pdf">
                                    <Viewer fileUrl={pdfFile} />
                                </div>
                            </Worker>
                        </div>
                    )}
                    {text !== "" && (
                        <div className="text-pdf-display">
                            <textarea name="" id="" cols="30" rows="10" value={text}></textarea>
                            <br />
                            <CopyToClipboard text={text} onCopy={handleTextCopy}>
                                <button>Copy to Clipboard</button>
                            </CopyToClipboard>
                            {isCopied ? <span style={{ color: 'green' }}> Copied!</span> : null}
                        </div>
                    )}
                </div>
                {pdfFile === null ? (
                    null
                ) : (
                    text === "" ? (
                        <div className="button-read-pdf">
                            <button onClick={handleReadPdf}>Read PDF to Text</button>
                        </div>
                    ) : (
                        <div className="button-read-pdf">
                            <button onClick={handleStartOver}>Start Over</button>
                        </div>
                    )
                )}
            </>

        </>
    )
}
