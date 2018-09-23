import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

export default class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            startDate : moment().locale('pl'),
            textDate : "",
            highlightDates : {},
            minDate : moment().subtract(7, "days")
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            highlightDates : this.getHighlightDates(this.state.startDate),
            minDate : this.getMinDate()
        })
    }

    getMinDate(){
        let currentDate = moment().locale('pl');
        let lastWeekBeforeCurrentDate = currentDate.subtract(7, "days");
        let lastWeekDayNr = lastWeekBeforeCurrentDate.day();
        // 0 nd
        // 1 pn
        // 6 sb
        const minDate = moment(lastWeekBeforeCurrentDate);
        if(lastWeekDayNr == 0){
            minDate.subtract(6, "days");
        }
        else{
            minDate.subtract(lastWeekDayNr-1, "days");
        }

        return minDate;
    }

    getHighlightDates(selectedDate){
        let currentdayOfWeekNr = selectedDate.day();
        let startDayOfWeekNr = 1;
        let endDayOfWeekNr = 6;
        const datesToHighlight = [];
        // 0 nd
        // 1 pn
        // 6 sb

        if(currentdayOfWeekNr == 0){
            for(let i = 6; i > 0; i--){
                let test = moment(selectedDate);
                datesToHighlight.push(test.subtract(i, "days"));
            }
        }
        else{
            for(let i = startDayOfWeekNr; i <= endDayOfWeekNr+1; i++){
                let test = moment(selectedDate);
                if(i <= currentdayOfWeekNr){
                    datesToHighlight.push(test.subtract(i-1, "days"));
                }
                else if(i > currentdayOfWeekNr){
                    datesToHighlight.push(test.add(i-currentdayOfWeekNr, "days"));
                }
            }
        }

        return datesToHighlight;
    }

    handleOnChange(date){
        this.setState({
            startDate: date,
            textDate: date.format("DD.MM.YYYY"),
            highlightDates: this.getHighlightDates(date)
        })
    }
    render() {
        return (
        <div>
            <h1>{this.state.textDate}</h1>
            <DatePicker 
                inline
                locale="pl"
                selected = {this.state.startDate}
                minDate={this.state.minDate}
                onChange = {this.handleOnChange}
                highlightDates = {this.state.highlightDates}
            />
        </div>
        );
    }
}