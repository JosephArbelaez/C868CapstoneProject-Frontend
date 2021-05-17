import { findAllByDisplayValue } from '@testing-library/dom';
import axios from 'axios';
import React, { Component } from 'react';
import BookCatalog from '../Catalog/BookCatalog';
import BookCollection from '../User/BookCollection';
import ChargeCard from '../User/ChargeCard';
import UserCard from '../User/UserCard';

class UserAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookResults: [],
            bookCollection: [],
            dropzoneActive: false,
            file: [],
            charges: [],
            chargeSum: 0,
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.changePhoto = this.changePhoto.bind(this);
        this.toPhoto = this.toPhoto.bind(this);
    };

    componentDidMount() {
        axios.get(`http://localhost:8080/api/v1/book`)
            .then((res) => {
                var temp = [];

                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].title = (res.data[i].title.charAt(0).toUpperCase() + res.data[i].title.slice(1));
                    if (res.data[i].person) {
                        if (res.data[i].person.userID == this.props.userID) {
                            temp.push(res.data[i]);
                        }
                    }
                }

                this.setState({
                    books: res.data,
                    bookResults: res.data,
                    bookCollection: temp
                });
            })

        axios.get(`http://localhost:8080/api/v1/charge`)
            .then((res) => {
                var temp = [];
                var total = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].patron) {
                        if (res.data[i].patron.userID == this.props.userID) {
                            temp.push(res.data[i]);
                            total.push(res.data[i].price);
                        }
                    }
                }

                var sum = total.reduce(function(a, b){
                    return a + b;
                }, 0);
                
                this.setState({
                    charges: temp,
                    chargeSum: sum.toFixed(2)
                })
            }
            )
    }

    changePhoto() {
        this.setState({
            dropzoneActive: true
        })
    }

    searchBooks = (event) => {
        event.preventDefault()
        var sString = this.state.value;
        axios.get(
            `http://localhost:8080/api/v1/book/${sString}`
        ).then(res => {
            var temp = res.data;
            for (var i = 0; i < res.data.length; i++) {
                temp[i].title = (temp[i].title.charAt(0).toUpperCase() + temp[i].title.slice(1));
            }
            this.setState({
                bookResults: res.data
            })
        });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    toPhoto = () => {
        this.props.toPhoto();
    }

    render() {
        return (
            <div className="userAccountPage">
                <div>
                    <UserCard
                        userID={this.props.userID}
                        name={this.props.name}
                        cardNumber={this.props.cardNumber}
                        dropzoneActive={this.state.dropzoneActive}
                        changePhoto={this.changePhoto}
                        file={this.file}
                        url={this.props.url}
                        toPhoto={this.toPhoto} />
                    <ChargeCard chargeTotal={this.state.chargeSum}/>
                </div>
                <form onSubmit={this.searchBooks}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                <BookCatalog books={this.state.bookResults} searchBooks={this.searchBooks} />
                <BookCollection books={this.state.bookCollection} />
            </div>
        );
    }
}

export default UserAccount;