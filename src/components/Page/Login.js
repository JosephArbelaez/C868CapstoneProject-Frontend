import axios from 'axios';
import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.toRegistration = this.toRegistration.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    login = (event) => {
        event.preventDefault()
        const { email, password} = this.state;

        axios.get(
            `http://localhost:8080/api/v1/person/login?email=${email}&password=${password}`
        ).then(res => {
            this.props.login(res.data.userID, res.data.name, res.data.cardNumber, res.data.url);
        });
    }

    toRegistration = () => {
        this.props.toRegistration();
    }
    render() {
        return (
            <div onSubmit={this.login} className="loginPage">
                <form >
                    <label>
                        Email:
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <br />
                <button onClick={this.toRegistration}>Register</button>
            </div>
        );
    }
}

export default Login;