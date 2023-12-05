import React, { useState } from 'react'
import mammoth from 'mammoth'
export const DocToText = () => {
    const [text,setText]=useState("")
    const [doc,setDoc]=useState(null)
    const handleFileChange=(e)=>{
        const file=e.target.files[0]
        console.log(file);
        setDoc(file)
    }
    const handleReadDoc=async(e)=>{
        e.preventDefault()
        try {
            const reader=new FileReader()
            reader.onload=async(e)=>{
                const arrayBuffer=e.target.result
                console.log(arrayBuffer);
                const result=await mammoth.extractRawText({arrayBuffer})
                setText(result.value)
            }
            reader.readAsArrayBuffer(doc)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div>Doc-to-text</div>
            <input type="file" name='file' onChange={handleFileChange} />
            <button onClick={handleReadDoc}>Read</button>
            <p style={{ whiteSpace: "pre-line" }}>{text}</p>
        </>
    )
}
