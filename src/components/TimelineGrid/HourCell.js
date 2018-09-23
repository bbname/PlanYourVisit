import React from 'react'
import './GridCell.css'
import './HourCell.css'
import {Grid} from 'react-bootstrap'

export default class HourCell extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            height: 80,
            id: "",
            hour: null,
            width: 60
        }
    }
    
    componentDidMount(){
        this.setState({
            hour: this.props.hour == null ? 0 : this.props.hour,
            id: this.props.id,
            width: this.props.width
        })
    }

    render(){
        const hourCellStyle = {
            height: this.state.height,
            width: this.state.width,
            color: "yellow",
            position: "relative",
            top: 0
        };
        const hourLabelStyle = {
            width: this.state.height,
            color: "yellow",
            position: "relative",
                        //paddingTop: 20
        };

        return (
            <Grid style={hourCellStyle} className="hourCell">
                <div className="hourLabel" style={hourLabelStyle}>
                    {this.state.hour}:00
                </div>
            </Grid>
            // <div id={this.state.id} className="gridCell"  style={cellStyle}>
            //     <h4>{this.state.text}</h4>
            // </div>
        );
    }
}