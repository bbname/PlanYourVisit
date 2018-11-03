import React from 'react';
import VisitTypeStore from '../../stores/VisitTypeStore';
import VisitTypeActionCreator from "../../actions/VisitTypeActionCreator";
import "../styles/layout-style.css";

class VisitTypes extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedVisitType: VisitTypeStore.getSelectedVisitType(),
            visitTypes: VisitTypeStore.getVisitTypes(),
            isNew: VisitTypeStore.isNew(),
            isEdit: VisitTypeStore.isEdit()
        }
    }

    componentWillMount() {
        VisitTypeStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        VisitTypeActionCreator.setVisitTypes();
    }
 
    componentWillUnmount() {
        VisitTypeStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            selectedVisitType: VisitTypeStore.getSelectedVisitType(),
            visitTypes: VisitTypeStore.getVisitTypes(),
            isNew: VisitTypeStore.isNew(),
            isEdit: VisitTypeStore.isEdit()
        });
    }

    handleOnInputChange = (e) =>{
        VisitTypeActionCreator.setSelectedVisitType(e.target.value);
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
                <select disabled={this.state.isEdit} value={this.state.selectedVisitType.id} style={inputLeftCorrectStyle} 
                    className="form-control custom-select" size="20" 
                    onClick={this.handleOnInputChange}
                    onChange={this.handleOnInputChange} id="visit-type-selector">
                            {this.state.visitTypes.map((visitType) => 
                            <option key={visitType.id} value={visitType.id}>{visitType.name}</option>)}
                </select>
            </div>          
        );
    }
}

export default VisitTypes;