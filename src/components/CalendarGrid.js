import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';

export default class CalendarGrid extends Component {


    render() {
        const divStyle = {
            height: 500,
            backgroundColor: "red"
        }
        return (
        <div>
            <Carousel 
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
        </div>
        );
    }
}