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
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link>
                <Grid role="main">
                    <Header 
                        uiConfig = {this.props.uiConfig}
                     />
                    <Row>
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