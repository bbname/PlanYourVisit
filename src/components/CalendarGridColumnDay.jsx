import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
import _ from "underscore";
import CalendarGridColumnHours from "./CalendarGridColumnHours"

class CalendarGridColumnDay extends Component {
    constructor(props){
        super(props);

        // this.state = {
        //     date: null,
        //     dayName: null,
        //     hours: null,
        //     hoursSlides: null,
        // }
    }

    // componentDidMount(){
    //     let slides = this.generateWayWithCarousel();
    //     this.setState({
    //         mondaySlides: slides,
    //         tuesdaySlides: slides,
    //         wednesdaySlides: slides,
    //         thursdaySlides: slides,
    //         fridaySlides: slides,
    //         saturdaySlides: slides,
    //         sundaySlides: slides
    //     });
    // }

    // handleOnHourClick(e){
    //     if(e.target.value === " "){
    //         alert("To jest to puste zlapane.");
    //     }
    //     else{
    //         alert(e.target.value);
    //     }
    // }

    generateHoursColumns(){
        let hoursSlides = [];
        let nrOfSlidesToCreate = getNrOfSlidesToCreate();
        let emptyCollectionToFillLastSlide = this.getCollectionOfEmptyHoursToFillLastSlide(nrOfSlidesToCreate);
        let partHour = 0;

        for(let i = 0; i < nrOfSlidesToCreate; i++){
            let partedHours = [];

            if(emptyCollectionToFillLastSlide.length > 0 && i == nrOfSlidesToCreate-1){
                for(partHour; partHour < this.props.nrOfHoursInColumn; partHour++){
                    if(partHour >= this.state.hours.length){
                        partedHours.push(" ");
                    }
                    else{
                        partedHours.push(this.state.hours[partHour]);
                    }
                }
            }
            else{
                for(partHour; partHour < this.props.nrOfHoursInColumn; partHour++){
                    partedHours.push(this.state.hours[partHour]);
                }
            }

            hoursSlides.push(this.generateHoursColumn(partedHours));
        }

        return hoursSlides;
    }

    getNrOfSlidesToCreate(){
        let nrOfSlides = this.state.hours.length / this.props.nrOfHoursInColumn;

        if((nrOfSlides % nrOfHoursInColumn) != 0){
            nrOfSlides++;
        }

        return nrOfSlides;
    }

    getCollectionOfEmptyHoursToFillLastSlide(nrOfSlides){
        let expectedNrOfHoursToCreate = nrOfSlides * this.props.nrOfHoursInColumn;
        let realHoursNrToCreate = this.state.hours.length;
        let emptyHours = [];

        if(expectedNrOfHoursToCreate > realHoursNrToCreate){
            let nrOfHoursToFake = expectedNrOfHoursToCreate - realHoursNrToCreate;
            
            for(let i = nrOfHoursToFake; i > 0; i--){
                emptyHours.push(" ");
            }
        }

        return emptyHours;
    }

    generateHoursColumn(partedHours){
        return (
            <Table striped condensed hover className="table-column">
                <tbody>
                    <CalendarGridColumnHours
                        handleOnHourClick = {this.props.handleOnHourClick}
                        hours = {partedHours}
                    />
                </tbody>
            </Table>
        );
    }

    render(){
        return (
            this.generateHoursColumns()
        );
    }
}

export default CalendarGridColumnDay;