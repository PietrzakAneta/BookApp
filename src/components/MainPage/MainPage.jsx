import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { Book } from '../Book/Book';
import axios from "axios";

// let type=["Strona główna", "E-booki", "Książki", "Czasopisma"];
let type=["Strona główna", "E-booki", "Książki"];
let APIkey = "&key=AIzaSyD6KnBfG1ciR2Jga8LIaJ0NVq7sEn_cJOA";
let baseURL = "https://www.googleapis.com/books/v1/volumes?";
let url = baseURL+"q=c&printType=all"+APIkey+"&maxResults=40";

function MainPage(){
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [noResults, setNoResults] = useState(false);
    
    const fetchAllBooks = () => {
        axios.get(url_set)
            .then(res => {
                if (res.data.items && res.data.items.length > 0) {
                    setData(res.data.items);
                    setNoResults(false);
                } else {
                    setNoResults(true);
                }
            })
            .catch(err => {
                console.log(err);
                setNoResults(true);
            });
    };

    useEffect(() => {
        fetchAllBooks(); 
    }, [url_set]); 

    const searchBook = (event)=>{
        if(event.key==="Enter")
        {
            console.log("hello");
            const newUrl = baseURL+"q="+search+"&printType=all"+APIkey+"&maxResults=40"; 
            setUrl(newUrl); 
        }
    }

    const getData=(bookType)=>{
        setSearch("");
        if(bookType==="Strona główna")
        {
            url=url = baseURL+"q=c&printType=all"+APIkey+"&maxResults=40";
        }
        if(bookType==="Książki")
        {
            url=url = baseURL+"q=c&printType=books"+APIkey+"&maxResults=40";
        }
        // if(bookType==="Czasopisma")
        // {
        //     url=url = baseURL+"q=c&printType=magazines"+APIkey+"&maxResults=40";
        // }
        if(bookType==="E-booki")
        {
            url=url = baseURL+"q=c&filter=ebooks"+APIkey+"&maxResults=40";
        }
        setUrl(url);
    }
    return(
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            type.map((value)=>{
                                return(
                                    <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <form>
                    <div className="button">
                        <input type="text" placeholder="Podaj tytul..." className="input" 
                        value={search} onChange={e=>setSearch(e.target.value)} onKeyPress={searchBook}></input>
                        <button> OK </button>
                    </div>
                </form>
            </div>
            <div className="container">
                {noResults ? (
                    <p>Nie znaleziono wyników.</p>
                    ) : (
                        <Book book={bookData} />
                    )}
            </div>
        </>
    )
}
export {MainPage};