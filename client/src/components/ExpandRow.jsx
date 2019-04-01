import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BSTable from './BSTable';

export default class ExpandRow extends React.Component {
    constructor(props) {
        super(props);
    }

    isExpandableRow = (row) => {
        if (row.id < 3) return true;
        else return false;
    }

    expandComponent = (row) => {
        return (
            <BSTable data={row.expand} />
        );
    }

    render() {
        const products = [];

        function addProducts(quantity) {
            const startId = products.length;
            for (let i = 0; i < quantity; i++) {
                const id = startId + i;
                if (i < 3) {
                    products.push({
                        id: id,
                        name: 'Item name ' + id,
                        price: 2100 + i,
                        expand: [{
                            fieldA: 'test1',
                            fieldB: (i + 1) * 99,
                            fieldC: (i + 1) * Math.random() * 100,
                            fieldD: '123eedd' + i
                        }, {
                            fieldA: 'test2',
                            fieldB: i * 99,
                            fieldC: i * Math.random() * 100,
                            fieldD: '123eedd' + i
                        }]
                    });
                } else {
                    products.push({
                        id: id,
                        name: 'Item name ' + id,
                        price: 2100 + i
                    });
                }
            }
        }
        addProducts(5);

        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)'
        };
        const cellEdit = {
            mode: 'click'
        };
        return (
            <BootstrapTable data={products}
                options={options}
                expandableRow={this.isExpandableRow}
                expandComponent={this.expandComponent}
                cellEdit={cellEdit}>
                <TableHeaderColumn dataField='id' isKey={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}