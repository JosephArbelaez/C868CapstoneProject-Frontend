import axios from 'axios';
import React, {Component} from 'react';

class AddPerson extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            cardNumber: "",
            email: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.generateCardNumber = this.generateCardNumber.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    generateCardNumber(event) {
        event.preventDefault();
        axios.get(
            `http://localhost:8080/api/v1/person/cardNumber`
            ).then(res => {
                var used = true;
                while (used) {
                    var number = Math.floor(Math.random() * 1000000000);
                    if(res.data.includes(number)){
                        console.log(res.data.includes(number));
                        used = true;
                    } else {
                        used = false;
                        this.setState({
                          cardNumber : number  
                        })
                    }
                }
            })
        }

    addUser = (event) => {
        event.preventDefault()
        const { name, cardNumber, email} = this.state;

        axios.post(
            `http://localhost:8080/api/v1/person/patron?cardNumber=${cardNumber}`, {
                "userID" : 0,
                "name": name,
                "email": email,
                "password": null,
            }
        ).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }
    render() {
        return (
            <div onSubmit={this.addUser} className="AddUserCard">
            <form >
                <label>
                    Name:
                    <input type="text" readOnly = {false} name="userName" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
                </label>
                <label>
                    Email:
                    <input type="text" readOnly = {false} name="userName" value={this.state.email} onChange={e => this.setState({name: e.target.value})} />
                </label>
                <label>
                    Card Number:
                    <input type="text" value={this.state.cardNumber} readOnly = {true}/>
                </label>
                <button onClick={this.generateCardNumber}>Generate Card Number</button>
                <input type="submit" value="Add User" />
            </form>
        </div>
        );
    }
}

export default AddPerson;