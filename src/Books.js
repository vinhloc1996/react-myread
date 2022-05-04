import React, { Component } from "react";
import MoveBook from "./MoveBook";

class Books extends Component {
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
                    backgroundImage: `url(${b?.imageLinks?.thumbnail})`,
                  }}
                />
                <div className="book-shelf-changer">
                  <MoveBook
                    handleSelectedShelf={this.props.callbackUpdateBooks}
                    currentShelf={b?.shelf}
                    book={b}
                  />
                </div>
              </div>
              <div className="book-title">{b?.title}</div>

              <div className="book-authors">
                {b.authors &&
                  b.authors.map((author) => <div key={author}>{author}</div>)}
                {/* {
                  //As your suggestion I tried the join but no luck 
                  //to find a way to split the author to new line 
                  //(even when using the <br/> tag)
                  b.authors && (b.authors.join("\n"))
                } */}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default Books;
