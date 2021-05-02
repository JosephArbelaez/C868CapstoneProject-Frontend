import React from 'react';

const AddUserCard = ({}) => {

    return (
        <div className="AddUserCard">
        <form >
            <label>
                First Name:
                <input type="text" name="userName" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
                Card Number:
                <input type="text" value={this.state.cardNumber} readOnly = {true}/>
            </label>
            <button onClick={this.generateCardNumber}>Generate Card Number</button>
            <input type="submit" value="Login" />
        </form>
    </div>
    );
}

export default AddUserCard;