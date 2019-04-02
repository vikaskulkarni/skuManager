import React, { Component } from "react";
import { API } from "aws-amplify";
import ExpandRow from "../components/ExpandRow";
import "./Home.scss";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { patients: [] }
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const patients = await this.patients();
            this.setState({ patients });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    patients() {
        return API.get("patients", "/patients");
    }


    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <ExpandRow tableData={this.state.patients} />
                </div>
            </div>
        );
    }
}
