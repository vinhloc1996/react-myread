import React, { Component } from "react";
import Books from "./Books";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchBook extends Component {
  callbackUpdateBooks = (books) => {
    this.props.onUpdateBooks(books);

    // console.log(this.props.currentBooks)

    //The issue here might be about the asynchronous props updated from react.
    //If we print this.props.currentBooks here, the console will display the updated array 
    //with the i icon "This value was evaluated upon first expanding. The value may have changed since then", but in the code, the old list still be using to merge the data
    //I figured the way is to wait a little bit to get the new list before starting the merge operation, therefore it'll have a small delay time wait moving the book
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          books: this.mergeBooks(this.props.currentBooks, prevState.books),
        };
      });
    }, 400);
  };

  state = {
    query: "",
    books: [],
  };

  typingTimeout = null;

  searchBooks = (value) => {
    if (value.trim() !== "") {
      BooksAPI.search(value).then((data) => {
        if (data && data.error === undefined) {
          this.setState(() => ({
            books: this.mergeBooks(this.props.currentBooks, data),
          }));
        } else {
          this.setState({ books: [] });
        }
      });
    }
  };

  onSearch = (value) => {
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.searchBooks(value);
    }, 1000);
    this.setState(() => ({
      query: value,
    }));
  };

  mergeBooks = (currentBooks, searchBooks) => {
    for (let sBook of searchBooks) {
      let findBook = currentBooks.find((b) => b.id === sBook.id);
      if (findBook !== undefined) {
        sBook.shelf = findBook.shelf;
      }
    }

    return searchBooks;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.onSearch(event.target.value)}
              autoFocus
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  clearTimeout(this.typingTimeout);
                  this.searchBooks(event.target.value);
                }
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Books
            callbackUpdateBooks={this.callbackUpdateBooks}
            books={this.state.books}
          />
        </div>
      </div>
    );
  }
}

export default SearchBook;
