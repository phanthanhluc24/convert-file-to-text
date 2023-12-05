import React from 'react'
import { ImageToText } from '../components/Image-to-text'
import { PdfToText } from '../components/Pdf-to-text'
import { DocToText } from '../components/Doc-to-text'

export const Index = () => [
    {
        path:"/",
        element:<ImageToText/>
    },{
        path:"/pdf-to-text",
        element:<PdfToText/>
    },{
        path:"/doc-to-text",
        element:<DocToText/>
    }
]
