import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";
// import PlannerStore from '../../stores/PlannerStore';
// import PlannerActionCreator from "../../actions/PlannerActionCreator";
import CalendarGridStore from '../stores/CalendarGridStore';
import CalendarGridActionCreator from "../actions/CalendarGridActionCreator";
import _ from 'underscore';
import LazyLoadedCarousel from './LazyLoadedCarousel.jsx';

class CalendarGrid extends Component {
    constructor(){
        super();

        this.state = {
            monday: CalendarGridStore.getMonday(),
            tuesday: CalendarGridStore.getTuesday(),
            wednesday: CalendarGridStore.getWednesday(),
            thursday: CalendarGridStore.getThursday(),
            friday: CalendarGridStore.getFriday(),
            saturday: CalendarGridStore.getSaturday(),
            sunday: CalendarGridStore.getSunday(),
            mondaySlides: CalendarGridStore.getMondaySlides(),
            tuesdaySlides: CalendarGridStore.getTuesdaySlides(),
            wednesdaySlides: CalendarGridStore.getWednesdaySlides(),
            thursdaySlides: CalendarGridStore.getThursdaySlides(),
            fridaySlides: CalendarGridStore.getFridaySlides(),
            saturdaySlides: CalendarGridStore.getSaturdaySlides(),
            sundaySlides: CalendarGridStore.getSundaySlides(),
            isAnySlideLoaded: CalendarGridStore.isAnySlideLoaded(),
            test: (
                <Carousel
                axis="vertical"     
                showThumbs={false}  
                showStatus={false}
                showIndicators={false}>
            </Carousel>
            )
        }
    }

    componentWillMount() {
        CalendarGridStore.addChangeListener(this._onChange);
        let visitDays = [];
        visitDays.push(this.state.monday.visitDay);
        visitDays.push(this.state.tuesday.visitDay);
        visitDays.push(this.state.wednesday.visitDay);
        visitDays.push(this.state.thursday.visitDay);
        visitDays.push(this.state.friday.visitDay);
        visitDays.push(this.state.saturday.visitDay);
        visitDays.push(this.state.sunday.visitDay);
        // CalendarGridActionCreator.setSlideDays(visitDays);
    }

    componentDidMount(){
        // let visitDays = [];
        // visitDays.push(this.state.monday.visitDay);
        // visitDays.push(this.state.tuesday.visitDay);
        // visitDays.push(this.state.wednesday.visitDay);
        // visitDays.push(this.state.thursday.visitDay);
        // visitDays.push(this.state.friday.visitDay);
        // visitDays.push(this.state.saturday.visitDay);
        // visitDays.push(this.state.sunday.visitDay);
        // CalendarGridActionCreator.setSlideDays(visitDays);

        // let slides = this.generateWayWithCarousel();
        // this.setState({
        //     mondaySlides: slides,
        //     tuesdaySlides: slides,
        //     wednesdaySlides: slides,
        //     thursdaySlides: slides,
        //     fridaySlides: slides,
        //     saturdaySlides: slides,
        //     sundaySlides: slides
        // });
    }

    componentWillUnmount() {
        CalendarGridStore.removeChangeListener(this._onChange);
    }

    getDivs = () => {
        if(this.state.tuesday.slides !== undefined){
            return this.state.tuesday.slides.map((slide) => (
                <div>
                    {slide}
                </div>
            ));
        }
        return (
                <div>
                     <div dangerouslySetInnerHTML={{__html: '&nbsp;'}} />
                </div>
        );
                
    }

    _onChange = () => {
        this.setState({
            monday: CalendarGridStore.getMonday(),
            tuesday: CalendarGridStore.getTuesday(),
            wednesday: CalendarGridStore.getWednesday(),
            thursday: CalendarGridStore.getThursday(),
            friday: CalendarGridStore.getFriday(),
            saturday: CalendarGridStore.getSaturday(),
            sunday: CalendarGridStore.getSunday(),
            mondaySlides: CalendarGridStore.getMondaySlides(),
            tuesdaySlides: CalendarGridStore.getTuesdaySlides(),
            wednesdaySlides: CalendarGridStore.getWednesdaySlides(),
            thursdaySlides: CalendarGridStore.getThursdaySlides(),
            fridaySlides: CalendarGridStore.getFridaySlides(),
            saturdaySlides: CalendarGridStore.getSaturdaySlides(),
            sundaySlides: CalendarGridStore.getSundaySlides(),
            isAnySlideLoaded: CalendarGridStore.isAnySlideLoaded(),
            test: (
                <Carousel
                axis="vertical"     
                showThumbs={false}  
                showStatus={false}
                showIndicators={false}>
                {this.getDivs()}
            </Carousel>
            )
        });
    }

