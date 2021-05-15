import { findAllByDisplayValue } from '@testing-library/dom';
import axios from 'axios';
import React, { Component } from 'react';
import BookCatalog from '../Catalog/BookCatalog';
import UserCard from '../User/UserCard';

class UserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookResults: [],
            dropzoneActive: false,
            file: [] 
        };

        this.changePhoto = this.changePhoto.bind(this);
        this.toPhoto = this.toPhoto.bind(this);
    };

    componentDidMount() {
        axios.get(`http://localhost:8080/api/v1/book`)
        .then((res) => {
            this.setState({
                books : res.data,
                bookResults: res.data
            });
        })
    }

    changePhoto() {
        this.setState({
            dropzoneActive:true
        })
    }

    searchBooks = (searchString) => {
        var temp = books
    } 
    toPhoto = () => {
        this.props.toPhoto();
    }
    render() {
        return (
            <div className = "userAccountPage">
                <UserCard 
                    userID = {this.props.userID}
                    name = {this.props.name}
                    cardNumber = {this.props.cardNumber}
                    dropzoneActive = {this.state.dropzoneActive}
                    changePhoto = {this.changePhoto}
                    file = {this.file}
                    url = {this.props.url}
                    toPhoto = {this.toPhoto} />
                <BookCatalog books={this.state.books}/>
            </div>
        );
    }
}

export default UserAccount;