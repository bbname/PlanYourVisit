import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import RegisterPlanner from '../UserAuthentication/RegisterPlanner.jsx';
import RegisterVisitor from '../UserAuthentication/RegisterVisitor.jsx';
import Login from '../UserAuthentication/Login.jsx';
import firebase from "firebase";
import UserStore from "../../stores/UserStore";
import UserActionCreator from "../../actions/UserActionCreator";

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: UserStore.getUser(),
        }
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            user : UserStore.getUser(),
        })
    }

    handleOnProfileClick = (e) => {
        alert("Strona z profilem.");
    }

    handleOnSignedOutClick = (e) => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        UserActionCreator.signOutUser();
    }

    generateNavigationForSignedOutUser(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">Plan Your Visit</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Zarejestruj się
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#registerVisitorModal">jako klient</a>
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#registerPlannerModal">jako przedsiębiorca</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Zaloguj się</a>
                        </li>
                    </ul>
                </div>
                <RegisterVisitor />
                <RegisterPlanner />
                <Login 
                    uiConfig = {this.props.uiConfig}
                    // anonymousUser = {this.props.anonymousUser}
                />
            </nav>
        );
    }

    generateNavigationForSignedInUser(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">Plan Your Visit</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <ul className="navbar-nav">
                         <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.handleOnProfileClick}><i className="fa fa-user" aria-hidden="true"></i> Profil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.handleOnSignedOutClick}>Wyloguj się</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    generateHeader(){
        // if(this.state.user !== null && !this.state.user.isAnonymous){
            console.log(UserStore.getUser());
        if(UserStore.getUser() !== null){
            return this.generateNavigationForSignedInUser();
        }
        else{
            return this.generateNavigationForSignedOutUser();
        }
    }

    render() {
        return (
            this.generateHeader()
        );
    }

    // render() {
    //     return (
    //         <nav className="navbar navbar-expand-lg navbar-light">
    //             <a className="navbar-brand" href="#">Plan Your Visit</a>
    //             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //                 <ul className="navbar-nav mr-auto">
    //                 </ul>
    //                 <ul className="navbar-nav">
    //                     <li className="nav-item dropdown">
    //                         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                             Zarejestruj się
    //                         </a>
    //                         <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    //                             <a className="dropdown-item" href="#" data-toggle="modal" data-target="#registerVisitorModal">jako klient</a>
    //                             <a className="dropdown-item" href="#" data-toggle="modal" data-target="#registerPlannerModal">jako przedsiębiorca</a>
    //                         </div>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Zaloguj się</a>
    //                     </li>
    //                 </ul>
    //             </div>
    //             <RegisterVisitor />
    //             <RegisterPlanner />
    //             <Login 
    //                 uiConfig = {this.props.uiConfig}
    //                 anonymousUser = {this.props.anonymousUser}
    //             />
    //         </nav>
    //     );
    // }
}

export default Header;