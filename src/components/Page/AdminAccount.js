import axios from 'axios';
import React, { Component } from 'react';

import Tab from './Tab';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

class AdminAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            bookdataChecked: [],
            bookdataUnchecked: [],
            adminData:[],
            patronData:[],
            tab: "home"
        };

        this.changeTab = this.changeTab.bind(this);
        this.removeCharge = this.removeCharge.bind(this);
        this.removeBook = this.removeBook.bind(this);
        this.editCharge = this.editCharge.bind(this);
    };


    componentDidMount() {
        axios.get(`http://localhost:8080/api/v1/charge`)
            .then((res) => {
                this.setState({
                    data: res.data
                });
                console.log(res.data);
            })
        axios.get(`http://localhost:8080/api/v1/book/checked`)
            .then((res) => {
                this.setState({
                    bookdataChecked: res.data,
                });
                console.log(this.state.bookdataChecked);
            })
            axios.get(`http://localhost:8080/api/v1/book/unchecked`)
            .then((res) => {
                this.setState({
                    bookdataUnchecked: res.data,
                });
                
                console.log(this.state.bookdataUnchecked);
            })
            axios.get(`http://localhost:8080/api/v1/person/admin`)
            .then((res) => {
                this.setState({
                    adminData: res.data,
                });
                console.log(this.state.adminData);
            })
            axios.get(`http://localhost:8080/api/v1/person/patron`)
            .then((res) => {
                this.setState({
                    patronData: res.data,
                });
                
                console.log(this.state.patronData);
            })
        
    }
    exportChargePDF = () => {
        let unit = "pt";
        let size = "A4";
        let orientation = "portrait";

        let marginLeft = 40;
        let doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        let title = "My Awesome Report";
        let headers = [["id", "type", "price", "description", "patron"]];

        let data = this.state.data.map(elt => [elt.id, elt.type, elt.price, elt.description, elt.patron.name]);

        console.log(data);
        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    exportUncheckedBookPDF = () => {
        let unit = "pt";
        let size = "A4";
        let orientation = "portrait";

        let marginLeft = 40;
        let doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        let title = "My Awesome Report";
        let headers = [["isbn", "title", "author", "description", "pageCount", "price", "genre"]];

        let bookdataUnchecked = this.state.bookdataUnchecked.map(elt => [elt.isbn, elt.title, elt.author, elt.description, elt.pageCount, elt.price, elt.genre]);

        let content = {
            startY: 50,
            head: headers,
            body: bookdataUnchecked
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }
    exportCheckedBookPDF = () => {
        let unit = "pt";
        let size = "A4";
        let orientation = "portrait";

        let marginLeft = 40;
        let doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        let title = "My Awesome Report";
        let headers = [["isbn", "title", "author", "description", "pageCount", "price", "genre", "patron"]];

        let bookdataChecked = this.state.bookdataChecked.map(elt => [elt.isbn, elt.title, elt.author, elt.description, elt.pageCount, elt.price, elt.genre, elt.person.name]);

        let content = {
            startY: 50,
            head: headers,
            body: bookdataChecked
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }
    removeCharge = (id) => {
        console.log("AdminAccount" + id);
        var temp = this.state.data;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                temp.splice(i, 1);
            }
        }

        this.setState({
            data: temp
        })

        axios.delete(`http://localhost:8080/api/v1/charge/${id}`)
    }

    removeBook = (isbn) => {
        console.log("AdminAccount" + isbn);
        var temp = this.state.bookdataChecked;
        var temp2 = this.state.bookdataUnchecked;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].isbn == isbn) {
                temp.splice(i, 1);
            }
        }

        for (var i = 0; i < temp2.length; i++) {
            if (temp2[i].isbn == isbn) {
                temp2.splice(i, 1);
            }
        }

        this.setState({
            bookdataChecked: temp,
            bookdataUnchecked: temp2
        })

        axios.delete(`http://localhost:8080/api/v1/book/${isbn}`)
    }
    editCharge = (id, type, price, description) => {
        var temp = this.state.data;
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                temp[i].type = type;
                temp[i].price = price;
                temp[i].description = description;
            }
        }
        this.setState({
            data: temp
        })
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        axios.put(
            `http://localhost:8080/api/v1/charge/`, {
            "id": id,
            "type": type,
            "price": price,
            "description": description
        }
        ).then((response) => {
            console.log(response);
            this.setState(
                { message: 'successful' })
        }, (error) => {
            console.log(error);
        });
    };

    editAdmin = (userID, name, email) => {
        var temp = this.state.adminData;
        
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].userID == userID) {
                temp[i].name = name;
                temp[i].email = email;
            }
        }
        this.setState({
            adminData: temp
        })
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        axios.put(
            `http://localhost:8080/api/v1/person/admin`, {
            "userID": userID,
            "name": name,
            "email": email
        }
        ).then((response) => {
            console.log(response);
            this.setState(
                { message: 'successful' })
        }, (error) => {
            console.log(error);
        });
    };

    editPatron = (userID, name, email, cardNumber) => {
        var temp = this.state.patronData;
        
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].userID == userID) {
                temp[i].name = name;
                temp[i].email = email;
            }
        }
        this.setState({
            adminData: temp
        })
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        axios.put(
            `http://localhost:8080/api/v1/person/patron`, {
            "userID": userID,
            "name": name,
            "email": email
        }
        ).then((response) => {
            console.log(response);
            this.setState(
                { message: 'successful' })
        }, (error) => {
            console.log(error);
        });
    };

    removePerson = (userID) => {
        if(this.props.userID != userID){
        var temp = this.state.adminData;
        var temp2 = this.state.patronData;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i].userID == userID) {
                temp.splice(i, 1);
            }
        }

        for (var i = 0; i < temp2.length; i++) {
            if (temp2[i].userID == userID) {
                temp2.splice(i, 1);
            }
        }

        this.setState({
            adminData: temp,
            patronData: temp2
        })

        axios.delete(`http://localhost:8080/api/v1/person/${userID}`)
    }
    }

    editCheckedBook = (isbn, title, author, description, pageCount, price, genre, person) => {
        var temp = this.state.data;
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].isbn == isbn) {
                temp[i].title = title;
                temp[i].author = author;
                temp[i].description = description;
                temp[i].pageCount = pageCount;
                temp[i].price = price;
                temp[i].genre = genre;
                temp[i].person = person;
            }
        }
        this.setState({
            bookdataChecked: temp
        })
        var bodyformData = new FormData();
        bodyformData.append('file', this.state.file);

        axios.put(
            `http://localhost:8080/api/v1/book/`, {
            "isbn": isbn,
            "title": title,
            "author": author,
            "description": description,
            "pageCount": pageCount,
            "price": price,
            "genre": genre,
            "person": person
        }
        ).then((response) => {
            console.log(response);
            this.setState(
                { message: 'successful' })
        }, (error) => {
            console.log(error);
        });
    };
    changeTab = (tab) => {
        this.setState({
            tab: tab
        })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.changeTab('home')}>home</button>
                <button onClick={() => this.changeTab('user')}>user</button>
                <button onClick={() => this.changeTab('book')}>book</button>
                <button onClick={() => this.changeTab('charge')}>charge</button>
                <Tab
                    tab={this.state.tab}
                    data={this.state.data}
                    bookdataChecked={this.state.bookdataChecked}
                    bookdataUnchecked={this.state.bookdataUnchecked}
                    adminData={this.state.adminData}
                    patronData={this.state.patronData}
                    userID={this.props.userID}
                    name={this.props.name}
                    removeCharge={this.removeCharge}
                    removeBook={this.removeBook}
                    removePerson={this.removePerson}
                    editPatron={this.editPatron}
                    editAdmin={this.editAdmin}
                    editCharge={this.editCharge}
                    editBook={this.editCheckedBook}
                    exportChargePDF={this.exportChargePDF}
                    exportCheckedBookPDF={this.exportCheckedBookPDF}
                    exportUncheckedBookPDF={this.exportUncheckedBookPDF}
                />
            </div>
        );
    }
}

export default AdminAccount;