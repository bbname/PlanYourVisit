import React from 'react';
import VisitTypeStore from '../../stores/VisitTypeStore';
import VisitTypeActionCreator from "../../actions/VisitTypeActionCreator";
import TimeRangeStore from '../../stores/TimeRangeStore';
import TimeRangeActionCreator from "../../actions/TimeRangeActionCreator";
import DailyPlanStore from '../../stores/DailyPlanStore';
import DailyPlanActionCreator from "../../actions/DailyPlanActionCreator";
import "../styles/layout-style.css";
import VisitTypeFunctions from "../../utils/VisitTypeFunctions";
import _ from "underscore";

class DailyPlanCreator extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: DailyPlanStore.getId(),
            name: DailyPlanStore.getName(),
            timeRanges: DailyPlanStore.getTimeRanges(),
            visitTypes: DailyPlanStore.getVisitTypes(),
            selectedTimeRanges: DailyPlanStore.getSelectedTimeRanges(),  
            selectedVisitTypes: DailyPlanStore.getSelectedVisitTypes(),  
            isEdit: DailyPlanStore.isEdit(),
            isNew: DailyPlanStore.isNew(),
            isRead: DailyPlanStore.isRead(),
            selectedDailyPlan: DailyPlanStore.getSelectedDailyPlan(),
            isFormValid: DailyPlanStore.isFormValid(),
            availableTimeRanges: TimeRangeStore.getTimeRanges(),          
            availableVisitTypes: VisitTypeStore.getVisitTypes(),
            selectedAvailableTimeRanges: TimeRangeStore.getDailyPlanSelectedTimeRanges(),  
            selectedAvailableVisitTypes: VisitTypeStore.getDailyPlanSelectedVisitTypes(),
        }
    }

    componentWillMount() {
        DailyPlanStore.addChangeListener(this._onChange);
        VisitTypeStore.addChangeListener(this._onChange);
        TimeRangeStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        TimeRangeActionCreator.setTimeRanges();
        VisitTypeActionCreator.setVisitTypes();
        DailyPlanActionCreator.setDailyPlans();
    }
 
    componentWillUnmount() {
        DailyPlanStore.removeChangeListener(this._onChange);
        VisitTypeStore.removeChangeListener(this._onChange);
        TimeRangeStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            id: DailyPlanStore.getId(),
            name: DailyPlanStore.getName(),
            timeRanges: DailyPlanStore.getTimeRanges(),
            visitTypes: DailyPlanStore.getVisitTypes(),
            selectedTimeRanges: DailyPlanStore.getSelectedTimeRanges(),  
            selectedVisitTypes: DailyPlanStore.getSelectedVisitTypes(),  
            isEdit: DailyPlanStore.isEdit(),
            isNew: DailyPlanStore.isNew(),
            isRead: DailyPlanStore.isRead(),
            selectedDailyPlan: DailyPlanStore.getSelectedDailyPlan(),
            isFormValid: DailyPlanStore.isFormValid(),
            availableTimeRanges: TimeRangeStore.getTimeRanges(),          
            availableVisitTypes: VisitTypeStore.getVisitTypes(),
            selectedAvailableTimeRanges: TimeRangeStore.getDailyPlanSelectedTimeRanges(),  
            selectedAvailableVisitTypes: VisitTypeStore.getDailyPlanSelectedVisitTypes()
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

    generateLabelForAvailableItems(htmlForData, data, shouldBold, handleOnAddBtnClick){
        const rightButtonStyle = {
            marginRight: "-15px"
        };

        if(shouldBold){
            const boldStyle = {
                fontWeight: "bold"
            }
            return (
                <div>
                    <label htmlFor={htmlForData} className="col-6 col-form-label" style={boldStyle}>{data}</label> 
                    <button type="button" style={rightButtonStyle} onClick={handleOnAddBtnClick} className="btn btn-success btn-sm float-right">
                        <i className="fas fa-plus"></i> Dodaj
                    </button>
                </div>
            );      
        }
        return <label htmlFor={htmlForData} className="col-6 col-form-label">{data}</label>;
    }

    generateLabelForItems(htmlForData, data, shouldBold, handleOnDeleteBtnClick){
        const rightButtonStyle = {
            marginRight: "-15px"
        };

        if(shouldBold){
            const boldStyle = {
                fontWeight: "bold"
            }
            return (
                <div>
                    <label htmlFor={htmlForData} className="col-6 col-form-label" style={boldStyle}>{data}</label> 
                    <button type="button" style={rightButtonStyle} onClick={handleOnDeleteBtnClick} className="btn btn-danger btn-sm float-right">
                        <i className="fas fa-times"></i> Usuń
                    </button>
                </div>
            );      
        }
        return <label htmlFor={htmlForData} className="col-6 col-form-label">{data}</label>;
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === "daily-plan-name"){
            DailyPlanActionCreator.setName(e.target.value);
        }
    }

    handleOnCloseBtnClick = (e) => {
        DailyPlanActionCreator.closeBtnClicked();
    }

    handleOnSaveBtnClick = (e) => {
        DailyPlanActionCreator.saveBtnClicked(this.state.id, this.state.name, this.state.timeRanges, this.state.visitTypes);
    }

    handleOnCreateBtnClick = (e) => {
        DailyPlanActionCreator.createBtnClicked(this.state.name, this.state.timeRanges, this.state.visitTypes);
    }

    handleOnEditBtnClick = (e) => {
        DailyPlanActionCreator.editBtnClicked();
    }

    handleOnAddBtnClick = (e) => {
        DailyPlanActionCreator.addBtnClicked();
    }

    handleOnDeleteBtnClick = (e) => {
        DailyPlanActionCreator.deleteBtnClicked(this.state.id);
    }

    handleOnAvailableTimeRangeInputChange = (e) => {
        let selectedTimeRangeIds = this.getIdsFromMultiSelect(e);
        TimeRangeActionCreator.setSelectedTimeRanges(selectedTimeRangeIds);
    }

    handleOnAvailableTimeRangesAddButtonClick = (e) => {
        DailyPlanActionCreator.setTimeRanges(this.state.selectedAvailableTimeRanges);
    }

    handleOnAvailableVisitTypeInputChange = (e) => {
        let selectedVisitTypeIds = this.getIdsFromMultiSelect(e);
        VisitTypeActionCreator.setSelectedVisitTypes(selectedVisitTypeIds);
    }

    handleOnAvailableVisitTypesAddButtonClick = (e) => {
        DailyPlanActionCreator.setVisitTypes(this.state.selectedAvailableVisitTypes);
    }

    handleOnTimeRangeInputChange = (e) => {
        let selectedTimeRangeIds = this.getIdsFromMultiSelect(e);
        DailyPlanActionCreator.setSelectedTimeRanges(selectedTimeRangeIds);
    }

    handleOnTimeRangesDeleteButtonClick = (e) => {
        DailyPlanActionCreator.deleteSelectedTimeRanges();
    }

    handleOnVisitTypeInputChange = (e) => {
        let selectedVisitTypeIds = this.getIdsFromMultiSelect(e);
        DailyPlanActionCreator.setSelectedVisitTypes(selectedVisitTypeIds);
    }

    handleOnVisitTypesDeleteButtonClick = (e) => {
        DailyPlanActionCreator.deleteSelectedVisitTypes();
    }

    getIdsFromMultiSelect(e){
        let ids = _.map(e.target.selectedOptions, function(selectedOption){
            return selectedOption.value;
        });

        return ids;
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

    getValueForMultiSelect(stateSelectedValues){
        return _.map(stateSelectedValues, function(stateSelectedValue){
            return stateSelectedValue.id;
        })
    }

    generateTimeRangeLabels(){
        return (
            <div>
                {this.state.timeRanges.map((timeRange) => 
                    <label key={timeRange.id} className="col-12 col-form-label">
                        {timeRange.timeFrom} - {timeRange.timeTo}, krok: {VisitTypeFunctions.getTimeCostForUser(timeRange.timeStep)}
                    </label>)}
            </div>
        );    
    }

    generateVisitTypeLabels(){
        return (
            <div>
                {this.state.visitTypes.map((visitType) => 
                    <label key={visitType.id} className="col-12 col-form-label">
                        {visitType.name}
                    </label>)}
            </div>
        );    
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

        const sizeOfSelects = 8;

        return (
            <div className="container">
                <div className="row">
                    <div style={inputLeftCorrectStyle} className="col-12">
                        {this.generateCloseBtn()}
                        {this.generateEditBtn()}
                        {this.generateAddBtn()}
                    </div>
                </div>
                <form>
                    <div className="form-group">
                        {this.generateReadOnlyLabel("daily-plan-name-label", "Nazwa:", true)}
                        <input style={inputLeftCorrectStyle} className="form-control" value={this.state.name} onChange={this.handleOnInputChange} type="text" id="daily-plan-name" />
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            {this.generateLabelForAvailableItems("daily-plan-available-time-ranges-label", "Dostępne zakresy czasowe:", true, this.handleOnAvailableTimeRangesAddButtonClick)}
                            <select multiple={true} value={this.getValueForMultiSelect(this.state.selectedAvailableTimeRanges)} style={inputLeftCorrectStyle} 
                                className="form-control custom-select" size={sizeOfSelects} 
                                onChange={this.handleOnAvailableTimeRangeInputChange} id="daily-plan-available-time-range-selector">
                                        {this.state.availableTimeRanges.map((timeRange) => 
                                        <option key={timeRange.id} value={timeRange.id}>
                                            {timeRange.timeFrom} - {timeRange.timeTo}, krok: {VisitTypeFunctions.getTimeCostForUser(timeRange.timeStep)}
                                        </option>)}
                            </select>
                        </div>
                        <div className="form-group col-6">
                            {this.generateLabelForItems("daily-plan-selected-time-ranges-label", "Wybrane zakresy czasowe:", true, this.handleOnTimeRangesDeleteButtonClick)}
                            <select multiple={true} value={this.getValueForMultiSelect(this.state.selectedTimeRanges)} style={inputLeftCorrectStyle} 
                                className="form-control custom-select" size={sizeOfSelects} 
                                onChange={this.handleOnTimeRangeInputChange} id="daily-plan-selected-time-range-selector">
                                        {this.state.timeRanges.map((timeRange) => 
                                        <option key={timeRange.id} value={timeRange.id}>
                                            {timeRange.timeFrom} - {timeRange.timeTo}, krok: {VisitTypeFunctions.getTimeCostForUser(timeRange.timeStep)}
                                        </option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            {this.generateLabelForAvailableItems("daily-plan-available-visit-types-label", "Dostępne typy wizyt:", true, this.handleOnAvailableVisitTypesAddButtonClick)}
                            <select multiple={true} value={this.getValueForMultiSelect(this.state.selectedAvailableVisitTypes)} style={inputLeftCorrectStyle} 
                                className="form-control custom-select" size={sizeOfSelects} 
                                onChange={this.handleOnAvailableVisitTypeInputChange} id="daily-plan-available-visit-type-selector">
                                        {this.state.availableVisitTypes.map((visitType) => 
                                        <option key={visitType.id} value={visitType.id}>
                                            {visitType.name}
                                        </option>)}
                            </select>
                        </div>
                        <div className="form-group col-6">
                            {this.generateLabelForItems("daily-plan-selected-visit-types-label", "Wybrane typy wizyt:", true, this.handleOnVisitTypesDeleteButtonClick)}
                            <select multiple={true} value={this.getValueForMultiSelect(this.state.selectedVisitTypes)} style={inputLeftCorrectStyle} 
                                className="form-control custom-select" size={sizeOfSelects} 
                                onChange={this.handleOnVisitTypeInputChange} id="daily-plan-selected-visit-type-selector">
                                        {this.state.visitTypes.map((visitType) => 
                                        <option key={visitType.id} value={visitType.id}>
                                            {visitType.name}
                                        </option>)}
                            </select>
                        </div>
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
                marginLeft: "0px"
            }
            const emptyRowStyle = {
                height: "38px"
            };
            const inputLeftCorrectStyle = {
                marginLeft: "30px"
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
                            {this.generateReadOnlyLabel("daily-plan-name-label", "Nazwa:", true)}
                            {this.generateReadOnlyLabel("daily-plan-name", this.state.name)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("daily-plan-name-label", "Wybrane zakresy czasowe:", true)}
                            {this.generateTimeRangeLabels()}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("daily-plan-name-label", "Wybrane typy wizyt:", true)}
                            {this.generateVisitTypeLabels()}
                        </div>
                    </form>
                    <div className="row" style={rowBreaksAndInputMarginStyle}>
                    </div>
                </div>          
            );
        }
    }

    generateDailyPlan(){
        if(this.state.isRead === true){
            return this.generateForRead();
        }

        return this.generateForEdit();
    }

    render() {
        return this.generateDailyPlan();
    }
}

export default DailyPlanCreator;