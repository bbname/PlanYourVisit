import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import _ from "underscore";
import CalendarGridColumnHoursStore from "../stores/CalendarGridColumnHoursStore"
import CalendarGridColumnHour from "./CalendarGridColumnHour"

class CalendarGridColumnHours extends Component {
    constructor(props){
        super(props);

        // this.state = {
        //     hours: null
        // }
    }

    // componentWillMount() {
    //     CalendarGridColumnHoursStore.addChangeListener(this._onChange);
    // }
 
    // componentWillUnmount() {
    //     CalendarGridColumnHoursStore.removeChangeListener(this._onChange);
    // }

    // _onChange = () => {
    //     this.setState({
    //         hours : CalendarGridColumnHoursStore.getHours(this.props.date)
    //     })
    // }

    // generateHours(){
    //     let hoursColumn = [];

    //     hoursColumn = _.map(this.state.hours, function(hour){
    //         return <tr><td>{hour}</td></tr>
    //     });

    //     return hoursColumn;
    // }

    // handleOnHourClick(e){
    //     alert(e.target.value);
    // }


    generateHours(){
        let hoursColumn = [];

        hoursColumn = _.map(this.props.hours, function(hour){
            return (<CalendarGridColumnHour 
                        handleOnHourClick = {this.props.handleOnHourClick}
                        hour = {hour}
                    />
                    );
        });

        return hoursColumn;
    }

    render(){
        return (
            this.generateHours()
        );
    }
}

export default CalendarGridColumnHours;