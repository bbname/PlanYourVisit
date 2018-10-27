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
                    {/* <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link>
                    <Grid role="main">
                        <Header 
                            uiConfig = {this.props.uiConfig}
                            // homePage = {<Link to="/"><a className="navbar-brand">Plan Your Visit</a></Link>}
                            homePage = {<Link to="/">Plan Your Visit</Link>}
                            // profile = {<Link to="/profile"><a className="nav-link" onClick={this.handleOnProfileClick}><i className="fa fa-user" aria-hidden="true"></i> Profil</a></Link>}
                            profile = {<Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Profil</Link>}

                        />
                        <Row>
                            
                        </Row>

                    </Grid>
                    <Footer /> */}
                    <Route exact path="/" render={matchProps => (
                        <div>
                            {/* <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link> */}
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                    homePage = {<Link className="navbar-brand" to="/">Plan Your Visit</Link>}
                                    profile = {<Link className="nav-link" to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Profil</Link>}
                                />
                                <HomePage />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                    <Route path="/profile" render={matchProps => (
                        <div>
                            {/* <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link> */}
                            <Grid role="main">
                                <Header 
                                    uiConfig = {this.props.uiConfig}
                                    homePage = {<Link className="navbar-brand" to="/">Plan Your Visit</Link>}
                                    profile = {<Link className="nav-link" to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Profil</Link>}
                                />
                                <Profile />
                            </Grid>
                            <Footer />
                        </div>
                        )} 
                    />
                </div>

                    {/* <Route exact path="/" component={HomePage} />
                    <Route path="/profile" component={Profile} /> */}
            </Router>
        );
    }

    // render() {
    //     return (
    //         <Router>
    //             <div>
    //                 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link>
    //                 <Grid role="main">
    //                     <Header 
    //                         uiConfig = {this.props.uiConfig}
    //                         // homePage = {<Link to="/"><a className="navbar-brand">Plan Your Visit</a></Link>}
    //                         homePage = {<Link to="/">Plan Your Visit</Link>}
    //                         // profile = {<Link to="/profile"><a className="nav-link" onClick={this.handleOnProfileClick}><i className="fa fa-user" aria-hidden="true"></i> Profil</a></Link>}
    //                         profile = {<Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Profil</Link>}

    //                     />
    //                     {/* <Row>
    //                         <HomePage />
    //                     </Row> */}
    //                     {/* <Calendar />
    //                     <CalendarGrid /> */}

    //                 </Grid>
    //                 <Footer />
    //                 {/* <Route exact path="/" component={HomePage} />
    //                 <Route path="/profile" component={Profile} /> */}
    //                 <Route exact path="/" component={HomePage} />
    //                 <Route path="/profile" component={Profile} />
    //             </div>
    //         </Router>

    //     );
    // }
}

export default App;