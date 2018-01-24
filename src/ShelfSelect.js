import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfSelect extends Component {
    static propTypes = {
        book: PropTypes.object,
        onSelect: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const { book } = this.props;
        return (
            <div className={'book-shelf-changer ' + (this.state.loading && 'loading') }>
                <select
                    value={book.shelf || 'none'}
                    onChange={(event) => {
                        this.setState({loading: true})
                        this.props.onSelect(book, event.target.value)
                    }}
                >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                </select>
            </div>
        );
    }
}

export default ShelfSelect