import React from 'react';
const ChargeCard = ({chargeTotal}) => {


    return (
        <div class ="userCard">
            <p className = "userCardText"><b>Amount: </b>${chargeTotal}</p>
        </div>
    );
}

export default ChargeCard;