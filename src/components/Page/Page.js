import React, {Component} from 'react';
import AdminAccount from './AdminAccount';
import Login from './Login';
import UserAccount from './UserAccount';
import BookCatalog from '../Catalog/BookCatalog';

const initialState = {
    userID: '',
    name: '',
    username: '',
    password: '',
    cardNumber: '',
    url: ''
  }

class Page extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    login = (userID, name, cardNumber, url) => {
        this.setState({
            userID: userID,
            name: name,
            cardNumber: cardNumber,
            url: url
        });
        
        if(this.state.cardNumber === undefined) {
            this.props.pageChange('adminAccount');
        } else {
            this.props.pageChange('userAccount')
        }
    }

    toRegistration = () => {
        this.props.pageChange('registration');
    }
    renderSwitch(name, userID, cardNumber, url){
        switch(this.props.page){
            case 'login':
                return (
                    <Login 
                        name = {name} 
                        userID = {userID} 
                        cardNumber = {cardNumber}
                        url = {url} 
                        login={this.login}
                        toRegistration={this.toRegistration}/>
                )
            case 'userAccount':
                return (
                    <UserAccount 
                        name = {name}
                        userID = {userID}
                        cardNumber = {cardNumber}
                        url={url}/>
                )

            case 'adminAccount':
                return (
                    <AdminAccount 
                    name = {name}
                    userID = {userID}
                    cardNumber = {cardNumber}/>
                )
            
            case 'registration' :
                return (
                    <div>Registration</div>
                )
            default:
                return (
                    <BookCatalog />
                )
        }
    }
    render() {
        const {userID, name, cardNumber, url} = this.state;
        return (
            <div className = "content">
                {this.renderSwitch (name, userID, cardNumber, url)}
            </div>
        )
    }
}

export default Page;