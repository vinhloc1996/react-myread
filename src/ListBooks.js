import React from "react";
import BookShelf from "./BookShelf";
import { useNavigate } from "react-router-dom";
import { ListShelfs } from "./Utils";
const ListBooks = (props) => {
  const shelfs = ListShelfs;

  const onUpdateBooks = (b) => {
    props.onUpdateBooks(b);
  };

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/search`; 
    navigate(path);
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.map((b, index) => (
            <BookShelf
              key={index}
              title={b.title}
              shelf={b.shelf}
              books={props.books.filter((x) => x.shelf === b.shelf)}
              callbackUpdateBooks={onUpdateBooks}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
      <button onClick={routeChange}>Add a book</button>
      </div>
    </div>
  );
};

export default ListBooks;
