import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarActionCreator from "../actions/CalendarActionCreator";
import CalendarStore from "../stores/CalendarStore";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendar-style.css";
import {Row, Col} from "react-bootstrap";
import PlannerActionCreator from "../actions/PlannerActionCreator";
import _ from 'underscore';
import VisitorActionCreator from '../actions/VisitorActionCreator';
import VisitorStore from '../stores/VisitorStore';

class Calendar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            plannerId: CalendarStore.getPlannerId(),
            selectedDate: CalendarStore.getSelectedDate(),
            highlightDates: CalendarStore.getHighlightedDates(),
            minDate: CalendarStore.getMinDate(),
            maxDate: CalendarStore.getMaxDate()
        }
        this.handleOnDatePickerChange = this.handleOnDatePickerChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }
 
    componentWillMount() {
        CalendarStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        if(this.props.isForVisitor === undefined){
            PlannerActionCreator.setDatesFromCalendar(this.state.selectedDate); 
            PlannerActionCreator.setPlansByDate(this.state.selectedDate); 
            PlannerActionCreator.setVisitsByDate(this.state.selectedDate); 
        }
        if(this.props.isForVisitor === true){
            VisitorActionCreator.setDatesFromCalendar(this.state.selectedDate);
            VisitorActionCreator.setVisitsByDate(this.state.selectedDate, VisitorStore.getPlannerId());
        }
    }
 
    componentWillUnmount() {
        CalendarStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            selectedDate : CalendarStore.getSelectedDate(),
            highlightDates: CalendarStore.getHighlightedDates()
        });
    }

    handleOnDatePickerChange(date){
        CalendarActionCreator.selectWeekByDayInCalendar(date, this.state.plannerId); 
        if(this.props.isForVisitor === undefined){
            PlannerActionCreator.setPlansByDate(date); 
            PlannerActionCreator.setVisitsByDate(date); 
        }
        if(this.props.isForVisitor === true){
            VisitorActionCreator.setVisitsByDate(date, VisitorStore.getPlannerId());
        }
    }

    generateDatePicker(){
        if(this.props.shouldBeAlwaysFullWide){
            return (
                <Row>
                    <div className="col-12">
                    </div>
                    <div className="col-12">
                        <DatePicker 
                                inline
                                locale="pl"
                                selected = {this.state.selectedDate}
                                minDate = {this.state.minDate}
                                maxDate = {this.state.maxDate}
                                onChange = {this.handleOnDatePickerChange}
                                highlightDates = {this.state.highlightDates}
                            />                 
                    </div>
                </Row>
            );
        }
        else{
            return (
                <Row>
                    <Col xs={12} sm={2} md={3} lg={4}>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <DatePicker 
                                inline
                                locale="pl"
                                selected = {this.state.selectedDate}
                                minDate = {this.state.minDate}
                                maxDate = {this.state.maxDate}
                                onChange = {this.handleOnDatePickerChange}
                                highlightDates = {this.state.highlightDates}
                            />                 
                    </Col>
                </Row>
            );
        }
    }

    render() {
        return this.generateDatePicker()
    }
}

export default Calendar;