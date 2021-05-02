import React from 'react';

const UserCard = ({ userID, name, cardNumber, url}) => {

    return (
        <div class ="userCard">
            <img src={url} class="userCardImage"></img>
            
            <div className ="userCardDescription">
                <h3 className = "userCardText"><b>{name}</b></h3>
                <p className = "userCardText"><b>User ID: </b>{userID}</p>
                <p className = "userCardText"><b>Card Number: </b>{cardNumber}</p>
            </div>
        </div>
    );
}

export default UserCard;