import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import _ from "underscore";
// import CalendarGridColumnHoursStore from "../stores/CalendarGridColumnHoursStore"
import CalendarGridColumnHour from "./CalendarGridColumnHour.jsx"

class CalendarGridColumnHours extends Component {
    constructor(props){
        super(props);
    }

    generateHours(){
        let hoursColumn = [];

        hoursColumn = _.map(this.props.hourObjs, function(hourObj){
            return (<CalendarGridColumnHour 
                        handleOnHourClick = {this.props.handleOnHourClick}
                        hourObj = {hourObj}
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