import React from 'react';
import PropTypes from 'prop-types';
import BooksList from './BooksList';
import { Link } from 'react-router-dom';

const shelves = [{
    title: 'Currently Reading',
    key: 'currentlyReading'
}, {
    title: 'Want to Read',
    key: 'wantToRead'
}, {
    title: 'Read',
    key: 'read'
}];

const BooksShelves = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map((shelf) => (
                    <div className="bookshelf" key={shelf.key}>
                        <h2 className="bookshelf-title">{shelf.title}</h2>
                        <div className="bookshelf-books">
                            <BooksList
                                books={props.books.filter((book) => book.shelf === shelf.key)} onMoveTo={props.onMoveTo}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="open-search">
                <Link to="/search" />
            </div>
        </div>
    );
}

BooksList.propTypes = {
    books: PropTypes.array,
    onMoveTo: PropTypes.func.isRequired
}

export default BooksShelves;