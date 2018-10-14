import React from 'react';
import LoginStore from "../../stores/LoginStore"
import LoginActionCreator from "../../actions/LoginActionCreator"

class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: LoginStore.getEmail(),
            password: LoginStore.getPassword(),
        }

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
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
            email : LoginStore.getEmail(),
            password: LoginStore.getPassword(),
        })
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === "email-login"){
            LoginActionCreator.setEmail(e.target.value);
        }
        else if(e.target.id === "password-login"){
            LoginActionCreator.setPassword(e.target.value);
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="email" className="col-form-label">E-mail:</label>
                    <input value={this.state.email} onChange={this.handleOnInputChange} type="email" className="form-control" id="email-login"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-form-label">Hasło:</label>
                    <input value={this.state.password} onChange={this.handleOnInputChange} type="password" className="form-control" id="password-login" />
                </div>
            </form>
        );
    }
}

export default LoginForm;