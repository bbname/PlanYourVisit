import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import {Row} from "react-bootstrap";

class CalendarGrid extends Component {
    constructor(){
        super();
    }

    render() {
        const divStyle = {
            height: 500,
            backgroundColor: "red"
        }
        return (
        <Row>
            <Carousel 
                className="col-md-12" 
                showThumbs={false}
                showStatus={false}
                showIndicators={false}>
                <div style={divStyle}>
                    <p className="legend">
                        Legend
                    </p>
                </div>
                <div style={divStyle}>
                    <p className="legend">
                        Legend2
                    </p>
                </div>
            </Carousel>
        </Row>
        );
    }
}

export default CalendarGrid;