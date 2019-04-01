import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ExpandRow from "../components/ExpandRow";
import "./Home.scss";

export default class Home extends Component {

    priceFormatter = (cell, row) => {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    render() {
        const products = [{
            id: 1,
            name: "Item name 1",
            price: 100
        }, {
            id: 2,
            name: "Item name 2",
            price: 100
        }];
        return (
            <div className="Home">
                <div className="lander">
                    <ExpandRow />
                </div>
            </div>
        );
    }
}
