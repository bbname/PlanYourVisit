import React from 'react';
import ProfileStore from "../../stores/ProfileStore";
import ProfileActionCreator from "../../actions/ProfileActionCreator";
import "../styles/layout-style.css";
import TimeRangeCreator from "./TimeRangeCreator.jsx";
import TimeRanges from './TimeRanges.jsx';

class TimeRange extends React.Component {
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
                            Zakresy czasowe
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <TimeRanges />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <TimeRangeCreator />
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeRange;