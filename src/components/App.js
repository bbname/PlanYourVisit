import React, { Component } from 'react';
import Calendar from './Calendar.jsx'
import CalendarGrid from './CalendarGrid.jsx'
import "bootstrap/dist/css/bootstrap.css"
import {Grid, Row, Col} from "react-bootstrap"

class App extends Component {
    render() {
        return (
        <Grid>
            <Row>
                <Col md={12}>
                    <h1>Plan Your Visit</h1>
                </Col>
            </Row>
            <Calendar />
            <CalendarGrid />
        </Grid>
        );
    }
}

export default App;