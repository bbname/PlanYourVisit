import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import barberImage from "../resources/barber.jpg";


class HomePage extends React.Component{
    constructor(props){
        super(props);
    }


    render() {
        return (
            <div class="container" id="homepage-jumbotron">
                <section class="jumbotron text-center">
                    <div class="container">
                        <h1 class="jumbotron-heading">Znajdź specjalistę jakiego potrzebujesz</h1>
                        {/* <img src={barberImage} className="img-fluid rounded" /> */}
                        {/* <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                        <p>
                            <a href="#" class="btn btn-primary my-2">Main call to action</a>
                            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                        </p> */}
                    </div>
                </section>
            </div>
        );
    }

    // render() {
    //     return (
    //         <section class="jumbotron text-center">
    //             <div class="img-fluid rounded container" id="homepage-jumbotron">
    //                 <h1 class="jumbotron-heading">Znajdź specjalistę jakiego potrzebujesz!</h1>
    //                 {/* <img src={barberImage} className="img-fluid rounded" /> */}
    //                 {/* <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
    //                 <p>
    //                     <a href="#" class="btn btn-primary my-2">Main call to action</a>
    //                     <a href="#" class="btn btn-secondary my-2">Secondary action</a>
    //                 </p> */}
    //             </div>
    //         </section>
    //     );
    // }
}

export default HomePage;