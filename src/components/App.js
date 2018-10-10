import React, { Component } from 'react';
import Calendar from './Calendar.jsx'
import CalendarGrid from './CalendarGrid.jsx'
import "bootstrap/dist/css/bootstrap.css"
import {Grid, Row, Col} from "react-bootstrap"
import HomePage from './HomePage.jsx';
import Header from "./Layout/Header.jsx"
import Footer from './Layout/Footer.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Grid role="main">
                    <Header />
                    <Row>
                        {/* <Col md={12}>
                            <h1>   </h1>
                        </Col> */}
                        <HomePage />
                    </Row>
                    {/* <Calendar />
                    <CalendarGrid /> */}

                </Grid>
                <Footer />
            </div>
        );
    }
}

export default App;