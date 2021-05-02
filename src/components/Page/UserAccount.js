import axios from 'axios';
import React, { Component } from 'react';
import BookCatalog from '../Catalog/BookCatalog';
import UserCard from '../User/UserCard';

class UserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

    };

    componentDidMount() {
        axios.get(`http://localhost:8080/api/v1/book`)
        .then((res) => {
            this.setState({
                books : res.data
            });
        })
    }
    render() {
        return (
            <div className = "userAccountPage">
                <UserCard 
                    userID = {this.props.userID}
                    name = {this.props.name}
                    cardNumber = {this.props.cardNumber}
                    url = {this.props.url} />
                <BookCatalog books={this.state.books}/>
            </div>
        );
    }
}

export default UserAccount;