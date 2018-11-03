import React from 'react';
import TimeRangeStore from '../../stores/TimeRangeStore';
import TimeRangeActionCreator from "../../actions/TimeRangeActionCreator";
import VisitTypeFunctions from "../../utils/VisitTypeFunctions";
import TimePicker from "rc-time-picker";
import "../styles/layout-style.css";
import moment from 'moment';

class TimeRangeCreator extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: TimeRangeStore.getId(),
            timeFrom: TimeRangeStore.getTimeFrom(),
            timeTo: TimeRangeStore.getTimeTo(),
            timeStep: TimeRangeStore.getTimeStep(),
            availableTimeSteps: TimeRangeStore.getAvailableTimeSteps(),
            isEdit: TimeRangeStore.isEdit(),
            isNew: TimeRangeStore.isNew(),
            isRead: TimeRangeStore.isRead(),
            selectedTimeRange: TimeRangeStore.getSelectedTimeRange(),
            isFormValid: TimeRangeStore.isFormValid()
        }
    }

    componentWillMount() {
        TimeRangeStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        TimeRangeStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            id: TimeRangeStore.getId(),
            timeFrom: TimeRangeStore.getTimeFrom(),
            timeTo: TimeRangeStore.getTimeTo(),
            timeStep: TimeRangeStore.getTimeStep(),
            availableTimeSteps: TimeRangeStore.getAvailableTimeSteps(),
            isEdit: TimeRangeStore.isEdit(),
            isNew: TimeRangeStore.isNew(),
            isRead: TimeRangeStore.isRead(),
            selectedTimeRange: TimeRangeStore.getSelectedTimeRange(),
            isFormValid: TimeRangeStore.isFormValid()
        });
    }

    generateReadOnlyLabel(htmlForData, data, shouldBold){
        if(shouldBold){
            const boldStyle = {
                fontWeight: "bold"
            }
            return <label htmlFor={htmlForData} className="col-12 col-form-label" style={boldStyle}>{data}</label>;        
        }
        return <label htmlFor={htmlForData} className="col-12 col-form-label">{data}</label>;
    }

    generateTimeStepReadOnlyLabel(){
        return <label htmlFor="timeCost" className="col-12 col-form-label">{VisitTypeFunctions.getTimeCostForUser(this.state.timeStep)}</label>;
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === "time-range-time-step"){
            TimeRangeActionCreator.setTimeStep(e.target.value);
        }
    }

    handleOnTimeFromInputChange = (date) =>{
        TimeRangeActionCreator.setTimeFrom(date);
    }

    handleOnTimeToInputChange = (date) =>{
        TimeRangeActionCreator.setTimeTo(date);
    }

    handleOnCloseBtnClick = (e) => {
        TimeRangeActionCreator.closeBtnClicked();
    }

    handleOnSaveBtnClick = (e) => {
        TimeRangeActionCreator.saveBtnClicked(this.state.id, this.state.timeFrom, this.state.timeTo, this.state.timeStep);
    }

    handleOnCreateBtnClick = (e) => {
        TimeRangeActionCreator.createBtnClicked(this.state.timeFrom, this.state.timeTo, this.state.timeStep);
    }

    handleOnEditBtnClick = (e) => {
        TimeRangeActionCreator.editBtnClicked();
    }

    handleOnAddBtnClick = (e) => {
        TimeRangeActionCreator.addBtnClicked();
    }

    handleOnDeleteBtnClick = (e) => {
        TimeRangeActionCreator.deleteBtnClicked(this.state.id);
    }

    generateEditBtn(){
        const editBtnStyle={
            marginRight: "15px"
        };

        if(this.state.isRead === true || this.state.isRead === false){
            return (
                <button type="button" style={editBtnStyle} onClick={this.handleOnEditBtnClick} className="btn btn-warning float-right" disabled={this.state.isEdit || this.state.isNew}>
                    <i className="fas fa-pen"></i> Edytuj
                </button>
            ); 
        }  
    }

    generateAddBtn(){
        const addBtnStyle={
            marginRight: "15px"
        };

        if(this.state.isRead === true){
            return (
                <button type="button" style={addBtnStyle} onClick={this.handleOnAddBtnClick} className="btn btn-success float-right" disabled={this.state.isEdit || this.state.isNew}>
                    <i className="fas fa-plus"></i> Nowa
                </button>
            ); 
        }  
    }

    generateCloseBtn(){
        if(this.state.isEdit === true){
            return (
                <button type="button" className="close float-right" onClick={this.handleOnCloseBtnClick} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
            ); 
        }  
    }

    generateDeleteBtn(){
        const deleteBtnStyle={
            marginRight: "-15px"
        };

        if(this.state.isEdit === true){
            return (
                <button type="button" style={deleteBtnStyle} onClick={this.handleOnDeleteBtnClick} className="btn btn-danger float-right">
                    <i className="fas fa-times"></i> Usuń
                </button>
            ); 
        }  
    }

    generateSaveBtn(){
        if(this.state.isEdit === true){
            return (
                <button type="button" onClick={this.handleOnSaveBtnClick} className="btn btn-success">
                    <i className="fas fa-check"></i> Zapisz
                </button>
            ); 
        }  
    }

    generateCreateBtn(){
        if(this.state.isEdit === null || this.state.isEdit === false){
            return (
                <button type="button" onClick={this.handleOnCreateBtnClick} className="btn btn-success">
                    <i className="fas fa-plus"></i> Utwórz
                </button>
            ); 
        }  
    }

    generateForEdit(){
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const rowBreaksAndInputMarginStyle = {
            marginBottom: "15px",
            marginLeft: "0px"
        }
        const emptyRowStyle = {
            height: "38px"
        };
        const inputLeftCorrectStyle = {
            marginLeft: "15px"
        }

        const specificSelectInputStyle = {
            width: "203.969px",
            marginLeft: "15px"
        }

        return (
            <div className="container">
                <div className="row" style={rowBreaksAndInputMarginStyle}>
                    <div style={inputLeftCorrectStyle} className="col-12">
                        {this.generateCloseBtn()}
                        {this.generateEditBtn()}
                        {this.generateAddBtn()}
                    </div>
                </div>
                <form>
                    <div className="form-group">
                        {this.generateReadOnlyLabel("time-from-label", "Godzina od:", true)}
                        <TimePicker 
                            showSecond={false} 
                            minuteStep={15} 
                            inputIcon = {<i className="far fa-clock time-icon"></i>}
                            onChange={this.handleOnTimeFromInputChange}
                            value={this.state.timeFrom} 
                            style={inputLeftCorrectStyle}
                            id="time-range-time-from"/>
                    </div>
                    <div className="form-group">
                        {this.generateReadOnlyLabel("time-step-label", "Krok:", true)}
                        <select value={this.state.timeStep} style={specificSelectInputStyle} className="form-control" onChange={this.handleOnInputChange} id="time-range-time-step">
                            {this.state.availableTimeSteps.map((timeUnit) => <option key={timeUnit} value={timeUnit}>{VisitTypeFunctions.getTimeCostForUser(timeUnit)}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        {this.generateReadOnlyLabel("time-to-label", "Godzina do:", true)}
                        <TimePicker 
                            showSecond={false} 
                            minuteStep={15} 
                            inputIcon = {<i className="far fa-clock time-icon"></i>}
                            onChange={this.handleOnTimeToInputChange}
                            value={this.state.timeTo} 
                            style={inputLeftCorrectStyle}
                            id="time-range-time-to"/>
                    </div>
                </form>
                <div className="row" style={rowBreaksAndInputMarginStyle}>
                <div className="col-12">
                    {this.generateDeleteBtn()}
                    {this.generateSaveBtn()}
                    {this.generateCreateBtn()}
                </div>
                </div>
            </div>          
        );
    }

    generateForRead(){
        if(this.state.isRead === true){
            const rowBreaksStyle = {
                marginBottom: "15px"
            };
            const rowBreaksAndInputMarginStyle = {
                marginBottom: "15px",
                marginLeft: "0px"
            }
            const emptyRowStyle = {
                height: "38px"
            };
            const inputLeftCorrectStyle = {
                marginLeft: "15px"
            }
    
            return (
                <div className="container">
                    <div className="row" style={rowBreaksAndInputMarginStyle}>
                        <div style={inputLeftCorrectStyle} className="col-12">
                            {this.generateEditBtn()}
                            {this.generateAddBtn()}
                            {this.generateCloseBtn()}
                        </div>
                    </div>
                    <form>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("time-from-label", "Godzina od:", true)}
                            {this.generateReadOnlyLabel("time-range-from", this.state.timeFrom.format("HH:mm"),)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("time-step-label", "Krok:", true)}
                            {this.generateTimeStepReadOnlyLabel()}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("time-to-label", "Godzina do:", true)}
                            {this.generateReadOnlyLabel("time-range-to", this.state.timeTo.format("HH:mm"),)}
                        </div>
                    </form>
                    <div className="row" style={rowBreaksAndInputMarginStyle}>
                    </div>
                </div>          
            );
        }
    }

    generateTimeRange(){
        if(this.state.isRead === true){
            return this.generateForRead();
        }

        return this.generateForEdit();
    }

    render() {
        return this.generateTimeRange();
    }
}

export default TimeRangeCreator;