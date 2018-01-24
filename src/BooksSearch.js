import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksAPI from './utils/BooksAPI';
class BooksSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            classedBooks: props.books.reduce((acc, cur) => {
                acc[cur.id] = cur
                return acc
            }, {}),
            books: []
        }
    }

    searchByQuery(query) {
        const term = query.trim();
        this.setState({ query: term });
        if(term) {
            BooksAPI.search(term).then((books) => {
                books = Array.isArray(books) ? books : [];
                this.setState({
                    books: books.map((b) => {
                        if(this.state.classedBooks[b.id]) {
                            b.shelf = this.state.classedBooks[b.id].shelf;
                        }
                        return b;
                    })
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
                            autoFocus
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
                    {books.length ? (
                        <BooksList books={books} onMoveTo={this.props.onMoveTo}/>
                    ) : (query && <div style={{textAlign: 'center'}}>Oh! Unfortunately, no results were found</div>)}
                </div>
            </div>
        );
    }
}

export default BooksSearch;