import React, { Component } from "react";
import { MoveShelfs } from "./Utils";
import * as BooksAPI from "./BooksAPI";

class MoveBook extends Component {
  onChangeShelf = (event, book) => {
    BooksAPI.update(book, event.target.value).then((b) => {
      this.props.handleSelectedShelf(b);
    });
  };

  render() {
    const { book, currentShelf } = this.props;
    return (
      <select
        key={`${book.id}-${currentShelf}`}
        value={currentShelf !== undefined ? currentShelf : "none"}
        onChange={(event) => this.onChangeShelf(event, book)}
      >
        {MoveShelfs.map((b, i) => (
          <option
            value={b.shelf}
            disabled={i === 0}
            key={`${book.id}-${currentShelf}-${i}`}
          >
            {b.title}
          </option>
        ))}
      </select>
    );
  }
}

export default MoveBook;
