import React, { useRef } from 'react'
import "./header.css"
import words  from "../../constants/words.json"

import {BsTranslate } from 'react-icons/bs'
import { languages} from '../../constants/constants'
const Header = ({language,changeLanguage}) => {
    const languageContainerRef = useRef()

    return (
        <header>
           <div className="container">
                <h1>{words[language].title}</h1> 
                <div className="languages-btn">
                    <BsTranslate size={25} color={"#fff"}   />
                </div>

                <div  ref={languageContainerRef}  className="languages-container">
                    <div className="languages">
                        {languages.map((languageItem,index) =>(
                            <ul key={index}>
                                <li onClick={()=>{changeLanguage(languageItem.name)}} className="language-item">
                                    <img className="language-img" src={languageItem.image} alt={"Flag language"}/>
                                    <p className="language-text">{words[language].languages[languageItem.name]}</p>
                                </li>


                            </ul>
                        ))}
                    </div>
                </div>
            </div>  
        </header>
    )
}

export default Header
