import React from 'react';
import LoginForm from './LoginForm.jsx';
import LoginActionCreator from "../../actions/LoginActionCreator"

class LoginModal extends React.Component{
    constructor(props){
        super(props);
    }

    handleOnModalClose = (e) => {
        LoginActionCreator.clearData();
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
                  <div className="modal-body">
                    <LoginForm />
                    {this.props.additionalLogins}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.handleOnModalClose} data-dismiss="modal">Zamknij</button>
                    <button type="button" className="btn btn-primary">Zaloguj się</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default LoginModal;