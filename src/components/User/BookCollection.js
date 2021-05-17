import React, { Component} from 'react';

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
  }

  render() {
    const rows = this.props.books.map((rowData) => <Row {...rowData} />);

    return (
      <div className="table">
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