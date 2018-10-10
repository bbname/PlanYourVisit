import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
class Header extends React.Component{
    constructor(props){
        super(props);

        this.handleOnClickInterestOne = this.handleOnClickInterestOne.bind(this);
    } 

    handleOnClickInterestOne(){
        alert("Rejestracja zainteresowany")
    }
 
    render() {
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
                                <a className="dropdown-item" href="#" onClick={this.handleOnClickInterestOne}>jako zainteresowany</a>
                                <a className="dropdown-item" href="#">jako przedsiębiorca</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Zaloguj się</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;