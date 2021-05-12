import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class UpdatePhoto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: [],
            preview: ""
        };
    }

    render() {
        return (
            <div className="loginPage">
                <img src={this.props.url}></img>
                <img src={this.state.preview} />

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

export default UpdatePhoto;