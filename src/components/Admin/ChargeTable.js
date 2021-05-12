import axios from 'axios';
import React, { Component, useState } from 'react';

const Row = ({ id, type, price, description, patron, remove, togglePopup}) => (
  <div className="chargeTableRow">
    <div>{id}</div>
    <div>{type}</div>
    <div>{price}</div>
    <div>{description}</div>
    <div>{patron}</div>
    <div className = "edit"> 
      <a onClick = {() => togglePopup(id, type, price, description, patron)}>?</a>
    </div>
    <div className="remove">
      <a onClick={() => remove(id)}>X</a>
    </div>
  </div>
)

class ChargeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chargeData: this.props.data,
      popup: false,
      id: 0, 
      type : "", 
      price: 0.0, 
      description: "",
      patron: ""
    }
    this.setType = this.setType.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  setType(event) {
    this.setState({
      type: event.target.value
    });
  }

  setPrice(event) {
    this.setState({
      price: event.target.value
    });
  }

  setDescription(event) {
    this.setState({
      description: event.target.value
    });
  }
  remove = (id) => {
    this.props.removeCharge(id);
  }

  togglePopup = (id, type, price, description, patron) => {
    if(this.state.popup) {
      this.setState ({
        id: 0, 
        type: "", 
        price: 0.0, 
        description: "", 
        patron: "",
        popup: false
      })
    } else {
      this.setState ({
        id: id, 
        type: type, 
        price: price, 
        description: description, 
        patron: patron,
        popup: true
      })
    }
  }

  editCharge = (id, type, price, description) => {
    this.props.editCharge(id, type, price, description);
  }
  render() {
    const rows = this.state.chargeData.map((rowData) => <Row remove={this.remove} togglePopup={this.togglePopup} {...rowData} />);

    return (
      <div className="chargeTable">
        <div className="chargeTableHeader">
          <div>ID</div>
          <div>Type</div>
          <div>Price</div>
          <div>Description</div>
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
                <button className = "close-button" onClick={() => this.togglePopup()}>close</button>
                <label>
                    ID:
                    <input type="text" readOnly = {true} name="id" value={this.state.id} />
                </label>
                <label>
                    Type:
                    <input type="text" readOnly = {false} name="type" value={this.state.type} onChange={e => this.setState({type: e.target.value})} />
                </label>
                <label>
                    Price:
                    <input type="text" readOnly = {false} name="price" value={this.state.price} onChange={e => this.setState({price: e.target.value})} />
                </label>
                <label>
                    Description:
                    <input type="text" readOnly = {false} name="description" value={this.state.description} onChange={e => this.setState({description: e.target.value})} />
                </label>
                <label>
                    Patron:
                    <input type="text" readOnly = {true} name="patron" value={this.state.patron} />
                </label>
                <button onClick={()=> this.editCharge(this.state.id, this.state.type, this.state.price, this.state.description)}>Update</button>
            </div>
        </div>
    ) : ""
      }
      </div>
    );

  }
}

export default ChargeTable;