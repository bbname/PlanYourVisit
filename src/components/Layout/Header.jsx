import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import RegisterPlanner from '../UserAuthentication/RegisterPlanner.jsx';
import RegisterVisitor from '../UserAuthentication/RegisterVisitor.jsx';
import Login from '../UserAuthentication/Login.jsx';
import firebase from "firebase";
import UserStore from "../../stores/UserStore";
import UserActionCreator from "../../actions/UserActionCreator";
import _ from "underscore";
import { Link } from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: UserStore.getUser(),
            isPlanner: UserStore.isPlanner()
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
            isPlanner: UserStore.isPlanner()
        });
    }

    handleOnSignedOutClick = (e) => {
        firebase.auth().signOut().then(function() {
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        UserActionCreator.signOutUser();
        window.location.replace("http://localhost:8080/");
    }

    generateNavigationForSignedOutUser(){
        return (
                <nav className="navbar navbar-expand-lg navbar-light">
                    {/* {this.props.homePage} */}
                    <Link className="navbar-brand" to="/">Plan Your Visit</Link>
                    {/* <a className="navbar-brand"><Link to="/">Plan Your Visit</Link></a> */}
                    {/* <a className="navbar-brand" href="#">Plan Your Visit</a> */}
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
                    />


                </nav>
        );
    }

    generateNavigationForSignedInUser(){
        return (
                <nav className="navbar navbar-expand-lg navbar-light">
                    {/* {this.props.homePage} */}
                    <Link className="navbar-brand" to="/">Plan Your Visit</Link>
                    <Link className="nav-link nav-link-item" to="/visits"><i className="fa fa-book" aria-hidden="true"></i> Wizyty</Link>
                    {this.generatePlannerLink()}
                    {this.generateDailyPlanLink()}
                    {this.generateTimeRangeLink()}
                    {this.generateVisitTypeLink()}
                    {/* <a className="navbar-brand"><Link to="/">Plan Your Visit</Link></a> */}
                    {/* <a className="navbar-brand" href="#">Plan Your Visit</a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* {this.props.profile} */}
                                <Link className="nav-link" to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Profil</Link>
                                {/* <a className="nav-link" href="#" onClick={this.handleOnProfileClick}><i className="fa fa-user" aria-hidden="true"></i> Profil</a> */}
                                {/* <a className="nav-link" onClick={this.handleOnProfileClick}><Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Profil</Link></a> */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.handleOnSignedOutClick}>Wyloguj się</a>
                            </li>
                        </ul>
                    </div>
                </nav>
        );
    }

    generatePlannerLink(){
        if(this.state.isPlanner === true){
            return <Link className="nav-link nav-link-item" to="/planner"><i className="fa fa-calendar-alt" aria-hidden="true"></i> Planer</Link>;
        }
    }

    generateDailyPlanLink(){
        if(this.state.isPlanner === true){
            return <Link className="nav-link nav-link-item" to="/daily-plan"><i className="fas fa-calendar-times" aria-hidden="true"></i> Plany dni</Link>;
        }
    }

    generateTimeRangeLink(){
        if(this.state.isPlanner === true){
            return <Link className="nav-link nav-link-item" to="/time-range"><i className="fas fa-clock" aria-hidden="true"></i> Zakresy czasowe</Link>;
        }
    }

    generateVisitTypeLink(){
        if(this.state.isPlanner === true){
            return <Link className="nav-link nav-link-item" to="/visit-type"><i className="fas fa-clipboard" aria-hidden="true"></i> Typy wizyt</Link>;
        }
    }

    isUserEmailVerifiedForPasswordEmailProvider(user){
        if(user != null){
            if(_.size(user.providerData) === 1){
                if((user.providerData[0].providerId === "password" && user.emailVerified) ||
                    user.providerData[0].providerId !== "password"){
                        return true;
                }
            }
            else if(_.size(user.providerData) > 1){
                return true;
            }
        }

        return false;
    }

    generateHeader(){
        if(this.isUserEmailVerifiedForPasswordEmailProvider(UserStore.getUser())){
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
}

export default Header;