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
        //     plannerId: CalendarGridColumnDayStore.getPlannerId(),
        //     date: CalendarGridColumnDayStore.getDate(),
        //     hourObjs: CalendarGridColumnDayStore.getHourObjs()
        // }
    }

    // componentWillMount() {
    //     CalendarGridColumnDayStore.addChangeListener(this._onChange);
    // }
 
    // componentWillUnmount() {
    //     CalendarGridColumnDayStore.removeChangeListener(this._onChange);
    // }

    // _onChange = () => {
    //     this.setState({
    //         date : CalendarGridColumnDayStore.getDate(),
    //         hourObjs: CalendarGridColumnDayStore.getHourObjs()
    //     })
    // }

    generateHoursColumns(){
        let hoursSlides = [];
        let nrOfSlidesToCreate = getNrOfSlidesToCreate();
        let nrOfEmptyHoursToFake = this.getNrOfEmptyHoursToCreate(nrOfSlidesToCreate);
        let partHour = 0;

        for(let i = 0; i < nrOfSlidesToCreate; i++){
            let partedHours = [];

            if(nrOfEmptyHoursToFake > 0 && i == nrOfSlidesToCreate-1){
                for(partHour; partHour < this.props.nrOfHoursInColumn; partHour++){
                    if(partHour >= this.props.hourObjs.length){
                        partedHours.push(" ");
                    }
                    else{
                        partedHours.push(this.props.hourObjs[partHour]);
                    }
                }
            }
            else{
                for(partHour; partHour < this.props.nrOfHoursInColumn; partHour++){
                    partedHours.push(this.props.hourObjs[partHour]);
                }
            }

            hoursSlides.push(this.generateHoursColumn(partedHours));
        }

        return hoursSlides;
    }

    getNrOfSlidesToCreate(){
        let nrOfSlides = this.props.hourObjs.length / this.props.nrOfHoursInColumn;

        if((nrOfSlides % nrOfHoursInColumn) != 0){
            nrOfSlides++;
        }

        return nrOfSlides;
    }

    getNrOfEmptyHoursToCreate(nrOfSlides){
        let expectedNrOfHoursToCreate = nrOfSlides * this.props.nrOfHoursInColumn;
        let realHoursNrToCreate = this.props.hourObjs.length;
        let nrOfHoursToFake = expectedNrOfHoursToCreate - realHoursNrToCreate;

        return nrOfHoursToFake;
    }

    generateHoursColumn(partedHourObjs){
        return (
            <Table striped condensed hover className="table-column">
                <tbody>
                    <CalendarGridColumnHours
                        handleOnHourClick = {this.props.handleOnHourClick}
                        hourObjs = {partedHourObjs}
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