import React from 'react';
import PropTypes from 'prop-types';
import ShelfSelect from './ShelfSelect';

const BooksList = (props) => {
    return (
        <ol className="books-grid">
            {props.books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
                        <ShelfSelect book={book} onSelect={props.onMoveTo}/>
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