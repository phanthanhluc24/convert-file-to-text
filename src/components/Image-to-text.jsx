import { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
export const ImageToText = () => {
    const [ocr, setOcr] = useState("");
    const [imageData, setImageData] = useState(null);
    const [file,setFile]=useState(null)
    const [progress,setProgress]=useState(0)
    const [read,setRead]=useState(false)
    useEffect(() => {
      if (read==true) {
        (async () => {
          const worker = await createWorker("eng",1,{
            logger: m =>setProgress(parseInt(m.progress*100)),
          });
          const { data: { text } } = await worker.recognize(imageData);
          console.log(text);
          setOcr(text)
          await worker.terminate();
        })();
      }
    }, [imageData,read])
  
    const handleImageChange=(e)=> {
      const file = e.target.files[0];
      if (!file) return;
      const objectUrl=URL.createObjectURL(file)
      setImageData(objectUrl)
      setFile(file)
    }
  
    const handleRead=()=>{
      setRead(true)
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
    return (
      <>
        <div>
          <p>Choose an Image</p>
          <input
            type="file"
            name=""
            id=""
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <div className="display-flex">
          <img src={imageData} alt="" srcset="" />
        </div>
        {progress < 100 && progress > 0 && <div>
          <div className="progress-label">Progress ({progress}%)</div>
          <div className="progress-bar">
            <div className="progress" style={{width: `${progress}%`}} ></div>
          </div>
        </div>}
        <span style={{ whiteSpace: "pre-line" }}>{ocr}</span>
        <button onClick={handleRead}>Read</button>
      </>
    )
  }

