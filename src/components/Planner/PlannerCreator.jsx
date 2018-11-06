import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
import DailyPlanStore from '../../stores/DailyPlanStore';
import DailyPlanActionCreator from "../../actions/DailyPlanActionCreator";
import PlannerDayCreator from "./PlannerDayCreator.jsx";
import PlannerStore from '../../stores/PlannerStore';
import PlannerActionCreator from "../../actions/PlannerActionCreator";

class PlannerCreator extends Component {
    constructor(){
        super();

        this.state = {
            dailyPlans: DailyPlanStore.getDailyPlans(),
            isNew: PlannerStore.isNew(),
            isEdit: PlannerStore.isEdit(),
            monday: PlannerStore.getMonday(),
            tuesday: PlannerStore.getTuesday(),
            wednesday: PlannerStore.getWednesday(),
            thursday: PlannerStore.getThursday(),
            friday: PlannerStore.getFriday(),
            saturday: PlannerStore.getSaturday(),
            sunday: PlannerStore.getSunday()
        }
    }

    actionForDayByKeyDay(keyDay, callback){
        switch (keyDay){
            case "mon": {
                callback(this.state.monday);
                break;
            }
            case "tue": {
                callback(this.state.tuesday);
                break;
            }
            case "wed": {
                callback(this.state.wednesday);
                break;
            }
            case "thu": {
                callback(this.state.thursday);
                break;
            }
            case "fri": {
                callback(this.state.friday);
                break;
            }
            case "sat": {
                callback(this.state.saturday);
                break;
            }
            case "sun": {
                callback(this.state.sunday);
                break;
            }
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
            isNew: PlannerStore.isNew(),
            isEdit: PlannerStore.isEdit(),
            monday: PlannerStore.getMonday(),
            tuesday: PlannerStore.getTuesday(),
            wednesday: PlannerStore.getWednesday(),
            thursday: PlannerStore.getThursday(),
            friday: PlannerStore.getFriday(),
            saturday: PlannerStore.getSaturday(),
            sunday: PlannerStore.getSunday()
        });
    }

    handleOnCreateBtnClick = (e) => {
        let dayKey = e.target.id.substring(0,3);
        let self = this;
        
        this.actionForDayByKeyDay(dayKey, function(day){
            if(day.dailyPlanId === undefined){
                day.dailyPlanId = self.state.dailyPlans[0].id;
            }
            PlannerActionCreator.createBtnClicked(day);
        });
    }

    handleOnSaveBtnClick = (e) => {
        let dayKey = e.target.id.substring(0,3);

        this.actionForDayByKeyDay(dayKey, function(day){
            PlannerActionCreator.saveBtnClicked(day);
        });
    }

    handleOnDeleteBtnClick = (e) => {
        let dayKey = e.target.id.substring(0,3);

        this.actionForDayByKeyDay(dayKey, function(day){
            PlannerActionCreator.deleteBtnClicked(day);
        });
    }

    render() {
        const divStyle = {
            height: "100%",
            backgroundColor: "white"
        }
        const lastTdFixStyle = {
            marginRight: "1px"
        }
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
        return (
        <Row className="hours-grid-container">
            <div className="col-xs-12 col-sm-12 col-md-12 week-carousel"  style={divStyle}>
                <Table bordered condensed responsive>
                    <thead>
                        <tr id="planer-week-days-th-row">
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
                        <tr id="planer-week-days-tr-row" className="container">
                            <PlannerDayCreator 
                                dayKey = {"mon"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                            />
                            <PlannerDayCreator 
                                dayKey = {"tue"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                            />
                            <PlannerDayCreator 
                                dayKey = {"wed"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                            />
                             <PlannerDayCreator 
                                dayKey = {"thu"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                             />
                             <PlannerDayCreator 
                                dayKey = {"fri"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                            />
                            <PlannerDayCreator 
                                dayKey = {"sat"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                            />
                            <PlannerDayCreator 
                                dayKey = {"sun"}
                                handleOnCreateBtnClick = {this.handleOnCreateBtnClick}
                                handleOnSaveBtnClick = {this.handleOnSaveBtnClick}
                                handleOnDeleteBtnClick = {this.handleOnDeleteBtnClick}
                            />
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Row>
        );
    }
}

export default PlannerCreator;