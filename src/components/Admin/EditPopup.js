import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const EditPopup = ({popup, editCharge, setType, setPrice, setDescription, id, type, price, description, patron}) =>{
    return (popup) ? (
        <div classname="editPopup">
            <div className="editpopup-inner">
            <h4>My Super Duper Popup</h4>
                <button className = "close-button" onClick={editCharge}>close</button>
                <label>
                    ID:
                    <input type="text" readOnly = {true} name="id" value={id} />
                </label>
                <label>
                    Type:
                    <input type="text" readOnly = {false} name="type" value={type} onChange={e => setType(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="text" readOnly = {false} name="price" value={price} onChange={e => setPrice(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" readOnly = {false} name="description" value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label>
                    Patron:
                    <input type="text" readOnly = {true} name="patron" value={patron} />
                </label>
            </div>
        </div>
    ) : "";
}

export default EditPopup;