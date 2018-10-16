import React from 'react';
import RegisterForm from './RegisterForm.jsx';
import RegisterStore from "../../stores/RegisterStore"
import RegisterActionCreator from "../../actions/RegisterActionCreator"

class RegisterModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          shouldShowSpinnerLoader: RegisterStore.shouldShowSpinnerLoader(),
          isRegistrationSuccessFull: RegisterStore.isRegistrationSuccessFull(),
          registrationErrorTitle: RegisterStore.getRegistartionErrorTitle(),
          registrationErrorMessage: RegisterStore.getRegistartionErrorMessage()
        }

        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        RegisterStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        RegisterStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
          shouldShowSpinnerLoader: RegisterStore.shouldShowSpinnerLoader(),
          isRegistrationSuccessFull: RegisterStore.isRegistrationSuccessFull(),
          registrationErrorTitle: RegisterStore.getRegistartionErrorTitle(),
          registrationErrorMessage: RegisterStore.getRegistartionErrorMessage()
        })
    }
    handleOnModalClose = (e) => {
        RegisterActionCreator.clearData();
    }

    handleOnRegister = (e) => {
        RegisterActionCreator.registerBtnClicked();
        RegisterActionCreator.runFormValidation(this.props.isForPlanner);
        RegisterActionCreator.registerUser(this.props.isForPlanner);
        RegisterActionCreator.checkRegistrationResult();
    }

    generateUserRegistrationMessageSuccess(){
      return (<div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Rejestracja zakończona sukcesem.</h4>
                <p>Dziękujemy za założenie konta w naszym serwisie.</p>
                <hr />
                <p className="mb-0">Na podany adres email wysłaliśmy link aktywacyjny, kliknij w niego aby aktywować konto.</p>
              </div>);
    }

    generateUserRegistrationMessageFail(){
      return (<div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Rejestracja nie powiodła się.</h4>
                <p>{this.state.registrationErrorTitle}</p>
                <hr />
                <p className="mb-0">{this.state.registrationErrorMessage}</p>
              </div>);
    }

    generateModalBody(){
      if(this.state.isRegistrationSuccessFull === null){
        if(this.state.shouldShowSpinnerLoader === true){
          return (
            <div className="modal-body">
              <div className="loader"></div>
            </div>
          );
        }
        else{
          return (
            <div className="modal-body">
              <RegisterForm 
                  isRegisterForPlanner = {this.props.isForPlanner}
              />
              {this.props.additionalLogins}
            </div>
          );
        }
      }
      else if(this.state.isRegistrationSuccessFull === true){
        return (
          <div className="modal-body">
            {this.generateUserRegistrationMessageSuccess()}
          </div>
        );
      }
      else{
        return (
          <div className="modal-body">
            {this.generateUserRegistrationMessageFail()}
          </div>
        );
      }
    }

    render() {
        return (
            <div className="modal fade" id={this.props.modalId} data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby={this.props.modalLabelName} aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={this.props.modalLabelName}>{this.props.modalTitle}</h5>
                    <button type="button" className="close" onClick={this.handleOnModalClose} data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {this.generateModalBody()}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.handleOnModalClose} data-dismiss="modal">Zamknij</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleOnRegister} disabled={this.state.isRegistrationSuccessFull === true || this.state.isRegistrationSuccessFull === false}>Zarejestruj się</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default RegisterModal;