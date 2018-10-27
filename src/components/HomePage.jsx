import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Search from './Search.jsx';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }


    render() {
        const nameStyle = {
            paddingRight: "5px"
        };
        const cityStyle = {
            paddingLeft: "5px",
            paddingRight: "5px"
        };
        const searchStyle = {
            paddingLeft: "5px"
        };

        return (
            <div className="container" id="homepage-jumbotron">
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">Znajdź specjalistę jakiego potrzebujesz</h1>
                    </div>
                </section>
                <section className="col-8 offset-2">
                    <Search />
                </section>
            </div>
        );
    }
}

export default HomePage;