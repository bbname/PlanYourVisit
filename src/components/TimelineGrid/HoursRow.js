import React from 'react'
import './GridCell.css'
import { Row, Col} from 'react-bootstrap'
import HourCell from './HourCell';

export default class HoursRow extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            height: 80,
            backgroundColor: "blue",
            id: "",
            hourFrom: 7,
            hourTo: 17
        }
    }
    
    componentDidMount(){
        this.setState({
            text: this.props.text == null ? "no-inserted" : this.props.text,
            id: this.props.id,
            hourFrom: this.props.hourFrom == null ? 7: this.props.hourFrom,
            hourTo: this.props.hourTo == null ? 17: this.props.hourTo
        })
    }

    renderHourCells(){
        const HourCells = [];
        const hoursFrom = 7;
        const hoursTo = 17;
        //let gridWidth = document.getElementById("timelineGrid").offsetWidth;
        let gridWidth = 1200;
        let cellWidth = gridWidth / (hoursTo - hoursFrom);

        for(let i = 7   ; i <= 17; i++){
            HourCells.push(<HourCell id={Date.now()+i} hour={i} width={cellWidth} />,)
        }
        return HourCells;
    }

    render(){
        const cellStyle = {
            // width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.backgroundColor,
            color: "red"
        };

        return (
            <Row id={this.state.id} className="gridCell" style={cellStyle}>
                <Col xs={12} sm={12}>
                    {this.renderHourCells()}
                </Col>
            </Row>
            // <div id={this.state.id} className="gridCell"  style={cellStyle}>
            //     <h4>{this.state.text}</h4>
            // </div>
        );
    }
}