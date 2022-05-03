import React, { Component } from "react";
import MoveBook from "./MoveBook";

class Books extends Component {
  callbackUpdateBooks = (b) => {
    this.props.callbackUpdateBooks(b);
  };

  render() {
    const { books, shelf } = this.props;

    return (
      <ol className="books-grid">
        {books.map((b, i) => (
          <li key={`${shelf}-${i}`}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${b.imageLinks.thumbnail})`,
                  }}
                />
                <div className="book-shelf-changer">
                  <MoveBook
                    handleSelectedShelf={this.callbackUpdateBooks}
                    currentShelf={b.shelf}
                    book={b}
                  />
                </div>
              </div>
              <div className="book-title">{b.title}</div>

              <div className="book-authors">
                {b.authors && b.authors.map((author) => (
                  <div key={author}>{author}</div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default Books;
