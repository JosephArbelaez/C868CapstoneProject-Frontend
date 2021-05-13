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
            bookdata: [],
            tab: "home"
        };

        this.changeTab = this.changeTab.bind(this);
        this.removeCharge = this.removeCharge.bind(this);
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
        axios.get(`http://localhost:8080/api/v1/book`)
            .then((res) => {
                this.setState({
                    bookdata: res.data
                });
                console.log(res.data);
            })
    }
    exportChargePDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "My Awesome Report";
        const headers = [["id", "type", "price", "description", "patron"]];

        const data = this.state.data.map(elt => [elt.id, elt.type, elt.price, elt.description, elt.patron.name]);

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

    exportBookPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "My Awesome Report";
        const headers = [["isbn", "title", "author", "description", "pageCount", "price", "genre", "patron"]];

        const data = this.state.bookdata.map(elt => [elt.isbn, elt.title, elt.author, elt.description, elt.pageCount, elt.price, elt.genre, elt.person.name]);

        let content = {
            startY: 50,
            head: headers,
            body: data
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


    changeTab = (string) => {
        this.setState({
            tab: string
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
                    bookdata={this.state.bookdata}
                    userID={this.props.userID}
                    name={this.props.name}
                    removeCharge={this.removeCharge}
                    editCharge={this.editCharge}
                    exportChargePDF={this.exportChargePDF}
                    exportBookPDF={this.exportChargePDF}
                />
            </div>
        );
    }
}

export default AdminAccount;