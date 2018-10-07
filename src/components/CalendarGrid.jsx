import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel }  from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/calendarGrid-style.css";
import {Row, Table} from "react-bootstrap";

class CalendarGrid extends Component {
    constructor(){
        super();

        this.state = {
            mondaySlides: null,
            tuesdaySlides: null,
            wednesdaySlides: null,
            thursdaySlides: null,
            fridaySlides: null,
            saturdaySlides: null,
            sundaySlides: null
        }
    }

    componentDidMount(){
        let slides = this.generateWayWithCarousel();
        this.setState({
            mondaySlides: slides,
            tuesdaySlides: slides,
            wednesdaySlides: slides,
            thursdaySlides: slides,
            fridaySlides: slides,
            saturdaySlides: slides,
            sundaySlides: slides
        });
    }

    generateTable(){
        let rows = [];
        for(var hour = 7; hour < 19; hour++){
            let cells =[];
            for(var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++){
                let colName = "column-" + dayOfWeek;
                if(dayOfWeek === 5 && hour > 9 && hour < 13){
                    cells.push(<td className={colName}>{hour + ":00"}</td>);
                }
                else if(dayOfWeek < 5){
                    cells.push(<td className={colName}>{hour + ":00"}</td>);
                }
                else{
                    cells.push(<td className={colName}></td>);
                }
            }
            rows.push(<tr>{cells}</tr>);
        }

        return rows;
    }

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

    render() {
        const divStyle = {
            height: "100%",
            backgroundColor: "white"
        }
        const lastTdFixStyle = {
            marginRight: "1px"
        }
        return (
        <Row className="hours-grid-container">
                <div className="col-xs-12 col-sm-12 col-md-12 week-carousel"  style={divStyle}>
                    <Table bordered condensed responsive>
                        <thead id="week-days-th-row">
                            <th className="flex-item">Pn</th>
                            <th className="flex-item">Wt</th>
                            <th className="flex-item">Śr</th>
                            <th className="flex-item">Cz</th>
                            <th className="flex-item">Pt</th>
                            <th className="flex-item">So</th>
                            <th className="flex-item" style={lastTdFixStyle}>Nd</th>
                        </thead>
                        <tbody>
                            <tr id="week-days-tr-row" className="container">
                                <td className="flex-item">                           
                                    <Carousel
                                    
                                    axis="vertical" 
                                    
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.mondaySlides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    
                                    
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.tuesdaySlides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    
                                    
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.wednesdaySlides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    
                                    
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.thursdaySlides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    
                                    
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.fridaySlides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">                           
                                    <Carousel
                                    axis="vertical" 
                                    
                                    
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.saturdaySlides}
                                    </Carousel>
                                </td>
                                <td className="flex-item">
                                <Carousel
                                axis="vertical" 
                                
                                
                                    showThumbs={false}
                                    showStatus={false}
                                    showIndicators={false}>
                                        {this.state.sundaySlides}
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
    //         <Carousel 
    //             className="col-xs-12 col-sm-12 col-md-12 week-carousel" 
    //             showThumbs={false}
    //             showStatus={false}
    //             showIndicators={false}>
    //             <div style={divStyle}>
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
    //             <div style={divStyle}>
    //                 <p className="legend">
    //                     Legend2
    //                 </p>
    //             </div>
    //         </Carousel>
    //     </Row>
    //     );
    // }
}

export default CalendarGrid;