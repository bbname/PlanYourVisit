import React, { Component } from 'react';
import Calendar from './Calendar/Calendar'

class App extends Component {
    render() {
        return (
        <div>
            <h1>Plan Your Visit</h1>
            <Calendar />
        </div>
        );
    }
}

export default App;