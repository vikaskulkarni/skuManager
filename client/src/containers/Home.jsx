import React, { Component } from "react";
import { API } from "aws-amplify";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ExpandRow from "../components/ExpandRow";
import "./Home.scss";

export default class Home extends Component {

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const skus = await this.skus();
            this.setState({ skus });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    skus() {
        return API.get("skus", "/skus");
    }


    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <ExpandRow />
                </div>
            </div>
        );
    }
}
