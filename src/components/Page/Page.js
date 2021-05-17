import React, {Component} from 'react';
import AdminAccount from './AdminAccount';
import Login from './Login';
import UserAccount from './UserAccount';
import Registration from './Registration';
import Home from '../Page/Home';

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

    toLogin = () => {
        this.props.pageChange('login');
    }
    toPhoto = () => {
        this.props.pageChange('photo');
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
                        url={url}
                        toPhoto={this.toPhoto}
                        />
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
                    <Registration 
                        toLogin = {this.toLogin}/>
                )

            case 'home' :
                return (
                    <Home />
                )
                
            default :
                return (
                    <Home />
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