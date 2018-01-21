import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI';
class BooksSearch extends Component {
    state = {
        query: '',
        books: []
    }

    searchByQuery(query) {
        const term = query.trim();
        this.setState({ query: term });
        if(term) {
            BooksAPI.search(term).then((books) => {
                this.setState({
                    books: Array.isArray(books) ? books : []
                })
            })
        } else {
            this.setState({books: []});
        }
    }

    render() {
        const { query, books } = this.state;
        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" />
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => {
                            this.searchByQuery(event.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <BooksList books={books} onMoveTo={(...args) => {
                    this.props.onMoveTo(...args)
                }}/>
            </div>
          </div>
        );
    }
}

export default BooksSearch;