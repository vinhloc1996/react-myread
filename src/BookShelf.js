import React, { Component } from "react";
import Books from "./Books";

class BookShelf extends Component {
  callbackUpdateBooks = (b) => {
    this.props.callbackUpdateBooks(b);
  }
  render() {
    const {books} = this.props;

    // this.setState({booksInShelf: books})

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <Books callbackUpdateBooks={this.callbackUpdateBooks} books={books}/>
        </div>
      </div>
    );
  }
}

export default BookShelf;