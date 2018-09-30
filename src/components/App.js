import React, { Component } from 'react';
import Calendar from './Calendar.jsx'
import CalendarGrid from './CalendarGrid'
import "bootstrap/dist/css/bootstrap.css"

class App extends Component {
    render() {
        return (
        <div className="container">
            <h1>Plan Your Visit</h1>
            <Calendar />
            {/* <div id="calendar-component">
            </div> */}
            <CalendarGrid />
        </div>
        );
    }

    // componentDidMount(){
    //     Calendar.renderCalendarComponent("calendar-component");
    // }
}

export default App;