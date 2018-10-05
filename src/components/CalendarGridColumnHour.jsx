import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";


class CalendarGridColumnHour extends Component {
    constructor(props){
        super(props);       
    }

    // handleOnClick(e){
    //     alert(e.target.value);
    // }

    // dodac link np a href czy cos, a takze przede wszystkim handlera na klika na wybrana komorke
    render(){
        return (
            <tr>
                <td onClick={this.props.handleOnHourClick}>
                    {hour}
                </td>
            </tr>
        );
    }
}

export default CalendarGridColumnHour;