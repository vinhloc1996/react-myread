import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import { ListShelfs } from "./Utils";
class ListBooks extends Component {
  shelfs = ListShelfs;

  onUpdateBooks = (b) => {
      this.props.onUpdateBooks(b)    
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelfs.map((b, index) => (
              <BookShelf
                key={index}
                title={b.title}
                shelf={b.shelf}
                books={this.props.books.filter((x) => x.shelf === b.shelf)}
                callbackUpdateBooks={this.onUpdateBooks}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
