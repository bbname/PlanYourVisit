import React from 'react'
import './GridCell.css'
import { Row, Col} from 'react-bootstrap'

export default class GridCell extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            // width: 1440,
            height: 80,
            backgroundColor: "green",
            text: "no-inserted",
            id: ""
        }
    }
    
    componentDidMount(){
        this.setState({
            text: this.props.text == null ? "no-inserted" : this.props.text,
            id: this.props.id
        })
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
                <Col xs={12} sm={12} >
                    <h4>{this.state.text}</h4>
                </Col>
            </Row>
            // <div id={this.state.id} className="gridCell"  style={cellStyle}>
            //     <h4>{this.state.text}</h4>
            // </div>
        );
    }
}