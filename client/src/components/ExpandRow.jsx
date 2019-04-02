import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { API } from "aws-amplify";
import BSTable from './BSTable';
import './ExpandRow.scss';
// import patientItems from './patientItems';

let selectedRow = {};
export default class ExpandRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedRow: {} }
    }

    handleSave = () => {
        const patientInfo = { "patientName": selectedRow.name, "patientAge": selectedRow.age, "patientPlace": selectedRow.place }
        API.put("patients", `/patients/${selectedRow.id}`, {
            body: patientInfo
        });
    }

    buttonFormatter = (cell, row) => (
        <div className="button_cont" onClick={this.handleSave}><a className="save_btn" rel="nofollow noopener">Save</a></div>
    )

    imageFormatter = (cell, row, enumObject, index) => {
        const imageName = `./Drop${index}.jpg`;
        return <img src={imageName} alt="" border="3" height="150" width="150"></img>
    }

    rowStyleFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#f2f2f2' : '#ffffff' };
    }

    render() {
        if (this.props.tableData) {
            const patients = [];
            const patientItems = this.props.tableData;
            function addPatients() {
                for (let patient in patientItems) {
                    patients.push({
                        id: patientItems[patient].patientId,
                        name: patientItems[patient].patientName,
                        age: patientItems[patient].patientAge,
                        place: patientItems[patient].patientPlace
                    });
                }
            }
            addPatients();

            const cellEdit = {
                mode: 'dbclick'
            };

            const selectRow = {
                mode: 'radio',
                onSelect: (row, isSelect, rowIndex, e) => {
                    selectedRow = row;
                }
            };

            return (
                <div>
                    <BootstrapTable data={patients} cellEdit={cellEdit} trStyle={this.rowStyleFormat} selectRow={selectRow}>
                        <TableHeaderColumn dataAlign="center" dataField='image' dataFormat={this.imageFormatter}>Thumbnail</TableHeaderColumn>
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
}