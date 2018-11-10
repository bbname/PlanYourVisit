import React from 'react';
import _ from 'underscore';
import { Carousel }  from 'react-responsive-carousel';

class LazyLoadedCarousel extends React.Component {
    constructor () {
        super();
    }

    render() {
        let x = this.props.slides;
        let test = [];
        test[0] = <div>123</div>;
        test[1] = <div>456</div>;
        test[2] = <div>789</div>;
        return (
            <div>
                <Carousel
                    axis="vertical"     
                    showThumbs={false}  
                    showStatus={false}
                    showIndicators={false}>
                    <div>
                        123
                    </div>
                    <div>
                        456
                    </div>
                    <div>
                        789
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default LazyLoadedCarousel;