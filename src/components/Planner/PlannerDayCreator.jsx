import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
import DailyPlanStore from '../../stores/DailyPlanStore';
import DailyPlanActionCreator from "../../actions/DailyPlanActionCreator";
import PlannerStore from '../../stores/PlannerStore';
import PlannerActionCreator from "../../actions/PlannerActionCreator";
import CalendarFunctions from '../../utils/CalendarFunctions';

class PlannerDayCreator extends Component {
    constructor(props){
        super(props);

        this.state = {
            dailyPlans: DailyPlanStore.getDailyPlans(),
            selectedDailyPlan: DailyPlanStore.getSelectedDailyPlan(),
            day: null,
            isNew: PlannerStore.isNew(),
            isEdit: PlannerStore.isEdit(),
            isRead: PlannerStore.isRead(),
            currentDayKey: PlannerStore.getCurrentDayKey()
        }
    }

    componentWillMount() {
        DailyPlanStore.addChangeListener(this._onChange);
        PlannerStore.addChangeListener(this._onChange);
    }

    componentDidMount(){
        DailyPlanActionCreator.setDailyPlans();
    }

    componentWillUnmount() {
        DailyPlanStore.removeChangeListener(this._onChange);
        PlannerStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            dailyPlans: DailyPlanStore.getDailyPlans(),
            selectedDailyPlan: DailyPlanStore.getSelectedDailyPlan(),
            day: PlannerStore.getDay(this.props.dayKey),
            isNew: PlannerStore.isNew(),
            isEdit: PlannerStore.isEdit(),
            isRead: PlannerStore.isRead(),
            currentDayKey: PlannerStore.getCurrentDayKey()
        });
    }

    isForRead(){
        return (this.state.isRead === true && this.state.day !== null && this.state.day.id !== undefined);
    }

    isCurrentItemEdit(){
        return this.state.currentDayKey === this.props.dayKey;
    }

    handleOnInputChange = (e) => {
        let dayKey = e.target.id.substring(0,3);
        if(dayKey === this.props.dayKey){
            PlannerActionCreator.setSelectedDailyPlan(this.props.dayKey, e.target.value);
        }
    }

    handleOnEditBtnClick = (e) => {
        PlannerActionCreator.editBtnClicked(this.props.dayKey);
    }

    handleOnCloseBtnClick = (e) => {
        PlannerActionCreator.closeBtnClicked();
    }

    generateEditBtn(buttonSpaceStyle){
        // if(this.isForRead() || this.state.isRead === false){
        // if(this.isForRead() || this.isCurrentItemEdit() || (this.state.isEdit && this.state.day !== null && this.state.day.id !== undefined)){
            if(this.isForRead() || (this.isCurrentItemEdit() && this.isForRead()) || (this.state.isEdit && this.state.day !== null && this.state.day.id !== undefined)){
            return (
                <button type="button" style={buttonSpaceStyle} onClick={this.handleOnEditBtnClick} className="btn btn-warning btn-sm float-right" 
                disabled={(this.state.isEdit || this.state.isNew) && this.isCurrentItemEdit()}>
                    <i className="fas fa-pen"></i> Edytuj
                </button>
            ); 
        }  
    }

    generateCloseBtn(buttonSpaceStyle){
        if(this.state.isEdit === true && this.isCurrentItemEdit()){
            return (
                <button style={buttonSpaceStyle} type="button" onClick={this.handleOnCloseBtnClick} className="close float-right" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
            ); 
        }  
    }

    generateCreateBtn(){
        const buttonSpaceStyle = {
            marginBottom: "10px",
            marginTop: "10px",
            marginRight: "5px",
            marginLeft: "5px"
        };
        const btnId = this.props.dayKey + "-planner-create-btn";

        if(this.state.isEdit === null || this.state.isEdit === false){
            return (
                <button id={btnId} style={buttonSpaceStyle} type="button" onClick={this.props.handleOnCreateBtnClick} className="btn btn-success btn-sm float-left">
                    <i className="fas fa-plus"></i> Utwórz
                </button>
            ); 
        }  
    }

    generateDeleteBtn(buttonSpaceStyle){
        const btnId = this.props.dayKey + "-planner-delete-btn";

        if(this.state.isEdit === true && this.isCurrentItemEdit()){
            return (
                <button id={btnId} style={buttonSpaceStyle} type="button" onClick={this.props.handleOnDeleteBtnClick} className="btn btn-danger btn-sm float-right">
                    <i className="fas fa-times"></i> Usuń
                </button>
            ); 
        }  
    }

    generateSaveBtn(buttonSpaceStyle){
        const btnId = this.props.dayKey + "-planner-save-btn";

        if(this.state.isEdit === true && this.isCurrentItemEdit()){
            return (
                <button id={btnId} style={buttonSpaceStyle} type="button" onClick={this.props.handleOnSaveBtnClick} className="btn btn-success btn-sm float-right">
                    <i className="fas fa-check"></i> Zapisz
                </button>
            ); 
        }  
    }

    generateForEdit(){
        const buttonSpaceStyle = {
            marginBottom: "10px",
            marginTop: "10px",
            marginRight: "5px"
        }
        const buttonSpaceBottomStyle = {
            marginBottom: "10px"
        }
        const buttonSpaceTopStyle = {
            marginTop: "10px"
        }

        const selectId = this.props.dayKey + "-planner-daily-plan-selector";
        const selectedItemId = (this.state.day !== null && this.state.day.dailyPlanId !== null )? this.state.day.dailyPlanId : this.state.selectedDailyPlan.id;
        return (
            <td className="flex-item">
                {/* <button style={buttonSpaceStyle} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
                <button style={buttonSpaceStyle} type="button" className="btn btn-warning btn-sm float-right">
                        <i className="fas fa-pen"></i> Edytuj
                </button> */}
                {this.generateCloseBtn(buttonSpaceStyle)}
                {this.generateEditBtn(buttonSpaceStyle)}
                <select disabled={this.isForRead() || (this.state.isEdit && !this.isCurrentItemEdit())}
                    value={selectedItemId}                     
                    className="form-control custom-select" 
                    onClick={this.handleOnInputChange}
                    onChange={this.handleOnInputChange} 
                    id={selectId}>
                            {this.state.dailyPlans.map((dailyPlan) => 
                            <option key={dailyPlan.id} value={dailyPlan.id}>{dailyPlan.name}</option>)}
                </select>
                {this.generateCreateBtn()}
                {this.generateDeleteBtn(buttonSpaceStyle)}
                {this.generateSaveBtn(buttonSpaceStyle)}
                {/* <button style={buttonSpaceStyle} type="button" className="btn btn-danger btn-sm float-right">
                    <i className="fas fa-times"></i> Usuń
                </button>
                <button style={buttonSpaceStyle} type="button" className="btn btn-success btn-sm float-right">
                    <i className="fas fa-plus"></i> Utwórz
                </button> */}
            </td>
        );
    }

    generateForRead(){
        const buttonSpaceStyle = {
            marginBottom: "10px",
            marginTop: "10px",
            marginRight: "5px"
        }
        const buttonSpaceBottomStyle = {
            marginBottom: "10px"
        }
        const buttonSpaceTopStyle = {
            marginTop: "10px"
        }

        const selectId = this.props.dayKey + "-planner-daily-plan-selector";
        return (
            <td className="flex-item">
                {/* <button style={buttonSpaceStyle} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
                <button style={buttonSpaceStyle} type="button" className="btn btn-warning btn-sm float-right">
                        <i className="fas fa-pen"></i> Edytuj
                </button> */}
                {this.generateEditBtn(buttonSpaceStyle)}
                <select disabled={this.state.isRead}
                    value={this.state.day.dailyPlanId}                     
                    className="form-control custom-select" 
                    onClick={this.handleOnInputChange}
                    onChange={this.handleOnInputChange} 
                    id={selectId}>
                            {this.state.dailyPlans.map((dailyPlan) => 
                            <option key={dailyPlan.id} value={dailyPlan.id}>{dailyPlan.name}</option>)}
                </select>
                {/* <button style={buttonSpaceStyle} type="button" className="btn btn-danger btn-sm float-right">
                    <i className="fas fa-times"></i> Usuń
                </button>
                <button style={buttonSpaceStyle} type="button" className="btn btn-success btn-sm float-right">
                    <i className="fas fa-plus"></i> Utwórz
                </button> */}
            </td>
        );
    }

    generateDayPlan(){
        if(this.isForRead()){
            return this.generateForRead()
        }

        return this.generateForEdit()
    }

    render() {
        return this.generateDayPlan();
    }
}

export default PlannerDayCreator;