import axios from 'axios';
import React, { Component, useState } from 'react';

const Row = ({ isbn, title, author, description, pageCount, price, genre, person, togglePopup, remove }) => (
  <div className="tableRow">
    <div>{isbn}</div>
    <div>{title}</div>
    <div>{author}</div>
    <div>{description}</div>
    <div>{pageCount}</div>
    <div>{price}</div>
    <div>{genre}</div>
    {
      person == null ? "-" :
        <div>{person.name}</div>
    }
    <div className="edit">
      <a onClick={() => togglePopup(isbn, title, author, description, pageCount, price, genre, person)}>?</a>
    </div>
    <div className="remove">
      <a onClick={() => remove(isbn)}>X</a>
    </div>
  </div>
)

class BookTableUnchecked extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      popup: false,
      isbn: 0,
      title: "",
      author: "",
      description: "",
      pageCount: 0,
      price: 0.0,
      genre: "",
      person: ""
    }
    this.togglePopup = this.togglePopup.bind(this);
  }

  remove = (isbn) => {
    this.props.removeBook(isbn);
  }

  togglePopup = (isbn, title, author, description, pageCount, price, genre, person) => {
    if (this.state.popup) {
      this.setState({
        isbn: 0,
        title: "",
        author: "",
        description: "",
        pageCount: 0,
        price: 0.0,
        genre: "",
        person: "",
        popup: false
      })
    } else {
      this.setState({
        isbn: isbn,
        title: title,
        author: author,
        description: description,
        pageCount: pageCount,
        price: price,
        genre: genre,
        person: person,
        popup: true
      })
    }
  }

  editBook = (isbn, title, author, description, pageCount, price, genre, person) => {
    this.props.editBook(isbn, title, author, description, pageCount, price, genre, person);
  }
  render() {
    const rows = this.state.data.map((rowData) => <Row remove={this.remove} togglePopup={this.togglePopup} {...rowData} />);

    return (
      <div className="table">
        <div className="tableHeader">
          <div>ISBN</div>
          <div>Title</div>
          <div>Author</div>
          <div>Description</div>
          <div>Page Count</div>
          <div>Price</div>
          <div>Genre</div>
          <div>Patron</div>
          <div className="edit">Edit</div>
          <div className="remove">Remove</div>
        </div>
        <div>
          {rows}
        </div>
        {
          (this.state.popup) ? (
            <div classname="editPopup">
              <div className="editpopup-inner">
                <h4>My Super Duper Popup</h4>
                <button className="close-button" onClick={() => this.togglePopup()}>close</button>
                <label>
                  ISBN:
                    <input type="text" readOnly={true} name="ISBN" value={this.state.isbn} />
                </label>
                <label>
                  Title:
                    <input type="text" readOnly={false} name="title" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                </label>
                <label>
                  Author:
                    <input type="text" readOnly={false} name="author" value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
                </label>
                <label>
                  Description:
                    <input type="text" readOnly={false} name="description" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                </label>
                <label>
                  Page Count:
                    <input type="text" readOnly={false} name="pageCount" value={this.state.pageCount} onChange={e => this.setState({ pageCount: e.target.value })} />
                </label>
                <label>
                  Price:
                    <input type="text" readOnly={false} name="price" value={this.state.price} onChange={e => this.setState({ price: e.target.value })} />
                </label>
                <label>
                  Genre:
                    <input type="text" readOnly={false} name="genre" value={this.state.genre} onChange={e => this.setState({ genre: e.target.value })} />
                </label>
                {
                  this.state.person == null ? "" :
                    <label>
                      Patron:
                    <input type="text" readOnly={true} name="patron" value={this.state.person.name} />
                    </label>
                }
                <button onClick={() => this.editBook(this.state.isbn, this.state.title, this.state.author, this.state.description, this.state.pageCount, this.state.price, this.state.genre, this.state.patron)}>Update</button>
              </div>
            </div>
          ) : ""
        }
      </div>
    );

  }
}

export default BookTableUnchecked;