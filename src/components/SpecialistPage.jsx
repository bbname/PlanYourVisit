import React from 'react';
import ProfileStore from "../stores/ProfileStore";
import ProfileActionCreator from "../actions/ProfileActionCreator";
import userImage from "../resources/userImage.png";
import "./styles/layout-style.css";
import 'rc-time-picker/assets/index.css';

class SpecialistPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
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
        ProfileStore.addChangeListener(this._onChange);
        //SearchStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        ProfileStore.removeChangeListener(this._onChange);
        //SearchStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
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
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3">
                        <div className="text-center">
                            {this.generateImage()}
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-9">
                        <div className="form-group">
                            {this.generateReadOnlyLabel("email-label", "E-mail:", true)}
                            {this.generateReadOnlyLabel("email", this.state.email)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("name-label", "Imię i nazwisko:", true)}
                            {this.generateReadOnlyLabel("name", this.state.name)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("city-label", "Miasto:", true)}
                            {this.generateReadOnlyLabel("city", this.state.city)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("address-label", "Adres:", true)}
                            {this.generateReadOnlyLabel("address", this.state.address)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("phone-label", "Telefon:", true)}
                            {this.generateReadOnlyLabel("phone", this.state.phone)}
                        </div>
                        <div className="form-group">
                            {this.generateReadOnlyLabel("company-name-label", "Nazwa firmy:", true)}
                            {this.generateReadOnlyLabel("company-name", this.state.companyName)}
                        </div>
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        );
    }
}

export default SpecialistPage;