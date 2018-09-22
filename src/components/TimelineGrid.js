import React from 'react'
import GridCell from './TimelineGrid/GridCell'

export default class TimelineGrid extends React.Component {
    constructor(){
        super();
    }

    renderGrids(){
        // const GridRow = [
        // <GridCell text="6:00"/>,
        // <GridCell text="7:00"/>,
        // <GridCell text="8:00"/>,
        // <GridCell text="9:00"/>,
        // <GridCell text="10:00"/>,
        // <GridCell text="11:00"/>
        // ];
        const GridRow = [
            ];

        for(let i = 6; i <= 24; i++){
            let text = i+":00";
            GridRow.push(<GridCell text={text} />,)
        }
        return GridRow;
    }

    render(){
        return (
            <div>
                {this.renderGrids()}
            </div>
        );
    }
}