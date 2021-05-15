import React, {Component} from "react";

class UserDropdown extends Component {
    constructor() {
        super()
        this.state = {
            isListOpen: false,
            headerTitle: this.props.title
        }
    }
    toggleList = () => {
        this.setState(prevState => ({
          isListOpen: !prevState.isListOpen
       }))
     }
    render() {
        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;
      
        return (
          <div className="dd-wrapper">
            <button
              type="button"
              className="dd-header"
              onClick={this.toggleList}
            >
              <div className="dd-header-title">{headerTitle}</div>
            </button>
            {isListOpen && (
              <div
                role="list"
                className="dd-list"
              >
                {list.map((item) => (
                  <button
                    type="button"
                    className="dd-list-item"
                    key={item.id}
                    onClick={() => this.selectItem(item)}
                  >
                    {item.title}
                    {' '}
                    {item.selected}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      }
}

    export default UserDropdown;