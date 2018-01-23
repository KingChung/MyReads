import React from 'react';
import PropTypes from 'prop-types';

const BooksList = (props) => {
    return (
        <ol className="books-grid">
            {props.books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                        <select
                            value={book.shelf || 'none'}
                            onChange={(event) => {
                                props.onMoveTo(book, event.target.value)
                            }}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{Array.isArray(book.authors) && book.authors.join(', ')}</div>
                    </div>
                </li>
            ))}
        </ol>
    );
}

BooksList.propTypes = {
    books: PropTypes.array,
    onMoveTo: PropTypes.func.isRequired
}

export default BooksList;