import React from 'react'
import './GridCell.css'

export default class GridCell extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            width: 80,
            height: 40,
            backgroundColor: "green",
            text: "no-inserted"
        }
    }
    
    componentDidMount(){
        this.setState({
            text: this.props.text == null ? "no-inserted" : this.props.text
        })
    }

    render(){
        const cellStyle = {
            width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.backgroundColor,
            color: "red"
        };

        return (
            <div className="gridCell" style={cellStyle}>
                <h4>{this.state.text}</h4>
            </div>
        );
    }
}