import axios from 'axios';
import React from 'react';
import AddUser from "../Admin/AddUser";
import AddBook from "../Admin/AddBook";
import ChargeTable from '../Admin/ChargeTable';
import BookTableChecked from '../Admin/BookTableChecked';
import BookTableUnchecked from '../Admin/BookTableUnchecked';
import PatronTable from '../Admin/PatronTable';
import AdminTable from'../Admin/AdminTable';

const Tab = ({ tab, userID, name, data, bookdataChecked, bookdataUnchecked, removeCharge, removeBook, editBook, editCharge,exportChargePDF,exportCheckedBookPDF, exportUncheckedBookPDF, patronData, adminData, editPatron, editAdmin, removePerson}) => {
        switch (tab) {
            case 'home':
                return (
                    <div>
                        <h1>AdminAccount</h1>
                        <h1>{userID}</h1>
                        <h1>{name}</h1>
                    </div>
                )

            case 'user':
                return (
                    <div>
                        <AddUser userID = {userID}/>
                        <PatronTable patronData={patronData} editPatron={editPatron} removePerson= {removePerson}/>
                        <AdminTable adminData ={adminData} editAdmin={editAdmin} removePerson= {removePerson}/>
                    </div>
                )

            case 'book':
                return (
                    <div>
                        <AddBook />
                        <BookTableChecked removeBook={removeBook} data={bookdataChecked} editBook={editBook}/>
                        <BookTableUnchecked removeBook={removeBook} data={bookdataUnchecked}  editBook={editBook}/>
                        <button onClick={() => exportCheckedBookPDF()}>Generate Checked Report</button>
                        <button onClick={() => exportUncheckedBookPDF()}>Generate UnChecked Report</button>
                    </div>
                )

            case 'charge':
                return (
                    <div>
                        <ChargeTable data={data} removeCharge={removeCharge} editCharge={editCharge}/>
                        <button onClick={() => exportChargePDF()}>Generate Report</button>
                    </div>
                )
            default:
                return(
                    <div>
                        <h1>Default</h1>
                    </div>
                )
        }
    }

export default Tab;