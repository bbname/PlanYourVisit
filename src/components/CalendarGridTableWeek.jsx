import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
import CalendarGridColumnDay from "./CalendarGridColumnDay.jsx";
import CalendarGridTableWeekStore from "../stores/CalendarGridTableWeekStore";
const nrOfHoursInDayColumn = 15;

class CalendarGridTableWeek extends Component {
    constructor(props){
        super(props);

        this.state = {
            plannerId: CalendarGridTableWeekStore.getPlannerId(),
            mondayDate: CalendarGridTableWeekStore.getMonday().date,
            mondayHourObjs: CalendarGridTableWeekStore.getMonday().hourObjs,
            mondaySlides: this.getSlides(CalendarGridTableWeekStore.getMonday().hourObjs),
            tuesdayDate: CalendarGridTableWeekStore.getTuesday().date,
            tuesdayHourObjs: CalendarGridTableWeekStore.getTuesday().hourObjs,
            tuesdaySlides: this.getSlides(CalendarGridTableWeekStore.getTuesday().hourObjs),
            wednesdayDate: null,
            wednesdayHourObjs: null,
            wednesdaySlides: null,
            thursdayDate: null,
            thursdayHourObjs: null,
            thursdaySlides: null,
            fridayDate: null,
            fridayHourObjs: null,
            fridaySlides: null,
            saturdayDate: null,
            saturdayHourObjs: null,
            saturdaySlides: null,
            sundayDate: null,
            sundayHourObjs: null,
            sundaySlides: null
        }
    }

    componentWillMount() {
        CalendarGridTableWeekStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        CalendarGridTableWeekStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            mondayDate: CalendarGridTableWeekStore.getMonday().date,
            mondayHourObjs: CalendarGridTableWeekStore.getMonday().hourObjs,
            mondaySlides: getSlides(CalendarGridTableWeekStore.getMonday().hourObjs),
            tuesdayDate: CalendarGridTableWeekStore.getTuesday().date,
            tuesdayHourObjs: CalendarGridTableWeekStore.getTuesday().hourObjs,
            tuesdaySlides: getSlides(CalendarGridTableWeekStore.getTuesday().hourObjs)
        })
    }

    getSlides(hourObjs){
        return <CalendarGridColumnDay
                    nrOfHoursInColumn = {nrOfHoursInDayColumn}
                    handleOnHourClick = {this.handleOnHourClick}
                    hourObjs = {hourObjs}
                />
    }

    generateTableWeek(){
        return (
            <Table bordered condensed responsive>
                {this.generateThead()}
                <tbody>
                    <tr id="week-days-tr-row" className="container">  
                        {this.generateTbodyTrTdItemDaySlides(this.state.mondaySlides)}     
                        {this.generateTbodyTrTdItemDaySlides(this.state.tuesdaySlides)}  
                        {this.generateTbodyTrTdItemDaySlides(this.state.wednesdaySlides)}       
                        {this.generateTbodyTrTdItemDaySlides(this.state.thursdaySlides)}  
                        {this.generateTbodyTrTdItemDaySlides(this.state.fridaySlides)}  
                        {this.generateTbodyTrTdItemDaySlides(this.state.saturdaySlides)}  
                        {this.generateTbodyTrTdItemDaySlides(this.state.sundaySlides)}  
                    </tr>
                </tbody>
            </Table>
        );
    }

    generateThead(){
        const lastTdFixStyle = {
            marginRight: "1px"
        }

        return (
            <thead id="week-days-th-row">
                <th className="flex-item">Pn</th>
                <th className="flex-item">Wt</th>
                <th className="flex-item">Śr</th>
                <th className="flex-item">Cz</th>
                <th className="flex-item">Pt</th>
                <th className="flex-item">So</th>
                <th className="flex-item" style={lastTdFixStyle}>Nd</th>
            </thead>
        );
    }

    generateTbodyTrTdItemDaySlides(daySlides){
        return (
            <td className="flex-item">                           
                <Carousel               
                axis="vertical"                
                showThumbs={false}
                showStatus={false}
                showIndicators={false}>
                    {daySlides}
                </Carousel>
            </td>
        );
    }

    handleOnHourClick(e){
        if(e.target.value === " "){
            alert("To jest to puste zlapane.");
        }
        else{
            alert(e.target.value);
        }
    }

    render() {
        return (
            this.generateTableWeek()
        );
    }

    // render() {
    //     const divStyle = {
    //         height: "100%",
    //         backgroundColor: "white"
    //     }
    //     return (
    //     <Row className="hours-grid-container">
    //         <Carousel 
    //             className="col-xs-12 col-sm-12 col-md-12 week-carousel" 
    //             showThumbs={false}
    //             showStatus={false}
    //             showIndicators={false}>
    //             <div style={divStyle}>
    //                 {this.generateTable()}
    //             </div>
    //             <div style={divStyle}>
    //                 <p className="legend">
    //                     Legend2
    //                 </p>
    //             </div>
    //         </Carousel>
    //     </Row>
    //     );
    // }
}

export default CalendarGridTableWeek;