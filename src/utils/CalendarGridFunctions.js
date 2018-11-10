import React, { Component } from 'react';
import {Row, Table} from "react-bootstrap";
import _ from "underscore";
import CalendarFunctions from "./CalendarFunctions";
import moment from "moment";

module.exports = {
    // generateWeekSlides: function(sortedVisitDays, forPlanner){
    //     let columns = this.generateWeekHours(sortedVisitDays, forPlanner);
    //     let result = [];
    //     let counter = 0;
    //     _.each(columns, function(column){
    //         let tableKey = counter;
    //         let bodyKey = "body-" + counter;

    //         if(column.length > 0){
    //             tableKey = column[0].props.id.substring(3,13);
    //         }
    //         result.push(
    //             <Table key={tableKey} striped condensed hover className="table-column">
    //                 <tbody key={bodyKey}>
    //                     {column}
    //                 </tbody>
    //             </Table>
    //         );
    //         counter++;
    //     });

    //     return result;
    // },
    // generateWeekHours: function(sortedVisitDays, forPlanner){
    //     let dayColumns = [];
    //     let self = this;

    //     _.each(sortedVisitDays, function(visitDay){
    //         dayColumns.push(self.generateDayHours(visitDay, forPlanner));    
    //     });

    //     return dayColumns;
    // },
    // generateDayHours: function(visitDay, forPlanner){
    //     let column = [];

    //     if(forPlanner && visitDay !== undefined){
    //         let nrOfSlidesToCreate = this.getNrOfSlidesToCreate(visitDay.hours,);
    //         let nrOfEmptyHoursToFake = this.getNrOfEmptyHoursToCreate();

    //         _.each(visitDay.hours, function(hour){
    //             const trId = "tr-" + hour.date;
    //             const tdId = "td-" + hour.date;
    //             let date = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(hour.date);
    //             let hourString = CalendarFunctions.getHoursFormatForDatabase(date);
    //             column.push(
    //                 <tr key={trId} id={trId}>
    //                     <td key={tdId} id={tdId}>
    //                         {hourString}
    //                     </td>
    //                 </tr>);
    //         });
    //     }

    //     return column;
    // },    
    generateWeekSlides: function(sortedVisitDays, forPlanner){
        let dayColumns = [];
        let self = this;

        _.each(sortedVisitDays, function(visitDay){
            dayColumns.push(self.generateDaySlides(visitDay, forPlanner));    
        });

        return dayColumns;
    },
    generateDaySlides: function(visitDay, forPlanner){
        let slides = [];

        if(forPlanner && visitDay !== undefined){
            let nrOfHoursInSlide = 8;
            let dayHoursNr = 0;

            if(visitDay.hours !== null){
                dayHoursNr = Object.keys(visitDay.hours).length;
            }

            // let dayHoursNr = visitDay.hours.length;
            let nrOfSlidesToCreate = this.getNrOfSlidesToCreate(dayHoursNr, nrOfHoursInSlide);
            let nrOfEmptyHoursToFake = this.getNrOfEmptyHoursToCreate(dayHoursNr, nrOfHoursInSlide, nrOfSlidesToCreate);
            let partHour = 0;
            let self = this;

            for(let i = 0; i < nrOfSlidesToCreate; i++){
                let partedHours = [];
    
                if(nrOfEmptyHoursToFake > 0 && i == nrOfSlidesToCreate-1){
                    for(partHour; partHour < nrOfHoursInSlide*(i+1); partHour++){
                        if(partHour >= dayHoursNr){
                            // partedHours.push(" ");
                            partedHours.push(self.generateEmptyHour());
                        }
                        else{
                            // partedHours.push(visitDay.hours[partHour]);
                            // partedHours.push(self.generateHour(visitDay.hours[partHour]));
                            partedHours.push(self.generateHour(visitDay.hours[Object.keys(visitDay.hours)[partHour]]));
                        }
                    }
                }
                else{
                    for(partHour; partHour < nrOfHoursInSlide*(i+1); partHour++){
                        // partedHours.push(visitDay.hours[partHour]);
                        // partedHours.push(self.generateHour(visitDay.hours[partHour]));
                        partedHours.push(self.generateHour(visitDay.hours[Object.keys(visitDay.hours)[partHour]]));
                    }
                }
    
                slides.push(this.generateDaySlide(partedHours, visitDay.date, i));
            }
        }

        return slides;
    }, 
    getNrOfSlidesToCreate: function (visitDayHoursNr, nrOfHoursInSlide){
        if(visitDayHoursNr === 0){
            return 1;
        }

        let nrOfSlides = Math.floor(visitDayHoursNr / nrOfHoursInSlide);

        if((nrOfSlides % nrOfHoursInSlide) != 0 || nrOfSlides === 0){
            nrOfSlides++;
        }

        return nrOfSlides;
    },
    getNrOfEmptyHoursToCreate: function(visitDayHoursNr, nrOfSlides, nrOfHoursInSlide){
        let expectedNrOfHoursToCreate = nrOfSlides * nrOfHoursInSlide;
        let realHoursNrToCreate = visitDayHoursNr;
        let nrOfHoursToFake = expectedNrOfHoursToCreate - realHoursNrToCreate;

        return nrOfHoursToFake;
    },
    generateHour: function(hour){
        const trId = "tr-" + hour.date;
        const tdId = "td-" + hour.date;
        let date = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(hour.date);
        let hourString = CalendarFunctions.getHoursFormatForDatabase(date);

        return (
            <tr key={trId} id={trId}>
                <td key={tdId} id={tdId}>
                    {hourString}
                </td>
            </tr>
        );
    },
    generateEmptyHour: function(){
        const id = this.guidGenerator();
        const trId = "tr-" + id;
        const tdId = "td-" + id;
        const emptyValue = "";
        return (
            <tr key={trId} id={trId}>
                <td key={tdId} id={tdId}>
                    <div dangerouslySetInnerHTML={{__html: '&nbsp;'}} />
                </td>
            </tr>
        );
    },
    generateDaySlide: function(hours, date, slideNr){
        const id = this.guidGenerator();
        let tableKey = date + " - " + slideNr;
        let bodyKey = "body-" + id;

        return(
            <Table key={tableKey} striped condensed hover className="table-column">
                <tbody key={bodyKey}>
                    {hours}
                </tbody>
            </Table>
        );
    },
    guidGenerator: function() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
}