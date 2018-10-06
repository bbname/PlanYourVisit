import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";


class CalendarGridColumnHour extends Component {
    constructor(props){
        super(props);       
    }

    generateHour(){
        if(this.props.hourObj.isReserved){
            return (
                <tr>
                    <td className="hour-reserved">
                        {this.props.hourObj.hour}
                    </td>
                </tr>
            );
        }
        else{
            return (
                <tr>
                    <td className="hour-free" onClick={this.props.handleOnHourClick}>
                        {this.props.hourObj.hour}
                    </td>
                </tr>
            );
        }
    }

    render(){
        return (
            this.generateHour()
        );
    }
}

export default CalendarGridColumnHour;