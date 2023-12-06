import React, { useState } from 'react'
import { Outlet, useLocation,Link } from 'react-router-dom'
import "../scss/header.scss"
export const Header = () => {
    const location=useLocation()
  return (
    <>
        <div className="header">
            <ul className='header-ul'>
                <Link to={"/"} className='link'>
                    <li className={`header-ul-li ${location.pathname==="/" ? "background-color":""}`}>
                        <span>JPG To Text</span>
                    </li>
                </Link>
                <Link to={"/pdf-to-text"} className='link'>
                    <li className={`header-ul-li ${location.pathname==="/pdf-to-text" ? "background-color":""}`}>
                        <span>PDF To Text</span>
                    </li>
                </Link>
                <Link to={"/doc-to-text"} className='link'>
                    <li className={`header-ul-li ${location.pathname==="/doc-to-text" ? "background-color":""}`}>
                        <span>DOC To Text</span>
                    </li>
                </Link>
            </ul>
        </div>
        <div>
            <Outlet/>
        </div>
    </>
  )
}
