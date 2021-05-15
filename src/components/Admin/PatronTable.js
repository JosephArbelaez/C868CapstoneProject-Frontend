import React, { Component} from 'react';

const Row = ({ userID, name, email, activated, cardNumber,togglePopup, remove }) => (
  <div className="tableRow">
    <div>{userID}</div>
    <div>{name}</div>
    <div>{email}</div>
    {
        activated ? <div>true</div> : <div>false</div>
    } 
    <div>{cardNumber}</div>
    <div className="edit">
      <a onClick={() => togglePopup(userID, name, email, activated, cardNumber)}>?</a>
    </div>
    <div className="remove">
      <a onClick={() => remove(userID)}>X</a>
    </div>
  </div>
)

class PatronTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.patronData,
      popup: false,
      userID: 0,
      name: "",
      email: "",
      activated: "",
      cardNumber:0
    }
    this.togglePopup = this.togglePopup.bind(this);
  }

  remove = (userID) => {
    this.props.removePerson(userID);
  }

  togglePopup = (userID, name, email, activated, cardNumber) => {
    if (this.state.popup) {
      this.setState({
        popup: false,
        userID: 0,
        name: "",
        email: "",
        activated: "",
        cardNumber:0
      })
    } else {
      this.setState({
        popup: true,
        userID: userID,
        name: name,
        email: email,
        activated: activated,
        cardNumber: cardNumber
      })
    }
  }

  editPatron = (userID, name, email, activated, cardNumber) => {
    this.props.editPatron(userID, name, email, activated, cardNumber);
  }

  render() {
    const rows = this.state.data.map((rowData) => <Row remove={this.remove} togglePopup={this.togglePopup} {...rowData} />);

    return (
      <div className="table">
        <div className="tableHeader">
          <div>ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Activated</div>
          <div>Card Number</div>
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
                  ID:
                    <input type="text" readOnly={true} name="ID" value={this.state.userID} />
                </label>
                <label>
                  Name:
                    <input type="text" readOnly={false} name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                </label>
                <label>
                  Email:
                    <input type="text" readOnly={false} name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                </label>
                <label>
                  Activated:
                    <input type="text" readOnly={true} name="activated" value={this.state.activated} />
                </label>
                <label>
                  Card Number:
                    <input type="text" readOnly={true} name="cardNumber" value={this.state.cardNumber} />
                </label>
                <button onClick={() => this.editPatron(this.state.userID, this.state.name, this.state.email, this.state.activated, this.state.cardNumber)}>Update</button>
              </div>
            </div>
          ) : ""
        }
      </div>
    );

  }
}

export default PatronTable;