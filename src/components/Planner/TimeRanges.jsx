import React from 'react';
import TimeRangeStore from '../../stores/TimeRangeStore';
import TimeRangeActionCreator from "../../actions/TimeRangeActionCreator";
import VisitTypeFunctions from "../../utils/VisitTypeFunctions";
import "../styles/layout-style.css";

class TimeRanges extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTimeRange: TimeRangeStore.getSelectedTimeRange(),
            timeRanges: TimeRangeStore.getTimeRanges(),
            isNew: TimeRangeStore.isNew(),
            isEdit: TimeRangeStore.isEdit()
        }
    }

    componentWillMount() {
        TimeRangeStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        TimeRangeActionCreator.setTimeRanges();
    }
 
    componentWillUnmount() {
        TimeRangeStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            selectedTimeRange: TimeRangeStore.getSelectedTimeRange(),
            timeRanges: TimeRangeStore.getTimeRanges(),
            isNew: TimeRangeStore.isNew(),
            isEdit: TimeRangeStore.isEdit()
        });
    }

    handleOnInputChange = (e) =>{
        TimeRangeActionCreator.setSelectedTimeRange(e.target.value);
    }

    render() {
        const emptyRowStyle = {
            height: "53px"
        };
        const inputLeftCorrectStyle = {
            marginLeft: "15px"
        }

        return (
            <div className="container">
                <div className="row" style={emptyRowStyle}>
                </div>
                <select disabled={this.state.isEdit} value={this.state.selectedTimeRange.id} style={inputLeftCorrectStyle} 
                    className="form-control custom-select" size="20" 
                    onClick={this.handleOnInputChange}
                    onChange={this.handleOnInputChange} id="time-range-selector">
                            {this.state.timeRanges.map((timeRange) => 
                            <option key={timeRange.id} value={timeRange.id}>
                                {timeRange.timeFrom} - {timeRange.timeTo}, krok: {VisitTypeFunctions.getTimeCostForUser(timeRange.timeStep)}
                            </option>)}
                </select>
            </div>          
        );
    }
}

export default TimeRanges;