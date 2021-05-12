import axios from 'axios';
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

class AddBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isbn:0,
            title: "",
            author:"",
            description: "",
            pageCount: 0,
            price: 0,
            genre : "",
            url : "",
            fileArray:[],
            file: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.addBook = this.addBook.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addBook = (event) => {
        event.preventDefault()
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        const { isbn, title, author, description, pageCount, price, genre} = this.state;

        axios({
            method: "post",
            url: "http://localhost:8080/storage/uploadFile",
            data: bodyformData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then((res) => {
              this.setState({
                  url:res.data
              })
              const {url} = this.state;
              axios.post(
                `http://localhost:8080/api/v1/book`, {
                    "isbn" : isbn,
                    "title": title,
                    "author": author,
                    "description": description,
                    "pageCount" : pageCount,
                    "price": price,
                    "genre": genre,
                    "url":url                
                }
            ).then((response) => {
                console.log(response);
                this.setState(
                    {message:'successful'})
              }, (error) => {
                console.log(error);
              });
          });
    }

    messageSwitch(message){
        switch(message){
            case '':
                return (
                    <div></div>
                    )
            case 'success':
                return(
                    <div>Add user successful</div>
                )
        }
    }
    handleOnDrop = (files, rejectedFiles) => {
        files.map(f => {
            this.setState({
                file:f
            })
        })
        console.log(this.state.file);
    }

    getStatus = (event) => {
        event.preventDefault();
        console.log(this.state.url);
    }
    render() {
        return (
            <div onSubmit={this.addBook} className="AddBookCard">
            <form >
                <label>
                    ISBN:
                    <input type="text" readOnly = {false} name="isbn" value={this.state.isbn} onChange={e => this.setState({isbn: e.target.value})} />
                </label>
                <label>
                    Title:
                    <input type="text" readOnly = {false} name="title" value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                </label>
                <label>
                    Author:
                    <input type="text" readOnly = {false} name="author" value={this.state.author} onChange={e => this.setState({author: e.target.value})} />
                </label>
                <label>
                    Description:
                    <input type="text" readOnly = {false} name="description" value={this.state.description} onChange={e => this.setState({description: e.target.value})} />
                </label>
                <label>
                    Page Count:
                    <input type="text" readOnly = {false} name="pageCount" value={this.state.pageCount} onChange={e => this.setState({pageCount: e.target.value})} />
                </label>
                <label>
                    Price:
                    <input type="text" readOnly = {false} name="price" value={this.state.price} onChange={e => this.setState({price: e.target.value})} />
                </label>
                <label>
                    Genre:
                    <input type="text" readOnly = {false} name="author" value={this.state.genre} onChange={e => this.setState({genre: e.target.value})} />
                </label>
                <Dropzone onDrop={this.handleOnDrop} multiple={false}>
                {({getRootProps, getInputProps}) => (
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
            <button onClick={this.getStatus}>Status</button>
        </div>
        );
    }
}

export default AddBook;