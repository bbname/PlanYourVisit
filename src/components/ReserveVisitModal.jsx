import React, { Component } from 'react';
import VisitorActionCreator from "../actions/VisitorActionCreator";
import VisitorStore from "../stores/VisitorStore";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";

class ReserveVisitModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            plannerId: VisitorStore.getPlannerId(),
            selectedVisit: VisitorStore.getSelectedVisit(),
            selectedVisitType: VisitorStore.getSelectedVisitType(),
            availableVisitTypes: VisitorStore.getAvailableVisitTypes()
        }

    }

    componentWillMount() {
        VisitorStore.addChangeListener(this._onChange);
    }
    
    componentWillUnmount() {
        VisitorStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            plannerId: VisitorStore.getPlannerId(),
            selectedVisit: VisitorStore.getSelectedVisit(),
            selectedVisitType: VisitorStore.getSelectedVisitType(),
            availableVisitTypes: VisitorStore.getAvailableVisitTypes()
        });
  
        //VisitorActionCreator.closeReserveVisitModal(this.state.isLoginSuccessFull);
    }

    handleOnInputChange = (e) =>{
        VisitorActionCreator.setSelectedVisitType(e.target.value);
    }

    handleOnReserve = (e) => {
        VisitorActionCreator.reserveVisit(this.state.plannerId, this.state.selectedVisit, this.state.selectedVisitType);
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
        return <label htmlFor="visitor-timeCost" className="col-12 col-form-label">{VisitTypeFunctions.getTimeCostForUser(this.state.selectedVisitType.timeCost)}</label>;
    }

    generateMoneyCostReadOnlyLabel(){
        return <label htmlFor="visitor-moneyCost" className="col-12 col-form-label">{this.state.selectedVisitType.moneyCost} zł</label>;
    }

    generateBody(){
        if(this.state.availableVisitTypes.length === 0){
            return <h5 className="modal-title" id="reserveVisitModal">Brak dostępnych wizyt w wybranym terminie</h5>
        }
        return (
            <form>
                <div className="form-group">
                    {this.generateReadOnlyLabel("visitor-visit-type-label", "Wizyta:", true)}
                    <select value={this.state.selectedVisitType.id} 
                        onChange={this.handleOnInputChange} 
                        className="form-control" id="visitor-visit-type-selector">
                            {this.state.availableVisitTypes.map((visitType) => <option key={visitType.id} value={visitType.id}>{visitType.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    {this.generateReadOnlyLabel("visitor-description-label", "Opis:", true)}
                    {this.generateReadOnlyLabel("visitor-description", this.state.selectedVisitType.description)}
                </div>
                <div className="form-group">
                    {this.generateReadOnlyLabel("visitor-timeCost-label", "Czas trwania:", true)}
                    {this.generateTimeCostReadOnlyLabel()}
                </div>
                <div className="form-group">
                    {this.generateReadOnlyLabel("visitor-moneyCost-label", "Koszt:", true)}
                    {this.generateMoneyCostReadOnlyLabel()}
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className="modal fade" id="reserveVisitModal"
                data-backdrop="static" tabIndex="-1" role="dialog" 
                aria-labelledby="reserveVisitModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                                <h5 className="modal-title" id="reserveVisitModal">Rezerwacja terminu {this.state.selectedVisit.date}</h5>
                            <button type="button" className="close" onClick={this.handleOnModalClose} 
                                data-dismiss="modal" aria-label="Close" id="close-reserve-visit-modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.generateBody()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleOnModalClose} data-dismiss="modal" id="close-reserve-visit-modal">Zamknij</button>
                            <button type="button" className="btn btn-success" onClick={this.handleOnReserve} disabled={this.state.availableVisitTypes.length === 0}>
                                <i className="fas fa-check"></i> Zarezerwuj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReserveVisitModal;