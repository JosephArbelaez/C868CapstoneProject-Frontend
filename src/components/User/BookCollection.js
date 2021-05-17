import React, { Component} from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

const Row = ({ isbn, title, author, price, checkoutDate}) => (
  <div className="tableRow">
    <div>{isbn}</div>
    <div>{title}</div>
    <div>{author}</div>
    <div>{price}</div>
    <div>{checkoutDate}</div>
  </div>
)

class BookTableChecked extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isbn: 0,
      title: "",
      author: "",
      price: 0.0,
      checkoutDate: ""
    }

    this.exportBookCollectionPDF = this.exportBookCollectionPDF.bind(this);
  }

  exportBookCollectionPDF = () => {
    let unit = "pt";
    let size = "A4";
    let orientation = "portrait";

    let marginLeft = 40;
    let doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    let title = "My Awesome Report";
    let headers = [["isbn", "title", "author", "price", "Checkout Date"]];

    let bookCollection = this.props.books.map(elt => [elt.isbn, elt.title, elt.author, elt.price, elt.checkoutDate]);

    let content = {
        startY: 50,
        head: headers,
        body: bookCollection
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
}

  render() {
    const rows = this.props.books.map((rowData) => <Row {...rowData} />);

    return (
      <div className="table">
        <button onClick={this.exportBookCollectionPDF}>Generate Checked Report</button>
        <div className="tableHeader">
          <div>ISBN</div>
          <div>Title</div>
          <div>Author</div>
          <div>Price</div>
          <div>Checkout Date</div>
        </div>
        <div>
          {rows}
        </div>
      </div>
    );

  }
}

export default BookTableChecked;