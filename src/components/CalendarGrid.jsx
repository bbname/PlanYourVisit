import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
// import PlannerStore from '../../stores/PlannerStore';
// import PlannerActionCreator from "../../actions/PlannerActionCreator";
import CalendarGridStore from '../stores/CalendarGridStore';
import CalendarGridActionCreator from "../actions/CalendarGridActionCreator";
import _ from 'underscore';
import firebase from 'firebase';
import "firebase/auth";

class CalendarGrid extends Component {
    constructor(){
        super();

        this.state = {
            monday: CalendarGridStore.getMonday(),
            tuesday: CalendarGridStore.getTuesday(),
            wednesday: CalendarGridStore.getWednesday(),
            thursday: CalendarGridStore.getThursday(),
            friday: CalendarGridStore.getFriday(),
            saturday: CalendarGridStore.getSaturday(),
            sunday: CalendarGridStore.getSunday()
        }
    }

    componentWillMount() {
        CalendarGridStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CalendarGridStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            monday: CalendarGridStore.getMonday(),
            tuesday: CalendarGridStore.getTuesday(),
            wednesday: CalendarGridStore.getWednesday(),
            thursday: CalendarGridStore.getThursday(),
            friday: CalendarGridStore.getFriday(),
            saturday: CalendarGridStore.getSaturday(),
            sunday: CalendarGridStore.getSunday()
        });
    }

    generateSlides(){
        return (
                <tr id="week-days-tr-row" className="container">
                    <td className="flex-item">                           
                        <Carousel                        
                        axis="vertical" 
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={0}>
                            {this.state.monday.slides}
                        </Carousel>
                    </td>
                    <td className="flex-item">   
                        <Carousel
                        axis="vertical"       
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={1}>
                            {this.state.tuesday.slides}
                        </Carousel>
                    </td>
                    <td className="flex-item">                           
                        <Carousel
                        axis="vertical"     
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={2}>
                            {this.state.wednesday.slides}
                        </Carousel>
                    </td>
                    <td className="flex-item">                           
                        <Carousel
                        axis="vertical" 
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={3}>
                            {this.state.thursday.slides}
                        </Carousel>
                    </td>
                    <td className="flex-item">                           
                        <Carousel
                        axis="vertical" 
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={4}>
                            {this.state.friday.slides}
                        </Carousel>
                    </td>
                    <td className="flex-item">                           
                        <Carousel
                        axis="vertical"             
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={5}>
                            {this.state.saturday.slides}
                        </Carousel>
                    </td>
                    <td className="flex-item">
                    <Carousel
                        axis="vertical"
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        key={6}>
                            {this.state.sunday.slides}
                    </Carousel>
                    </td>
                </tr>
        );
    }

    generateInfoForNotSingedInUser(){
        const styles = {
            width: "100%",
            textAlign: "center",
            marginRight: "1px"
        }
        return (
            <tr id="week-days-tr-row" className="container">
                <td style={styles}>
                    <h5>Zaloguj się, aby móc zobaczyć dostępne godziny</h5>
                </td>           
            </tr>
        );
    }

    generateTr(){
        let isSignedIn = false;
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                isSignedIn = true;
                return this.generateSlides();
            }
        })

        if(isSignedIn || firebase.auth().currentUser){
            return this.generateSlides();
        }
        else{
            return this.generateInfoForNotSingedInUser();
        }
    }

    render() {
        const divStyle = {
            height: "100%",
            backgroundColor: "white"
        }
        const lastTdFixStyle = {
            marginRight: "1px"
        }
        return (
        <Row className="hours-grid-container">
                <div className="col-xs-12 col-sm-12 col-md-12 week-carousel"  style={divStyle}>
                    <Table bordered condensed responsive>
                        <thead>
                            <tr id="week-days-th-row">
                                <th className="flex-item">Pn</th>
                                <th className="flex-item">Wt</th>
                                <th className="flex-item">Śr</th>
                                <th className="flex-item">Cz</th>
                                <th className="flex-item">Pt</th>
                                <th className="flex-item">So</th>
                                <th className="flex-item" style={lastTdFixStyle}>Nd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateTr()}
                        </tbody>
                    </Table>
                </div>
        </Row>
        );
    }
}

export default CalendarGrid;