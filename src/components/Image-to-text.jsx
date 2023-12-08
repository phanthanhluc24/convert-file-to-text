import { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import CopyToClipboard from 'react-copy-to-clipboard';
import "../scss/image-to-text.scss"
import { useNavigate } from 'react-router-dom';
export const ImageToText = () => {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [read, setRead] = useState(false)
  const [textCopy, setTextCopy] = useState("")
  const [isCopied, setCopied] = useState(false)
  const [fileName, setFileName] = useState(null)
  useEffect(() => {
    if (read == true) {
      (async () => {
        const worker = await createWorker("eng", 1, {
          logger: m => setProgress(parseInt(m.progress * 100)),
        });
        const { data: { text } } = await worker.recognize(imageData);
        console.log(text);
        setOcr(text)
        await worker.terminate();
      })();
    }
  }, [imageData, read])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name)
    const objectUrl = URL.createObjectURL(file)
    setImageData(objectUrl)
    setFile(file)
  }

  const handleRead = () => {
    setRead(true)
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  const handleTextCopy = () => {
    setCopied(true)
  }
  const handleRemoveImage = () => {
    setImageData(null)
  }
  const handleStarOver=()=>{
    setOcr("")
    setImageData(null)
    window.location.reload()
  }
  return (
    <>
    {ocr===""&& (
      <div className='file-upload'>
        <button className="file-upload-btn" type='button'>Add Image</button>
        <div className="image-upload-wrap">
          <input type="file" className="file-upload-input" accept='image.*' onChange={handleImageChange} />
          <div className="drag-text">
            <h3>Drag and drop a file or select add Image</h3>
          </div>
        </div>
      </div>
    )}
      {imageData !== null && (
        <>
          <div className="grid-column">
            <div className="file-uploaded">
              <div className="image-display-flex">
                <img src={imageData} alt="" />
              </div>
              <div className="button-remove">
                <button className='remove-image' onClick={handleRemoveImage}>Remove {fileName}</button>
              </div>
            </div>
            {ocr!=="" && (
              <div className='display-text'>
                <textarea name="" id="" cols="20" rows="10" value={ocr} onChange={(e) => setTextCopy(e.target.value)}>
                </textarea> <br />
                <CopyToClipboard text={ocr} onCopy={handleTextCopy}>
                  <button>Copy to Clipboard</button>
                </CopyToClipboard>
                {isCopied ? <span style={{ color: 'green' }}> Copied!</span> : null}
              </div>
            )}
          </div>
          <div className="button-read-image">
          {progress < 100 && progress > 0 && (<span>{progress} %</span>)}
            {ocr===""?(
              <button onClick={handleRead}>Read Text From Image</button>
            ):(
              <button onClick={handleStarOver}>Start Over</button>
            )}
          </div>
        </>
      )}
    </>
  )
}

