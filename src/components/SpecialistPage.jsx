import React from 'react';
import ProfileStore from "../stores/ProfileStore";
import ProfileActionCreator from "../actions/ProfileActionCreator";
import VisitorStore from "../stores/VisitorStore";
import VisitorActionCreator from "../actions/VisitorActionCreator";
import userImage from "../resources/userImage.png";
import "./styles/layout-style.css";
import 'rc-time-picker/assets/index.css';
import Calendar from './Calendar.jsx';
import CalendarGrid from './CalendarGrid.jsx';
import ReserveVisitModal from './ReserveVisitModal.jsx';

class SpecialistPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            plannerId: VisitorStore.getPlannerId(),
            imageUrl: ProfileStore.getImageUrl(),
            city: ProfileStore.getCity(),
            address:  ProfileStore.getAddress(),
            phone: ProfileStore.getPhone(),
            email: ProfileStore.getEmail(),
            name: ProfileStore.getName(),
            companyName: ProfileStore.getCompanyName(),
        }
    }

    componentWillMount() {
        ProfileActionCreator.setPlanner(this.props.plannerId);

        if(this.state.plannerId === null){
            VisitorActionCreator.setPlannerId(this.props.plannerId);
        }
        
        ProfileStore.addChangeListener(this._onChange);
        VisitorStore.addChangeListener(this._onChange);
        //SearchStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        ProfileStore.removeChangeListener(this._onChange);
        VisitorStore.removeChangeListener(this._onChange);
        //SearchStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            plannerId: VisitorStore.getPlannerId(),
            imageUrl: ProfileStore.getImageUrl(),
            city: ProfileStore.getCity(),
            address:  ProfileStore.getAddress(),
            phone: ProfileStore.getPhone(),
            email: ProfileStore.getEmail(),
            name: ProfileStore.getName(),
            companyName: ProfileStore.getCompanyName(),
        });
    }

    generateReadOnlyLabel(htmlForData, data, shouldBold){
        if(shouldBold){
            const boldStyle = {
                fontWeight: "bold"
            }
            return <label htmlFor={htmlForData} className="col-12 col-form-label" style={boldStyle}>{data}</label>;        
        }
        return <label htmlFor={htmlForData} className="col-12 col-form-label">{data}</label>;
    }

    generateImage(){
        let imageToRender = null;
        let imageStyle = {
            maxWidth: "100%"
        }

        if(this.state.imageUrl === undefined ||this.state.imageUrl === null || this.state.imageUrl === ""){
            imageToRender = <img src={userImage} style={imageStyle} className="rounded" alt="..." />;
        }
        else{
            imageToRender = <img src={this.state.imageUrl} style={imageStyle}  className="rounded" alt="..." />;
        }

        return (
            imageToRender
        );
    }

    render() {
        const rowBreaksStyle = {
            marginBottom: "15px"
        };
        const emptyRowStyle = {
            height: "38px"
        };

        return (
            <div className="container">
                <div className="row" style={rowBreaksStyle}>
                    <div className="col-12" style={emptyRowStyle} >
                    </div>
                </div>
                <div className="row" style={rowBreaksStyle}>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-2">
                        <div className="text-center">
                            {this.generateImage()}
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="row">
                            <div className="col-6 form-group">
                                {this.generateReadOnlyLabel("email-label", "E-mail:", true)}
                                {this.generateReadOnlyLabel("email", this.state.email)}
                            </div>
                            <div className="col-6 form-group">
                                {this.generateReadOnlyLabel("name-label", "Imię i nazwisko:", true)}
                                {this.generateReadOnlyLabel("name", this.state.name)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                {this.generateReadOnlyLabel("city-label", "Miasto:", true)}
                                {this.generateReadOnlyLabel("city", this.state.city)}
                            </div>
                            <div className="col-6 form-group">
                                {this.generateReadOnlyLabel("address-label", "Adres:", true)}
                                {this.generateReadOnlyLabel("address", this.state.address)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                {this.generateReadOnlyLabel("phone-label", "Telefon:", true)}
                                {this.generateReadOnlyLabel("phone", this.state.phone)}
                            </div>
                            <div className="col-6 form-group">
                                {this.generateReadOnlyLabel("company-name-label", "Nazwa firmy:", true)}
                                {this.generateReadOnlyLabel("company-name", this.state.companyName)}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <Calendar 
                            shouldBeAlwaysFullWide = {true}
                            isForVisitor = {true}
                        />
                    </div>
                </div>
                <div className="row" style={rowBreaksStyle}>
                    <div className="col-12">
                        <CalendarGrid />
                    </div>
                </div>
                <ReserveVisitModal />
            </div>
        );
    }
}

export default SpecialistPage;