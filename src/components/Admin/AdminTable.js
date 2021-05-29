import React, { Component } from 'react';
import axios from 'axios';
import { AiFillPlusCircle } from "react-icons/ai";
import { RiPencilFill, RiDeleteBin5Fill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Row = ({ userID, name, email, handleShowEditAdmin, remove }) => (
  <tr>
    <td>{userID}</td>
    <td>{name}</td>
    <td>{email}</td>
    <td>
      {userID === "In Progress" ? <div></div> :
        <a onClick={() => handleShowEditAdmin(userID, name, email)}><RiPencilFill /></a>
      }
    </td>
    <td>
      {userID == "In Progress" ? <div></div> :
        <a onClick={() => remove(userID)}><RiDeleteBin5Fill /></a>
      }
    </td>
  </tr>
)

class AdminTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userID: 0,
      name: "",
      email: "",
      password: '',
      password2: '',
      showAddAdmin: false,
      showEditAdmin: false,
      message: false,
      emailMessage: false,
      file: '',
      fielImg: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleShowAddAdmin = this.handleShowAddAdmin.bind(this);
    this.handleShowEditAdmin = this.handleShowEditAdmin.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount = () => {
    axios.get(`https://c868capstoneproject.herokuapp.com/api/v1/person/admin`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
  }

  remove = (userID) => {
    if (this.props.userID != userID) {
      var temp = this.state.data;

      for (var i = 0; i < temp.length; i++) {
        if (temp[i].userID == userID) {
          temp.splice(i, 1);
        }
      }

      this.setState({
        data: temp
      })

      axios.delete(`https://c868capstoneproject.herokuapp.com/api/v1/person/${userID}`)
    }
  }

  editAdmin = () => {
    var { userID, name, email } = this.state;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      if (name != '' && email != '') {
        var temp = this.state.data;

        for (var i = 0; i < temp.length; i++) {
          if (temp[i].userID == userID) {
            temp[i].name = name;
            temp[i].email = email;
          }
        }
        this.setState({
          data: temp
        })
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        axios.put(
          `https://c868capstoneproject.herokuapp.com/api/v1/person/admin`, {
          "userID": userID,
          "name": name,
          "email": email
        }
        ).then((response) => {
          this.setState(
            {
              message: 'successful',
              showAddAdmin: false,
              showEditAdmin: false,
              message: false,
              emailMessage: false,
              userID: 0,
              name: "",
              email: "",
              password: '',
              password2: '',
              file: '',
              fielImg: ''
            })
        })

        this.props.changeName(name);
      } else {
        this.setState({
          message: true
        })
      }
    } else {
      this.setState({
        emailMessage: true
      })
    }
  }

  handleClose = () => {
    this.setState({
      showAddAdmin: false,
      showEditAdmin: false,
      message: false,
      emailMessage: false,
      userID: 0,
      name: "",
      email: "",
      password: '',
      password2: '',
      file: '',
      fileImg: ''
    })
  };
  handleShowAddAdmin = () => {
    this.setState({
      showAddAdmin: true,
      showEditAdmin: false,
      message: false,
      emailMessage: false,
      userID: 0,
      name: "",
      email: "",
      password: '',
      password2: '',
      file: '',
      fileImg: ''
    })
  };

  handleShowEditAdmin = (userID, name, email) => {
    this.setState({
      userID: userID,
      name: name,
      email: email,
      showEditAdmin: true
    })
  };

  addUser = (event) => {
    event.preventDefault()
    this.setState({
      message: false
    })
    var bodyformData = new FormData();
    bodyformData.append('file', this.state.file);
    var { name, email, password, password2, file } = this.state;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      if (name != '' && email != '' && file != '' && password != '' & password == password2) {
        axios({
          method: "post",
          url: "https://c868capstoneproject.herokuapp.com/storage/uploadFile",
          data: bodyformData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          this.setState({
            url: res.data
          })
          var { url } = this.state;

          axios.post(
            `https://c868capstoneproject.herokuapp.com/api/v1/person/admin`, {
            "userID": 0,
            "name": name,
            "email": email,
            "password": password,
            "url": url
          }
          ).then((response) => {
            var temp = this.state.data;
            var json = { name: name, email: email, password: "password", url: this.state.url, userID: "In Progress" };
            temp.push(json);

            this.setState(
              {
                showAddAdmin: false,
                message: false,
                emailMessage: false,
                userID: 0,
                name: "",
                email: "",
                password: '',
                password2: '',
                data: temp
              })
          }, (error) => {
            console.log(error);
          });
        }
        )
      } else {
        this.setState({
          message: true
        })
      }
    } else {
      this.setState({
        emailMessage: true
      })
    }
  }

  handleChange(event) {
    this.setState({
      file: event.target.files[0],
      fileImg: URL.createObjectURL(event.target.files[0])
    })
  }
  render() {
    const rows = this.state.data.map((rowData) => <Row remove={this.remove} handleShowEditAdmin={this.handleShowEditAdmin} togglePopup={this.togglePopup} {...rowData} />);

    return (
      <div className="tableContainer">
        <h2>Admins</h2>
        <div className="tableIcons">
          <AiFillPlusCircle size="2em" color="navy" onClick={this.handleShowAddAdmin} />
        </div>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
          {rows}
        </table>

        <Modal show={this.state.showAddAdmin} onHide={this.handleClose} addUser={this.addUser}>
          <Modal.Header closeButton>
            <Modal.Title>Add Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div onSubmit={this.addUser} className="AddUserCard">
              <form>
                <label>
                  Name:
                    <input type="text" readOnly={false} name="userName" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                </label>
                <label>
                  Email:
                    <input type="email" readOnly={false} name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                </label>
                <label>
                  Password:
                    <input type="text" readOnly={false} name="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                </label>
                <label>
                  Repeat Password:
                    <input type="text" readOnly={false} name="password" value={this.state.password2} onChange={e => this.setState({ password2: e.target.value })} />
                </label>
                <input type="file" onChange={this.handleChange} />
                <div >
                  <img className="thumbnail" src={this.state.fileImg} />
                </div>
                {
                  this.state.password != this.state.password2 ? <p className="message">Passwords don't match</p> : <div></div>
                }
                {
                  this.state.message == false ? <div></div> : <p className="message">Invalid Data</p>
                }
                {
                  this.state.emailMessage == false ? <div></div> : <p className="message">Invalid Data</p>
                }
              </form>
            </div></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
                </Button>
            <Button variant="primary" onClick={this.addUser}>
              Add Admin
                </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showEditAdmin} onHide={this.handleClose} editAdmin={this.editAdmin}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                       <input type="email" readOnly={false} name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
            </label>
            {
              this.state.message == '' ? <div></div> : <p className="message">Invalid Data</p>
            }
            {
              this.state.emailMessage == '' ? <div></div> : <p className="message">Invalid Data</p>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
                </Button>
            <Button variant="primary" onClick={() => this.editAdmin()}>
              Save Changes
                </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

  }
}

export default AdminTable;