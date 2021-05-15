import axios from 'axios';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import UserDropdown from '../utils/UserDropdown';
const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

class AddPerson extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            name: "",
            cardNumber: "",
            email: "",
            url: "",
            fileArray: [],
            file: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.generateCardNumber = this.generateCardNumber.bind(this);
        this.addUser = this.addUser.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
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
                if (res.data.includes(number)) {
                    console.log(res.data.includes(number));
                    used = true;
                } else {
                    used = false;
                    this.setState({
                        cardNumber: number
                    })
                }
            }
        })
    }

    addUser = (event) => {
        event.preventDefault()
        console.log(this.state.name);
        console.log(this.state.file);
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        const { name, cardNumber, email } = this.state;

        axios({
            method: "post",
            url: "http://localhost:8080/storage/uploadFile",
            data: bodyformData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            this.setState({
                url: res.data
            })
            const { url } = this.state;
            if (cardNumber == "") {
                axios.post(
                    `http://localhost:8080/api/v1/person/admin`, {
                    "userID": 0,
                    "name": name,
                    "email": email,
                    "password": null,
                    "url": url
                }
                ).then((response) => {
                    console.log(response);
                    this.setState(
                        { message: 'successful' })
                }, (error) => {
                    console.log(error);
                });
            } else {
                axios.post(
                    `http://localhost:8080/api/v1/person/patron`, {
                    "userID": 0,
                    "name": name,
                    "email": email,
                    "password": null,
                    "url": url,
                    "cardnumber": cardNumber
                }
                ).then((response) => {
                    console.log(response);
                    this.setState(
                        { message: 'successful' })
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }

    messageSwitch(message) {
        switch (message) {
            case '':
                return (
                    <div></div>
                )
            case 'success':
                return (
                    <div>Add user successful</div>
                )
        }
    }
    handleOnDrop = (files, rejectedFiles) => {
        files.map(f => {
            this.setState({
                file: f
            })
        })
        console.log(this.state.file);
    }


    render() {
        return (
            <div onSubmit={this.addUser} className="AddUserCard">
                <form >
                    <label>
                        Name:
                    <input type="text" readOnly={false} name="userName" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </label>
                    <label>
                        Email:
                    <input type="text" readOnly={false} name="userName" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    </label>
                    <label>
                        Card Number:
                    <input type="text" value={this.state.cardNumber} readOnly={true} />
                    </label>
                    <button onClick={this.generateCardNumber}>Generate Card Number</button>
                    <Dropzone onDrop={this.handleOnDrop} multiple={false}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <input type="submit" value="Add User" />

                    {
                        this.state.message == "" ? <div></div> : <div><p>Add user successful</p>
                        </div>
                    }
                </form>
            </div>
        );
    }
}

export default AddPerson;