import React from 'react'
import GridCell from './TimelineGrid/GridCell'
import {Grid} from 'react-bootstrap'
import HoursRow from './TimelineGrid/HoursRow'

export default class TimelineGrid extends React.Component {
    constructor(){
        super();
        this.state={
            x : 0,
            y : 0
        }
    }

    _onMoueseMove(e){
      this.setState({
        x : e.screenX,
        y : e.screenY
      });
    }
    _onMoueseMove2(e){
        this.setState({
            x : e.pageX,
            y : e.pageY
        });
      }

    renderGrids(){
        const GridRow = [];

        for(let i = 0   ; i <= 6; i++){
            let text = i+":00";
            GridRow.push(<GridCell id={i} text={text} />,)
        }
        return GridRow;
    }

    getFirstGridPosition(){
        var bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;

        return "";
    }
    render(){
        const { x, y} = this.state;
        return (
            <Grid id="timelineGrid" onMouseMove={this._onMoueseMove2.bind(this)}>
                <h2>Mouse coordinates: { x } { y }</h2>
                <HoursRow />
                {this.renderGrids()}
            </Grid>

        );
    }
}