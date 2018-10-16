import React from 'react';
import LoginForm from './LoginForm.jsx';
import LoginActionCreator from "../../actions/LoginActionCreator";
import LoginStore from "../../stores/LoginStore";

class LoginModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          shouldShowSpinnerLoader: LoginStore.shouldShowSpinnerLoader(),
          isLoginSuccessFull: LoginStore.isLoginSuccessFull(),
          loginErrorTitle: LoginStore.getLoginErrorTitle(),
          loginErrorMessage: LoginStore.getLoginErrorMessage(),
          isForgetPassword: LoginStore.isForgetPassword(),
          isForgetPasswordSendSuccessFull: LoginStore.isForgetPasswordSendSuccessFull(),
          forgetPasswordErrorTitle: LoginStore.getForgetPasswordErrorTitle(),
          forgetPasswordErrorMessage: LoginStore.getForgetPasswordErrorMessage()
        }

        this._onChange = this._onChange.bind(this);
    }

  componentWillMount() {
    LoginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
      this.setState({
        shouldShowSpinnerLoader: LoginStore.shouldShowSpinnerLoader(),
        isLoginSuccessFull: LoginStore.isLoginSuccessFull(),
        loginErrorTitle: LoginStore.getLoginErrorTitle(),
        loginErrorMessage: LoginStore.getLoginErrorMessage(),
        isForgetPassword: LoginStore.isForgetPassword(),
        isForgetPasswordSendSuccessFull: LoginStore.isForgetPasswordSendSuccessFull(),
        forgetPasswordErrorTitle: LoginStore.getForgetPasswordErrorTitle(),
        forgetPasswordErrorMessage: LoginStore.getForgetPasswordErrorMessage()
      });

      LoginActionCreator.closeLoginModal(this.state.isLoginSuccessFull);
  }

  handleOnModalClose = (e) => {
      LoginActionCreator.clearData();
  }
    
  handleOnLogin = (e) => {
    LoginActionCreator.loginBtnClicked();
    LoginActionCreator.runFormValidation();
    LoginActionCreator.loginUser();
    LoginActionCreator.checkLoginResult();
  }

  handleOnForgetPassword = (e) => {
    LoginActionCreator.clearData();
    LoginActionCreator.showForgetPasswordModal();
  }

  handleOnForgetPasswordSend = (e) => {
    LoginActionCreator.forgetPasswordBtnClicked();
    LoginActionCreator.runFormValidation();
    LoginActionCreator.runForgetPassword();
    LoginActionCreator.checkLoginResult();
  }

  generateUserLoginMessageFail(){
    return (<div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Logowanie nie powiodło się.</h4>
              <p>{this.state.loginErrorTitle}</p>
              <hr />
              <p className="mb-0">{this.state.loginErrorMessage}</p>
            </div>);
  }

  generateUserForgetPasswordMessageSuccess(){
    return (<div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Resetowanie hasła zakończone sukcesem.</h4>
              <p>Na podany adres email została wysłana wiadomość.</p>
              <hr />
              <p className="mb-0">W wiadomości kliknij w link aby móc zresetować hasło.</p>
            </div>);
  }

  generateUserForgetPasswordMessageFail(){
    return (<div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Resetowanie hasła nie powiodło się.</h4>
              <p>{this.state.forgetPasswordErrorTitle}</p>
              <hr />
              <p className="mb-0">{this.state.forgetPasswordErrorMessage}</p>
            </div>);
  }
  
  generateForgetPasswordButton(){
    const divStyle = {
      textAlign: "center"
    };

    return (
          <div style={divStyle}>
            <button type="button" className="btn btn-info" onClick={this.handleOnForgetPassword}>Nie pamiętam hasła</button>
          </div>
    );
  }

  generateModalBody(){
    if(this.state.isForgetPassword){
      if(this.state.isForgetPasswordSendSuccessFull === null){
        if(this.state.shouldShowSpinnerLoader === true){
          return (
            <div className="modal-body">
              <div className="loader"></div>
            </div>
          );
        }
        else {
          return (
            <div className="modal-body">
              <p>Na podany adres e-mail zostanie wysłana wiadomość z linkiem do zresetowania hasła.</p>
              <hr />
              <LoginForm />
            </div>
          );
        }
      }
      else if(this.state.isForgetPasswordSendSuccessFull === true){
        return (
          <div className="modal-body">
              {this.generateUserForgetPasswordMessageSuccess()}
          </div>
        );
      }
      else{
        return (
          <div className="modal-body">
            {this.generateUserForgetPasswordMessageFail()}
          </div>
        );
      }
    }
    else{
      if(this.state.isLoginSuccessFull === null){
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
              <LoginForm />
              {this.props.additionalLogins}
              {this.generateForgetPasswordButton()}
            </div>
          );
        }
      }
      else if(this.state.isLoginSuccessFull === true){
        return (
          <div className="modal-body">
              <LoginForm />
              {this.props.additionalLogins}
              {this.generateForgetPasswordButton()}
          </div>
        );
      }
      else{
        return (
          <div className="modal-body">
            {this.generateUserLoginMessageFail()}
          </div>
        );
      }
    }
  }

  generateModalTitle(){
    if(this.state.isForgetPassword){
      return(
          <h5 className="modal-title" id={this.props.modalLabelName}>Zapomniałeś hasła?</h5>
      );
    }
    else{
      return(
          <h5 className="modal-title" id={this.props.modalLabelName}>{this.props.modalTitle}</h5>
      );
    }
  }

  generateModalFooter(){
    if(this.state.isForgetPassword){
      return(
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={this.handleOnModalClose} data-dismiss="modal" id="close-login-modal">Zamknij</button>
            <button type="button" className="btn btn-primary" onClick={this.handleOnForgetPasswordSend} 
              disabled={this.state.isForgetPasswordSendSuccessFull === true || this.state.isForgetPasswordSendSuccessFull === false}>Wyślij</button>
          </div>
      );
    }
    else{
      return(
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={this.handleOnModalClose} data-dismiss="modal" id="close-login-modal">Zamknij</button>
          <button type="button" className="btn btn-primary" onClick={this.handleOnLogin} disabled={this.state.isLoginSuccessFull === true || this.state.isLoginSuccessFull === false}>Zaloguj się</button>
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
                    {this.generateModalTitle()}
                    <button type="button" className="close" onClick={this.handleOnModalClose} data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {this.generateModalBody()}
                  {this.generateModalFooter()}
                </div>
              </div>
            </div>
        );
    }
}

export default LoginModal;