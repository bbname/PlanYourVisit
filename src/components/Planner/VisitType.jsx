import React from 'react';
import ProfileStore from "../../stores/ProfileStore";
import ProfileActionCreator from "../../actions/ProfileActionCreator";
import "../styles/layout-style.css";
import VisitTypeCreator from "./VisitTypeCreator.jsx";
import VisitTypes from './VisitTypes.jsx';

class VisitType extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentWillMount() {
        ProfileStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        ProfileStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({

        });
    }

    render() {
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const emptyRowStyle = {
            height: "15px"
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="jumbotron-heading text-center">
                            Typy wizyt
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <VisitTypes />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <VisitTypeCreator />
                    </div>
                </div>
            </div>
        );
    }
}

export default VisitType;