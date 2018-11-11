import React, { Component } from 'react';
import Calendar from './Calendar.jsx'
import CalendarGrid from './CalendarGrid.jsx'
import "bootstrap/dist/css/bootstrap.css"
import {Grid, Row, Col} from "react-bootstrap"
import HomePage from './HomePage.jsx';
import Header from "./Layout/Header.jsx"
import Footer from './Layout/Footer.jsx';
import ProfileFunctions from '../utils/ProfileFunctions';
import ProfileActionCreator from '../actions/ProfileActionCreator';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Profile from "./Profile.jsx";
import SpecialistPage from "./SpecialistPage.jsx";
import Planner from './Planner/Planner.jsx';
import TimeRange from './Planner/TimeRange.jsx';
import VisitType from './Planner/VisitType.jsx';
import DailyPlan from './Planner/DailyPlan.jsx';
import Visits from './Visits.jsx';

class App extends Component {
    handleOnProfileClick = (e) => {
        // let userDatabase = ProfileFunctions.getUserDatabase();
        // ProfileActionCreator.setUser(userDatabase);
    }

    render() {
        return (
            <Router>
                <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link>
                    <Route exact path="/" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <HomePage />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/profile" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <Profile />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/specialist/:id" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <SpecialistPage
                                    plannerId = {matchProps.match.params.id}     
                                />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/visits" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <Visits />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/planner" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <Planner />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/daily-plan" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <DailyPlan />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/time-range" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <TimeRange />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/visit-type" render={matchProps => (
                        <div>
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                />
                                <VisitType />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                </div>
            </Router>
        );
    }
}

export default App;