import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarActionCreator from "../actions/CalendarActionCreator";
import CalendarStore from "../stores/CalendarStore";

class Calendar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedDate : CalendarStore.getSelectedDate(),
            highlightDates: CalendarStore.getHighlightedDates(),
            minDate : CalendarStore.getMinDate()
        }
        this.handleOnDatePickerChange = this.handleOnDatePickerChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }
 
    componentWillMount() {
        // CalendarStore.addChangeListener("StoreSelectWholeWeekByDayInCalendar",this._onChange);
        CalendarStore.addChangeListener(this._onChange);
        // CalendarStore.addChangeListener("all",this._onChange);
    }
 
    componentWillUnmount() {
        // CalendarStore.removeChangeListener("StoreSelectWholeWeekByDayInCalendar",this._onChange);
        CalendarStore.removeChangeListener(this._onChange);
        // CalendarStore.removeChangeListener("all",this._onChange);
    }

    _onChange = () => {
        this.setState({
            selectedDate : CalendarStore.getSelectedDate(),
            highlightDates: CalendarStore.getHighlightedDates()
        })
    }

    handleOnDatePickerChange(date){
        CalendarActionCreator.selectWeekByDayInCalendar(date);        
    }
 
    render() {
        return (
        <div>
            <DatePicker 
                inline
                locale="pl"
                selected = {this.state.selectedDate}
                minDate={this.state.minDate}
                onChange = {this.handleOnDatePickerChange}
                highlightDates = {this.state.highlightDates}
            />
        </div>
        );
    }
}

export default Calendar;