    // generateTable(){
    //     let rows = [];
    //     for(var hour = 7; hour < 19; hour++){
    //         let cells =[];
    //         for(var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++){
    //             let colName = "column-" + dayOfWeek;
    //             if(dayOfWeek === 5 && hour > 9 && hour < 13){
    //                 cells.push(<td className={colName}>{hour + ":00"}</td>);
    //             }
    //             else if(dayOfWeek < 5){
    //                 cells.push(<td className={colName}>{hour + ":00"}</td>);
    //             }
    //             else{
    //                 cells.push(<td className={colName}></td>);
    //             }
    //         }
    //         rows.push(<tr>{cells}</tr>);
    //     }

    //     return rows;
    // }

    generateTablesByColumns(columns){
        let result = [];
        for(var column = 0; column < columns.length; column++){
            result.push(
                <Table striped condensed hover className="table-column">
                    <tbody>
                        {columns[column]}
                    </tbody>
                </Table>
            );
        }

        return result;
    }

    generateWayWithCarousel(){
        let columns = [];
        for(var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++){
            let column = [];
            for(var hour = 7; hour < 19; hour++){
                let cellValue = hour + ":00";
                column.push(<tr><td>{cellValue}</td></tr>);
            }
            columns.push(column);
        }

        return this.generateTablesByColumns(columns);

        // let result = (
        //     <Carousel
        //     showThumbs={false}
        //     showStatus={false}
        //     showIndicators={false}>
        //             <Table striped bordered condensed hover responsive>
        //                 <tbody>
        //                     {this.generateTablesByColumns(columns)}
        //                 </tbody>
        //             </Table>
        //     </Carousel>
        // );

        // let result = (
        //     <Carousel
        //     showThumbs={false}
        //     showStatus={false}
        //     showIndicators={false}>
        //         {this.state.mondaySlides}
        //     </Carousel>
        // );

        //return (<tr>{result}</tr>);
    }

    generateTuesdaySlides(daySlides){
        const divStyle = {
            backgroundColor: "red"
        };
        let test = [];
        test[0] = <div>123</div>;
        test[1] = <div>456</div>;
        test[2] = <div>789</div>;
        if(daySlides !== undefined){
            return <LazyLoadedCarousel
                    />;
        }


        // return <Carousel
        //     axis="vertical"     
        //     showThumbs={false}  
        //     showStatus={false}
        //     showIndicators={false}>
        //     {/* {daySlides} */}
        //     <div>
        //         123
        //     </div>
        //     <div>
        //         456
        //     </div>
        //     <div>
        //         789
        //     </div>
        //     {/* { _.map(daySlides, function(daySlide){     
        //         return <div style={divStyle}>
        //             {daySlide}
        //         </div>;
        //     })} */}
        //     {/* { _.each(daySlides, function(daySlide){     
        //         <div id="test" style={divStyle} dangerouslySetInnerHTML={{__html: daySlide}} />;
        //     })} */}
        // </Carousel>
    }

    // render() {
    //     const divStyle = {
    //         height: "100%",
    //         backgroundColor: "white"
    //     }
    //     const lastTdFixStyle = {
    //         marginRight: "1px"
    //     }
    //     // if(!this.state.isAnySlideLoaded){
    //         // return (
    //         //     <Row className="hours-grid-container">
    //         //         {this.state.test}
    //         //         {this.generateTuesdaySlides(this.state.tuesday.slides)}     
    //         //     </Row>
    //         // );
    //     // }
    //     return (
    //         <Row className="hours-grid-container">
    //             <div className="col-xs-12 col-sm-12 col-md-12 week-carousel"  style={divStyle}>
    //             <Table bordered condensed responsive>
    //                             <Carousel
                                    
