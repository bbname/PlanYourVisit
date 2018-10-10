import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/layout-style.css"
class Footer extends React.Component{
    constructor(props){
        super(props);
    } 
 
    render() {
        const pStyle = {    
            marginBottom: "-16px"
        }

        return (
            <footer className="footer">
                <div className="container">
                    <p className="text-center text-muted" style={pStyle}>
                        Plan Your Visit © 2018 - Bartłomiej Bieńczyk
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;