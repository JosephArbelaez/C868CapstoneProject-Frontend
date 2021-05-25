import React from 'react';

const BookCard = ({ isbn, title, author, description, pageCount, price, genre, status, url, reserveBook}) => {

    return (
        <div class ="bookCard">
            <img src={url} class="bookCardImg"></img>
            <div class ="bookCardDescription">
                <h3 class = "bookCardText"><b>{title}</b></h3>
                <p class = "bookCardText"><b>Author: </b>{author}</p>
                <p class = "bookCardText"><b>ISBN: </b>{isbn}</p>
                    <p class = "bookCardText"><b>Description: </b></p>           
                    <p class = "bookCardText">{description}</p>
                <p class = "bookCardText"><b>Page Count: </b>{pageCount} pages</p>
                <p class = "bookCardText"><b>Price: </b>${price.toFixed(2)}</p>
                <p class = "bookCardText"><b>Genre: </b>{genre}</p>
                <p class = "bookCardText">{status}</p>
                <button onClick={() => reserveBook({isbn})}>Reserve</button>
            </div>
        </div>
    );
}

export default BookCard;