    //                                 axis="vertical" 
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.monday.slides}
    //                                 </Carousel>
                               
    //                                 {this.state.test}                 
    //                                 {/* <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.generateTuesdaySlides(this.state.tuesday.slides)}
    //                                 </Carousel> */}
                               
                                                        
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.wednesday.slides}
    //                                 </Carousel>
                                
                                                    
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.thursday.slides}
    //                                 </Carousel>
                              
                                                      
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.friday.slides}
    //                                 </Carousel>
                                          
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.saturday.slides}
    //                                 </Carousel>
                           
    //                             <Carousel
    //                             axis="vertical" 
                                
                                
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.sunday.slides}
    //                                 </Carousel>  

    //                         </Table>
    //                 </div>
    //         </Row>
    //     );
    // }

    render() {
        const divStyle = {
            height: "100%",
            backgroundColor: "white"
        }
        const lastTdFixStyle = {
            marginRight: "1px"
        }
        // if(!this.state.isAnySlideLoaded){
        //     return (
        //         <Row className="hours-grid-container">
        //         </Row>
        //     );
        // }
        return (
        <Row className="hours-grid-container">
                <div className="col-xs-12 col-sm-12 col-md-12 week-carousel"  style={divStyle}>
                    <Table bordered condensed responsive>
                        <thead>
                            <tr id="week-days-th-row">
                                <th className="flex-item">Pn</th>
                                <th className="flex-item">Wt</th>
                                <th className="flex-item">Śr</th>
                                <th className="flex-item">Cz</th>
                                <th className="flex-item">Pt</th>
                                <th className="flex-item">So</th>
                                <th className="flex-item" style={lastTdFixStyle}>Nd</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="week-days-tr-row" className="container">
                                <td className="flex-item">                           
                                    <Carousel                        
                                    axis="vertical" 
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={0}>
                                        {this.state.monday.slides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">   
                                {/* {this.state.test}                         */}
                                    <Carousel
                                    axis="vertical"       
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={1}>
                                        {this.state.tuesday.slides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical"     
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={2}>
                                        {this.state.wednesday.slides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={3}>
                                        {this.state.thursday.slides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={4}>
                                        {this.state.friday.slides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical"             
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={5}>
                                        {this.state.saturday.slides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">
                                <Carousel
                                    axis="vertical"
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}
                                    key={6}>
                                        {this.state.sunday.slides}
                                </Carousel>
                                </td>
                            </tr>
                            {/* {this.generateTable()} */}
                            {/* {this.generateWayWithCarousel()} */}
                        </tbody>
                    </Table>
                </div>
        </Row>
        );
    }

    // render() {
    //     const divStyle = {
    //         height: "100%",
    //         backgroundColor: "white"
    //     }
    //     const lastTdFixStyle = {
    //         marginRight: "1px"
    //     }
    //     return (
    //     <Row className="hours-grid-container">
    //             <div className="col-xs-12 col-sm-12 col-md-12 week-carousel"  style={divStyle}>
    //                 <Table bordered condensed responsive>
    //                     <thead id="week-days-th-row">
    //                         <th className="flex-item">Pn</th>
    //                         <th className="flex-item">Wt</th>
    //                         <th className="flex-item">Śr</th>
    //                         <th className="flex-item">Cz</th>
    //                         <th className="flex-item">Pt</th>
    //                         <th className="flex-item">So</th>
    //                         <th className="flex-item" style={lastTdFixStyle}>Nd</th>
    //                     </thead>
    //                     <tbody>
    //                         <tr id="week-days-tr-row" className="container">
    //                             <td className="flex-item">                           
    //                                 <Carousel
                                    
    //                                 axis="vertical" 
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.mondaySlides}
    //                                 </Carousel>
    //                             </td>
    //                             <td className="flex-item">                           
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.tuesdaySlides}
    //                                 </Carousel>
    //                             </td>
    //                             <td className="flex-item">                           
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.wednesdaySlides}
    //                                 </Carousel>
    //                             </td>
    //                             <td className="flex-item">                           
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.thursdaySlides}
    //                                 </Carousel>
    //                             </td>
    //                             <td className="flex-item">                           
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.fridaySlides}
    //                                 </Carousel>
    //                             </td>
    //                             <td className="flex-item">                           
    //                                 <Carousel
    //                                 axis="vertical" 
                                    
                                    
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.saturdaySlides}
    //                                 </Carousel>
    //                             </td>
    //                             <td className="flex-item">
    //                             <Carousel
    //                             axis="vertical" 
                                
                                
    //                                 showThumbs={false}
    //                                 showStatus={false}
    //                                 showIndicators={false}>
    //                                     {this.state.sundaySlides}
    //                                 </Carousel>
    //                             </td>
    //                         </tr>
    //                         {/* {this.generateTable()} */}
    //                         {/* {this.generateWayWithCarousel()} */}
    //                     </tbody>
    //                 </Table>
    //             </div>
    //     </Row>
    //     );
    // }
}

export default CalendarGrid;