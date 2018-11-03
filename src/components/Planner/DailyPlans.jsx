import React from 'react';
import DailyPlanStore from '../../stores/DailyPlanStore';
import DailyPlanActionCreator from "../../actions/DailyPlanActionCreator";
import "../styles/layout-style.css";

class DailyPlans extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedDailyPlan: DailyPlanStore.getSelectedDailyPlan(),
            dailyPlans: DailyPlanStore.getDailyPlans(),
            isNew: DailyPlanStore.isNew(),
            isEdit: DailyPlanStore.isEdit()
        }
    }

    componentWillMount() {
        DailyPlanStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        DailyPlanActionCreator.setDailyPlans();
    }
 
    componentWillUnmount() {
        DailyPlanStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            selectedDailyPlan: DailyPlanStore.getSelectedDailyPlan(),
            dailyPlans: DailyPlanStore.getDailyPlans(),
            isNew: DailyPlanStore.isNew(),
            isEdit: DailyPlanStore.isEdit()
        });
    }

    handleOnInputChange = (e) =>{
        DailyPlanActionCreator.setSelectedDailyPlan(e.target.value);
    }

    render() {
        const emptyRowStyle = {
            height: "53px"
        };
        const inputLeftCorrectStyle = {
            marginLeft: "15px"
        }
        const rowBreaksAndInputMarginStyle = {
            marginBottom: "15px",
            marginLeft: "0px"
        }

        return (
            <div className="container">
                <div className="row" style={rowBreaksAndInputMarginStyle}>
                    <select disabled={this.state.isEdit} style={inputLeftCorrectStyle} 
                        value={this.state.selectedDailyPlan.id}                     
                        className="form-control custom-select" size="7" 
                        onClick={this.handleOnInputChange}
                        onChange={this.handleOnInputChange} 
                        id="daily-plan-selector">
                                {this.state.dailyPlans.map((dailyPlan) => 
                                <option key={dailyPlan.id} value={dailyPlan.id}>{dailyPlan.name}</option>)}
                    </select>
                </div>
            </div>          
        );
    }
}

export default DailyPlans;