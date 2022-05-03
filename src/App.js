import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import ListBooks from "./ListBooks";
import { Route, Routes } from "react-router-dom";
import SearchBook from "./SearchBook";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateBooks = (books) => {
    let newBooks = [];
    for (const prop in books) {
      for (const id of books[prop]) {
        let book = this.state.books.find((e) => e.id === id);
        if (book !== undefined) {
          book.shelf = prop;
          newBooks.push(book);
        } else {
          BooksAPI.get(id).then((b) => {
            newBooks.push(b);
          });
        }
      }
    }

    this.setState({ books: newBooks });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ListBooks
                onUpdateBooks={this.updateBooks}
                books={this.state.books}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchBook
                onUpdateBooks={this.updateBooks}
                currentBooks={this.state.books}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
