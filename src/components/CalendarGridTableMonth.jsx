import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";

class CalendarGridTableMonth extends Component {
    constructor(){
        super();

        this.state = {
            previousWeek: null,
            currentWeek: null,
            nextWeek: null,
            isCurrentWeekFirstAvailableInMonth: false,
            isCurrentWeekLastAvailableInMonth: false
        }
    }

    componentDidMount(){
        let slides = this.generateWayWithCarousel();
        this.setState({
            mondaySlides: slides,
            tuesdaySlides: slides,
            wednesdaySlides: slides,
            thursdaySlides: slides,
            fridaySlides: slides,
            saturdaySlides: slides,
            sundaySlides: slides
        });
    }

    generateWeekTable(){
        const divStyle = {
            height: "100%",
            backgroundColor: "white"
        }

        if(this.state.isCurrentWeekFirstAvailableInMonth){
            return (
                <Carousel 
                    className="col-xs-12 col-sm-12 col-md-12 week-carousel" 
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}>
                    <div style={divStyle}>
                        {this.state.currentWeek}
                    </div>
                    <div style={divStyle}>
                        {this.state.nextWeek}
                    </div>
                </Carousel>
            );
        }
        else if(this.state.isCurrentWeekLastAvailableInMonth){
            return (
                <Carousel 
                    className="col-xs-12 col-sm-12 col-md-12 week-carousel" 
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}>
                    <div style={divStyle}>
                        {this.state.previousWeek}
                    </div>
                    <div style={divStyle}>
                        {this.state.currentWeek}
                    </div>
                </Carousel>
            );          
        }
        else{
            return (
                <Carousel 
                    className="col-xs-12 col-sm-12 col-md-12 week-carousel" 
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}>
                    <div style={divStyle}>
                        {this.state.previousWeek}
                    </div>
                    <div style={divStyle}>
                        {this.state.currentWeek}
                    </div>
                    <div style={divStyle}>
                        {this.state.nextWeek}
                    </div>
                </Carousel>
            );
        }
    }

    render() {
        return (
            <Row className="hours-grid-container">
                {this.generateWeekTable()}
            </Row>
        );
    }
}

export default CalendarGridTableMonth;