import React from 'react';
import ProfileStore from "../stores/ProfileStore";
import ProfileActionCreator from "../actions/ProfileActionCreator";
import VisitorStore from "../stores/VisitorStore";
import VisitorActionCreator from "../actions/VisitorActionCreator";
import "./styles/layout-style.css";
import VisitsStore from '../stores/VisitsStore';
import VisitsActionCreator from "../actions/VisitsActionCreator";
import VisitTypeFunctions from '../utils/VisitTypeFunctions';
import firebase from 'firebase';
import "firebase/auth";
import CalendarFunctions from '../utils/CalendarFunctions';

class Visits extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isPlanner: ProfileStore.isPlanner(),
            user: ProfileStore.getUser(),
            visits: VisitsStore.getVisits()
        }
    }

    componentWillMount() {
        ProfileStore.addChangeListener(this._onChange);
        VisitsStore.addChangeListener(this._onChange);

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                VisitsActionCreator.setReservedVisits(user.uid);
                ProfileActionCreator.setUser();
                VisitsActionCreator.setReservedVisitsForPlanner();
            }
        });
    }
 
    componentWillUnmount() {
        ProfileStore.removeChangeListener(this._onChange);
        VisitsStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            isPlanner: ProfileStore.isPlanner(),
            user: ProfileStore.getUser(),
            visits: VisitsStore.getVisits()
        });
    }

    generateTimeCostReadOnlyLabel(timeCost, labelStyle){
        return <label htmlFor="visit-visit-type-timeCost" 
        className="col-12 col-form-label" style={labelStyle}>{VisitTypeFunctions.getTimeCostForUser(timeCost)}</label>;
    }

    generateMoneyCostReadOnlyLabel(moneyCost, labelStyle){
        return <label htmlFor="visit-visit-type-moneyCost" 
        className="col-12 col-form-label" style={labelStyle}>{moneyCost} zł</label>;
    }


    generateReadOnlyLabel(htmlForData, data, shouldBold){
        const labelStyle = {
            paddingLeft: 0,
            paddingRight: 0
        }

        if(shouldBold){
            const boldStyle = {
                fontWeight: "bold",
                paddingLeft: 0,
                paddingRight: 0
            }
            return <label htmlFor={htmlForData} className="col-12 col-form-label" style={boldStyle}>{data}</label>;        
        }
        return <label htmlFor={htmlForData} className="col-12 col-form-label" style={labelStyle}>{data}</label>;
    }

    handleOnConfirmClick = (e) => {
        VisitsActionCreator.confirmVisit(firebase.auth().currentUser.uid, e.target.dataset.plannerId, e.target.value);
    }

    handleOnCancelClick = (e) => {
        VisitsActionCreator.cancelVisit(firebase.auth().currentUser.uid, e.target.dataset.plannerId, e.target.value);
    }

    handleOnDeleteBtnClick = (e) => {
        VisitsActionCreator.deleteVisitForVisitor(firebase.auth().currentUser.uid, e.target.dataset.plannerId, e.target.value);
    }

    handleOnDeleteByPlannerBtnClick = (e) => {
        VisitsActionCreator.deleteVisitForPlanner(firebase.auth().currentUser.uid, e.target.dataset.clientId, e.target.value);
    }

    generateCardForConfirmed(visit){
        const cardStyle = {
            paddingLeft: 0,
            paddingRight: 0
        };
        const emptyRowStyle = {
            height: "38px"
        };
        const rowBreaksStyle = {
            marginBottom: "15px"
        };

        let self = this;
        const cardCss = this.generateCardCss(visit.plannerCancel, "border-success");

        return (
            <div className="col-4" style={rowBreaksStyle}>
                <div className={cardCss.join(' ')} style={cardStyle}>
                    <div className="card-header">
                        {visit.date}
                        <button type="button" onClick={self.handleOnDeleteBtnClick} data-planner-id={visit.plannerId} value={visit.date}
                        className="btn btn-danger btn-sm float-right">
                            <i className="fas fa-times"></i> Usuń
                        </button>
                    </div>
                    <div className="card-body text-success">
                        <h5 className="card-title">{visit.visitType.name}</h5>
                        <p className="card-text">
                            {self.generateReadOnlyLabel("visit-visit-type-timeCost-label", "Czas trwania:", true)}
                            {self.generateTimeCostReadOnlyLabel(visit.visitType.timeCost, cardStyle)}
                            {self.generateReadOnlyLabel("visit-visit-type-moneyCost-label", "Koszt:", true)}
                            {self.generateMoneyCostReadOnlyLabel(visit.visitType.moneyCost, cardStyle)}
                        </p>
                    </div>
                    <div className="card-footer">
                        <div className="row" style={emptyRowStyle}>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    generateCardForCanceled(visit){
        const cardStyle = {
            paddingLeft: 0,
            paddingRight: 0
        };
        const emptyRowStyle = {
            height: "38px"
        };
        const rowBreaksStyle = {
            marginBottom: "15px"
        };

        let self = this;

        return (
            <div className="col-4" style={rowBreaksStyle}>
                <div className="card border-danger" style={cardStyle}>
                    <div className="card-header">
                        {visit.date}
                        <button type="button" onClick={self.handleOnDeleteBtnClick} data-planner-id={visit.plannerId} value={visit.date}
                        className="btn btn-danger btn-sm float-right">
                            <i className="fas fa-times"></i> Usuń
                        </button>
                    </div>
                    <div className="card-body text-danger">
                        <h5 className="card-title">{visit.visitType.name}</h5>
                        <p className="card-text">
                            {self.generateReadOnlyLabel("visit-visit-type-timeCost-label", "Czas trwania:", true)}
                            {self.generateTimeCostReadOnlyLabel(visit.visitType.timeCost, cardStyle)}
                            {self.generateReadOnlyLabel("visit-visit-type-moneyCost-label", "Koszt:", true)}
                            {self.generateMoneyCostReadOnlyLabel(visit.visitType.moneyCost, cardStyle)}
                        </p>
                    </div>
                    <div className="card-footer">
                        <div className="row" style={emptyRowStyle}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    generateCardCss(isPlanerCancel, additionalClass){
        let inputCssClasses = ["card"];
        inputCssClasses.push(additionalClass);

        if(isPlanerCancel === true){
            inputCssClasses.push('bg-warning');
        }
        return inputCssClasses;
    }

    generateSpecialCaseIfPlannerCanceld(visit){
        let self = this;
        if(visit.plannerCancel){
            return (
                <button type="button" onClick={self.handleOnDeleteBtnClick} data-planner-id={visit.plannerId} value={visit.date}
                className="btn btn-danger btn-sm float-right">
                    <i className="fas fa-times"></i> Usuń
                </button>
            );
        }

    }

    generateCard(visit){
        const cardStyle = {
            paddingLeft: 0,
            paddingRight: 0
        };
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const headerStyle = {
            height: "56px"
        };

        let self = this;
        const cardCss = this.generateCardCss(visit.plannerCancel, "border-secondary");

        return (
            <div className="col-4" style={rowBreaksStyle}>
                {/* <div className="card border-secondary" style={cardStyle}> */}
                <div className={cardCss.join(' ')} style={cardStyle}>
                    <div className="card-header" style={headerStyle}>
                        {visit.date}
                        {self.generateSpecialCaseIfPlannerCanceld(visit)}
                    </div>
                    <div className="card-body text-secondary">
                        <h5 className="card-title">{visit.visitType.name}</h5>
                        <p className="card-text">
                            {self.generateReadOnlyLabel("visit-visit-type-timeCost-label", "Czas trwania:", true)}
                            {self.generateTimeCostReadOnlyLabel(visit.visitType.timeCost, cardStyle)}
                            {self.generateReadOnlyLabel("visit-visit-type-moneyCost-label", "Koszt:", true)}
                            {self.generateMoneyCostReadOnlyLabel(visit.visitType.moneyCost, cardStyle)}
                        </p>
                    </div>
                    <div className="card-footer">
                        <button type="button" data-planner-id={visit.plannerId} value={visit.date} onClick={self.handleOnConfirmClick} className="btn btn-success float-left"
                        disabled={visit.plannerCancel}>
                            <i className="fas fa-check"></i> Potwierdź
                        </button>
                        <button type="button" data-planner-id={visit.plannerId} value={visit.date} onClick={self.handleOnCancelClick} className="btn btn-danger float-right"
                        disabled={visit.plannerCancel}>
                            <i className="fas fa-ban"></i> Anuluj
                        </button>
                    </div>
                </div>
            </div>      
        );
    }

    generateCards(){
        const cardStyle = {
            paddingLeft: 0,
            paddingRight: 0
        };

        let self = this;

        return this.state.visits.map(function(visit) {
            if(visit.userConfirmed){
                return self.generateCardForConfirmed(visit);
            }
            else if(visit.userCanceled){
                return self.generateCardForCanceled(visit);
            }
            else{
                return self.generateCard(visit);
            }
        });
    }

    generateForVisitor(){
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const cardStyle = {
            paddingLeft: 0,
            paddingRight: 0
        };

        let self = this;

        return (
            <div className="container">
                <div className="row" style={rowBreaksStyle}>
                    <div className="col-12">
                        <h1 className="jumbotron-heading text-center">
                            Twoje zarezerwowane wizyty
                        </h1>
                    </div>
                </div>
                <div className="row" style={rowBreaksStyle}>
                    {self.generateCards()}
                </div>
            </div>
        );
    }

    generateLabelHourVisitName(hour){
        const dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(hour.date);
        const hourString = CalendarFunctions.getHoursFormatForDatabase(dateObj);
        const boldStyle = {
            fontWeight: "bold",
        };

        return hourString;
    }

    generateLabelClientInfo(hour){
        const style = {
            marginRight: "5px",
        };
        return (
            <p className="card-text">
                <label htmlFor="hour" className="col-12 col-form-label">
                    <i className="fas fa-user" style={style}></i> {hour.client.name}
                </label>
                <label htmlFor="hour" className="col-12 col-form-label">
                    <i className="fas fa-envelope-square" style={style}></i> {hour.client.email}
                </label>
                <label htmlFor="hour" className="col-12 col-form-label">
                    <i className="fas fa-phone" style={style}></i> {hour.client.phone} 
                </label>
            </p>         
        );
    }

    getCardCssClasses(userConfirmed){
        let inputCssClasses = ["card"];

        if(userConfirmed === true){
            inputCssClasses.push('border-success')
        }
        return inputCssClasses;
    }

    getCardBodyCssClasses(userConfirmed){
        let inputCssClasses = ["card-body"];

        if(userConfirmed === true){
            inputCssClasses.push('text-success')
        }
        return inputCssClasses;
    }

    generateHours(hours){
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        let self = this;

        return hours.map(function(hour){
            const cardClasses = self.getCardCssClasses(hour.userConfirmed);
            const cardBodyClasses = self.getCardBodyCssClasses(hour.userConfirmed);

            return (<div className="col-12" style={rowBreaksStyle}>
                        <div className={cardClasses.join(' ')} >
                            <div className={cardBodyClasses.join(' ')}>
                                <h5 className="card-title">
                                    {self.generateLabelHourVisitName(hour)}
                                    <button type="button" onClick={self.handleOnDeleteByPlannerBtnClick} data-client-id={hour.clientId} value={hour.date}
                                    className="btn btn-danger btn-sm float-right">
                                        <i className="fas fa-times"></i> Usuń
                                    </button>
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">{hour.selectedVisitTypeName}</h6>
                                {self.generateLabelClientInfo(hour)}
                            </div>
                        </div>
                    </div>);
        });    
    }

    generateDays(){
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const boldStyle = {
            fontWeight: "bold",
            textAlign: "center"
        };
        let self = this;


        return this.state.visits.map(function(visit) {
            return (
                <div className="col-4" style={rowBreaksStyle}>
                    <div>
                        <div className="col-12"><h3 style={boldStyle}>{visit.date}</h3></div>
                        <div>
                            {self.generateHours(visit.hours)}
                        </div>
                    </div>
                </div>    
            );
        });
    }

    generateForPlanner(){
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        let self = this;

        return (
            <div className="container">
                <div className="row" style={rowBreaksStyle}>
                    <div className="col-12">
                        <h1 className="jumbotron-heading text-center">
                            Zarezerwowane wizyty
                        </h1>
                    </div>
                </div>
                <div className="row" style={rowBreaksStyle}>
                    {self.generateDays()}
                </div>
            </div>
        );
    }

    generateVisits(){
        if(this.state.isPlanner || ProfileStore.isPlanner()){
            return this.generateForPlanner();
        }

        return this.generateForVisitor();
    }

    render() {
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const emptyRowStyle = {
            height: "38px"
        };

        return (
            this.generateVisits()
        );
    }
}

export default Visits;