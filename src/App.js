import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css'

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

class App extends Component {
    static propTypes = {
        books: PropTypes.array,
    }
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => this.setState({ books: books }))
    }

    onMoveTo(book, shelf) {
        BooksAPI.update(book, shelf).then((res) => {
            let books = this.state.books;
            books.forEach((b) => {
                if(b.id === book.id) {
                    b.shelf = shelf
                }
            })
            this.setState({ books: books })
        })
    }

    render() {
        const { books } = this.state;
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {shelves.map((shelf) => (
                                <div className="bookshelf" key={shelf.key}>
                                    <h2 className="bookshelf-title">{shelf.title}</h2>
                                    <div className="bookshelf-books">
                                        <BooksList books={books.filter((book) => book.shelf === shelf.key)} onMoveTo={(...args) => this.onMoveTo(...args)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="open-search">
                            <Link to="/search" />
                        </div>
                    </div>
                )} />
                <Route path="/search" render={() => (
                    <BooksSearch onMoveTo={(...args) => this.onMoveTo(...args)}/>
                )} />
            </div>
        );
    }
}

export default App;