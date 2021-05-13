import axios from 'axios';
import React from 'react';
import AddUser from "../Admin/AddUser";
import AddBook from "../Admin/AddBook";
import ChargeTable from '../Admin/ChargeTable';
import BookTable from '../Admin/BookTable';
import { COLUMNS } from '../Admin/ChargeTableColumns';
import { BOOKCOLUMNS } from '../Admin/BookTableColumns';
const Tab = ({ tab, userID, name, data, bookdata, removeCharge, editCharge,exportChargePDF,exportBookPDF}) => {
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
                    </div>
                )

            case 'book':
                return (
                    <div>
                        <AddBook />
                        <BookTable columns={BOOKCOLUMNS} data={bookdata} />
                        <button onClick={() => exportBookPDF()}>Generate Report</button>
                    </div>
                )

            case 'charge':
                return (
                    <div>
                        <ChargeTable columns={COLUMNS} data={data} removeCharge={removeCharge} editCharge={editCharge}/>
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