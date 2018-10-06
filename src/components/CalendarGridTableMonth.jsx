import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
import CalendarStore from "../stores/CalendarStore";
import CalendarGridTableMonthStore from "../stores/CalendarStore";

class CalendarGridTableMonth extends Component {
    constructor(){
        super();

        this.state = {
            plannerId: CalendarGridTableMonthStore.getPlannerId(),
                
            previousWeek: null,
            currentWeek: null,
            nextWeek: null,
            isCurrentWeekFirstAvailableInMonth: false,
            isCurrentWeekLastAvailableInMonth: false
        }
    }

    componentWillMount() {
        CalendarStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        CalendarStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            selectedDate : CalendarStore.getSelectedDate(),
        })
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