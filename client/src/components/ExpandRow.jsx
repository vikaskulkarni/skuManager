import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BSTable from './BSTable';
import './ExpandRow.scss';
import patientItems from './patientItems';

export default class ExpandRow extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickProductSelected = (cell, row) => {
        console.log('Product #');
    }

    buttonFormatter = (cell, row, rowIndex) => (
        <div className="button_cont"><a className="save_btn" href="add-website-here" target="_blank" rel="nofollow noopener">Save</a></div>
    )

    rowStyleFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#f2f2f2' : '#ffffff' };
    }

    render() {
        const patients = [];
        function addProducts() {
            for (let patient in patientItems) {
                patients.push({
                    id: patientItems[patient].patientId,
                    name: patientItems[patient].patientName,
                    age: patientItems[patient].patientAge,
                    place: patientItems[patient].patientPlace
                });
            }
        }
        addProducts();

        const cellEdit = {
            mode: 'dbclick'
        };

        return (
            <div>
                <BootstrapTable data={patients} cellEdit={cellEdit} trStyle={this.rowStyleFormat}>
                    <TableHeaderColumn dataField='id' isKey={true} dataSort={true}>Patient ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>Patient Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='age' dataSort={true} Í>Age</TableHeaderColumn>
                    <TableHeaderColumn dataField='place'>Place</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.buttonFormatter}>Actions</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}