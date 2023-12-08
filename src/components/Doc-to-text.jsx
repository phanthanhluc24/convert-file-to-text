import React, { useState } from 'react'
import mammoth from 'mammoth'
import CopyToClipboard from 'react-copy-to-clipboard'
export const DocToText = () => {
    const [text, setText] = useState("")
    const [doc, setDoc] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [isCopied, setCopied] = useState(false)
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFileName(file.name)
        setDoc(file)
    }
    const handleReadDoc = async (e) => {
        e.preventDefault()
        try {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const arrayBuffer = e.target.result
                console.log(arrayBuffer);
                const result = await mammoth.extractRawText({ arrayBuffer })
                setText(result.value)
            }
            reader.readAsArrayBuffer(doc)
        } catch (error) {
            console.log(error);
        }
    }
    const handleStartOver = () => {
        window.location.reload()
    }
    const handleTextCopy=()=>{
        setCopied(true)
    }
    return (
        <>
            <div className='file-upload'>
                <button className="file-upload-btn" type='button'>Add File PDF</button>
                <div className="image-upload-wrap">
                    <input type="file" className="file-upload-input" accept='image.*' onChange={handleFileChange} />
                    <div className="drag-text">
                        <h3>Drag and drop a file or select add Image</h3>
                    </div>
                </div>
            </div>
            {text!==""&&(
                <div className="doc-text-display">
                    <p style={{ whiteSpace: "pre-line" }} className='display-text-doc'>{text}</p>
                    <br />
                    <CopyToClipboard text={text} onCopy={handleTextCopy}>
                        <button>Copy to Clipboard</button>
                    </CopyToClipboard>
                    {isCopied ? <span style={{ color: 'green' }}> Copied!</span> : null}
                </div>
            )}
            {doc === null ? (
                null
            ) : (
                text === "" ? (
                    <div className="button-read-doc">
                        <button onClick={handleReadDoc}>Read {fileName}</button>
                    </div>
                ) : (
                    <div className="button-read-doc">
                        <button onClick={handleStartOver}>Start over</button>
                    </div>
                )
            )}
            {/* {doc === null ? null : (
                doc !== null ?? (
                    
                )
            )} */}
            {/* <div>Doc-to-text</div>
            <input type="file" name='file' onChange={handleFileChange} />
             */}

            {/* {text !== "" ?? (
                <div className="doc-text-display">
                    <textarea name="" id="" cols="30" rows="10" value={text}></textarea>
                </div>
            )
            } */}
        </>
    )
}
