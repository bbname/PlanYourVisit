import React from 'react';
import VisitTypeStore from '../../stores/VisitTypeStore';
import VisitTypeActionCreator from "../../actions/VisitTypeActionCreator";
import "../styles/layout-style.css";
import VisitTypeFunctions from "../../utils/VisitTypeFunctions";

class VisitTypeCreator extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: VisitTypeStore.getId(),
            name: VisitTypeStore.getName(),
            description: VisitTypeStore.getDescription(),
            availableTimeUnits: VisitTypeStore.getAvailableTimeUnits(),
            timeCost: VisitTypeStore.getTimeCost(),          
            moneyCost: VisitTypeStore.getMoneyCost(),
            isEdit: VisitTypeStore.isEdit(),
            isNew: VisitTypeStore.isNew(),
            isRead: VisitTypeStore.isRead(),
            selectedVisitType: VisitTypeStore.getSelectedVisitType(),
            isFormValid: VisitTypeStore.isFormValid()
        }
    }

    componentWillMount() {
        VisitTypeStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        VisitTypeStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            id: VisitTypeStore.getId(),
            name: VisitTypeStore.getName(),
            description: VisitTypeStore.getDescription(),
            availableTimeUnits: VisitTypeStore.getAvailableTimeUnits(),
            timeCost: VisitTypeStore.getTimeCost(),
            moneyCost: VisitTypeStore.getMoneyCost(),
            isEdit: VisitTypeStore.isEdit(),
            isNew: VisitTypeStore.isNew(),
            isRead: VisitTypeStore.isRead(),
            selectedVisitType: VisitTypeStore.getSelectedVisitType(),
            isFormValid: VisitTypeStore.isFormValid()
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

    generateTimeCostReadOnlyLabel(){
        return <label htmlFor="timeCost" className="col-12 col-form-label">{VisitTypeFunctions.getTimeCostForUser(this.state.timeCost)}</label>;
    }

    generateMoneyCostReadOnlyLabel(){
        return <label htmlFor="moneyCost" className="col-12 col-form-label">{this.state.moneyCost} zł</label>;
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === "visit-type-name"){
            VisitTypeActionCreator.setName(e.target.value);
        }
        else if(e.target.id === "visit-type-description"){
            VisitTypeActionCreator.setDescription(e.target.value);
        }
        else if(e.target.id === "visit-type-timeCost"){
            VisitTypeActionCreator.setTimeCost(e.target.value);
        }
        else if(e.target.id === "visit-type-moneyCost"){
            VisitTypeActionCreator.setMoneyCost(e.target.value);
        }
    }

    handleOnCloseBtnClick = (e) => {
        VisitTypeActionCreator.closeBtnClicked();
    }

    handleOnSaveBtnClick = (e) => {
        VisitTypeActionCreator.saveBtnClicked(this.state.id, this.state.name, this.state.description, this.state.timeCost, this.state.moneyCost);
    }

    handleOnCreateBtnClick = (e) => {
        VisitTypeActionCreator.createBtnClicked(this.state.name, this.state.description, this.state.timeCost, this.state.moneyCost);
    }

    handleOnEditBtnClick = (e) => {
        VisitTypeActionCreator.editBtnClicked();
    }

    handleOnAddBtnClick = (e) => {
        VisitTypeActionCreator.addBtnClicked();
    }

    handleOnDeleteBtnClick = (e) => {
        VisitTypeActionCreator.deleteBtnClicked(this.state.id);
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
                        {this.generateReadOnlyLabel("visit-name-label", "Nazwa:", true)}
                        <input style={inputLeftCorrectStyle} className="form-control" value={this.state.name} onChange={this.handleOnInputChange} type="text" id="visit-type-name" />
                    </div>
                    <div className="form-group">
                        {this.generateReadOnlyLabel("description-label", "Opis:", true)}
                        <textarea style={inputLeftCorrectStyle} className="form-control"  value={this.state.description} onChange={this.handleOnInputChange} type="text" id="visit-type-description" rows={3} />
                    </div>
                    <div className="form-group">
                        {this.generateReadOnlyLabel("timeCost-label", "Czas trwania:", true)}
                        <select value={this.state.timeCost} style={inputLeftCorrectStyle} className="form-control" onChange={this.handleOnInputChange} id="visit-type-timeCost">
                            {this.state.availableTimeUnits.map((timeUnit) => <option key={timeUnit} value={timeUnit}>{VisitTypeFunctions.getTimeCostForUser(timeUnit)}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                    {this.generateReadOnlyLabel("moneyCost-label", "Koszt:", true)}
                        <div className="input-group mb-3"  style={inputLeftCorrectStyle}>
                            <input aria-describedby="basic-addon2" className="form-control"  value={this.state.moneyCost} onChange={this.handleOnInputChange} type="number" min="0.00" max="10000.00" step="0.01" id="visit-type-moneyCost" />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">zł</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        {this.generateReadOnlyLabel("moneyCost-label", "Koszt:", true)}
                        <input style={inputLeftCorrectStyle} className="form-control"  value={this.state.moneyCost} onChange={this.handleOnInputChange} type="number" min="0.00" max="10000.00" step="0.01" id="visit-type-moneyCost" />
                    </div> */}
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
                            {this.generateReadOnlyLabel("visit-name-label", "Nazwa:", true)}
                            {this.generateReadOnlyLabel("visit-name", this.state.name)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("description-label", "Opis:", true)}
                            {this.generateReadOnlyLabel("description", this.state.description)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("timeCost-label", "Czas trwania:", true)}
                            {this.generateTimeCostReadOnlyLabel()}
                            {/* {this.generateReadOnlyLabel("timeCost", this.state.timeCost)} */}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("moneyCost-label", "Koszt:", true)}
                            {this.generateMoneyCostReadOnlyLabel()}
                            {/* {this.generateReadOnlyLabel("moneyCost", this.state.moneyCost)} */}
                        </div>
                    </form>
                    <div className="row" style={rowBreaksAndInputMarginStyle}>
                    </div>
                </div>          
            );
        }
    }

    generateVisitType(){
        if(this.state.isRead === true){
            return this.generateForRead();
        }

        return this.generateForEdit();
    }

    render() {
        return this.generateVisitType();
    }
}

export default VisitTypeCreator;