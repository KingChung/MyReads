import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css'
import BooksShelves from './BooksShelves';

class App extends Component {
    static propTypes = {
        books: PropTypes.array,
    }

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => this.setState({ books: books }))
    }

    onMoveTo(book, shelf) {
        BooksAPI.update(book, shelf).then((res) => {
            let books = this.state.books;
            const bookIndex = books.findIndex((item) => item.id === book.id)
            if(~bookIndex) {
                books[bookIndex].shelf = shelf
            } else {
                book.shelf = shelf
                books.push(book)
            }
            this.setState({ books: books })
        })
    }

    render() {
        const { books } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BooksShelves
                        books={books}
                        onMoveTo={(...rest) => this.onMoveTo(...rest)}
                    />
                )} />
                <Route path="/search" render={() => (
                    <BooksSearch
                        books={books}
                        onMoveTo={(...rest) => this.onMoveTo(...rest)}
                    />
                )} />
            </div>
        );
    }
}

export default App;