import React from 'react';
import './Book.css';

function Book({book}){
    console.log(book)
    
    return(
        <>
            {
                book.map((item)=>{
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    let title = item.volumeInfo && item.volumeInfo.title;
                    let code = item.saleInfo.listPrice && item.saleInfo.listPrice.currencyCode;
                    let author = item.volumeInfo && item.volumeInfo.authors && item.volumeInfo.authors[0];
                    let overview = item.searchInfo && item.searchInfo.textSnippet;

                    // if(thumbnail!==undefined && amount!==undefined && title!==undefined && code!==undefined && author!==undefined && overview !== undefined)
                    if(thumbnail!==undefined && amount!==undefined && title!==undefined && code!==undefined && author!==undefined)
                    {
                        return(
                            <>
                                <div className="book" key={item.id}>
                                    <img src={thumbnail} className="picture" alt=""></img>
                                    <div className="book-details">
                                        <div className="box">
                                            <h4 className="title"> {title} </h4>
                                            <p className="price"> {amount} {code} </p>
                                        </div>
                                        <div className="overview">
                                            <h3> Autor: {author} </h3>
                                            <p> <span style={{ fontWeight: 'bold' }}>Opis: </span> {overview} </p>          
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    else if(thumbnail!==undefined && author!==undefined && overview!==undefined)
                    {
                        return(
                            <>
                                <div className="book" key={item.id}>
                                    <img src={thumbnail} className="picture" alt=""></img>
                                    <div className="book-details">
                                        <div className="box">
                                            <h4 className="title"> {title} </h4>
                                            <p className="price"> UNK </p>
                                        </div>
                                        <div className="overview">
                                            <h3> Autor: {author} </h3>
                                            <p> <span style={{ fontWeight: 'bold' }}>Opis: </span> {overview} </p>          
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    return null;
                })
            }
        </>
    )
}
export {Book};