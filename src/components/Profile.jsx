import React from 'react';
import ProfileStore from "../stores/ProfileStore";
import UserStore from "../stores/UserStore";
import ProfileActionCreator from "../actions/ProfileActionCreator";
import "./styles/layout-style.css";
import userImage from "../resources/userImage.png";

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isFormValid: ProfileStore.isFormValid(),
            user: UserStore.getUser(),
            isPlanner: ProfileStore.isPlanner(),
            isSaveBtnClicked: ProfileStore.isSaveBtnClicked(),
            isEditBtnClicked: ProfileStore.isEditBtnClicked(),
            isCloseBtnClicked: ProfileStore.isCloseBtnClicked(),
            imageUrl: ProfileStore.getImageUrl(),
            city: ProfileStore.getCity(),
            address:  ProfileStore.getAddress(),
            phone: ProfileStore.getPhone(),
            email: ProfileStore.getEmail(),
            // isEmailValid: ProfileStore.isEmailValid(),
            // password: ProfileStore.getPassword(),
            // isPasswordValid: ProfileStore.isPasswordValid(),
            // passwordErrorMessage: ProfileStore.getPasswordErrorMessage(),
            // passwordConfirmation: ProfileStore.getPasswordConfirmation(),
            // isPasswordConfirmationValid: ProfileStore.isPasswordCofirmationValid(),
            name: ProfileStore.getName(),
            // isNameValid: ProfileStore.isNameValid(),
            companyName: ProfileStore.getCompanyName(),
            // isCompanyNameValid: ProfileStore.isCompanyNameValid()
        }

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        ProfileStore.addChangeListener(this._onChange);
        ProfileActionCreator.setUser();
        // UserStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        ProfileStore.removeChangeListener(this._onChange);
        // UserStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            isFormValid: ProfileStore.isFormValid(),
            user: UserStore.getUser(),
            isPlanner: ProfileStore.isPlanner(),
            isSaveBtnClicked: ProfileStore.isSaveBtnClicked(),
            isEditBtnClicked: ProfileStore.isEditBtnClicked(),
            isCloseBtnClicked: ProfileStore.isCloseBtnClicked(),
            imageUrl: ProfileStore.getImageUrl(),
            city: ProfileStore.getCity(),
            address:  ProfileStore.getAddress(),
            phone: ProfileStore.getPhone(),
            email : ProfileStore.getEmail(),
            // isEmailValid: ProfileStore.isEmailValid(),
            // password: ProfileStore.getPassword(), 
            // isPasswordValid: ProfileStore.isPasswordValid(),
            // passwordErrorMessage: ProfileStore.getPasswordErrorMessage(),
            // passwordConfirmation: ProfileStore.getPasswordConfirmation(),
            // isPasswordConfirmationValid: ProfileStore.isPasswordCofirmationValid(),
            name: ProfileStore.getName(),
            // isNameValid: ProfileStore.isNameValid(),
            companyName: ProfileStore.getCompanyName(),
            // isCompanyNameValid: ProfileStore.isCompanyNameValid()
        });
    }

    handleOnEditBtnClick = (e) => {
        ProfileActionCreator.editBtnClicked();
    }

    handleOnCloseBtnClick = (e) => {
        ProfileActionCreator.closeBtnClicked();
    }

    handleOnSaveBtnClick = (e) => {
        ProfileActionCreator.saveBtnClicked();
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === "name"){
            ProfileActionCreator.setName(e.target.value);
        }
        else if(e.target.id === "city"){
            ProfileActionCreator.setCity(e.target.value);
        }
        else if(e.target.id === "address"){
            ProfileActionCreator.setAddress(e.target.value);
        }
        else if(e.target.id === "phone"){
            ProfileActionCreator.setPhone(e.target.value);
        }
        else if(e.target.id === "company-name"){
            ProfileActionCreator.setCompanyName(e.target.value);
        }
    }

    handleOnImageLoad = (e) => {
        let file = e.target.files[0];
        ProfileActionCreator.saveUserImage(file);
    }

    getNameLabel(){
        if(this.state.isNameValid === null && this.state.isSaveBtnClicked){
            return <label htmlFor="name" className="col-form-label label-invalid">Imię i nazwisko (nieuzupełnione):</label>;
        }
        else if(this.state.isNameValid === null){
            return <label htmlFor="name" className="col-form-label">Imię i nazwisko:</label>;
        }
        else if(this.state.isNameValid === true){
            return <label htmlFor="name" className="col-form-label label-valid">Imię i nazwisko (poprawne):</label>;
        }
        else if(this.state.isNameValid === false){
            return <label htmlFor="name" className="col-form-label label-invalid">
            Imię i nazwisko (niepoprawne) - minimalna ilość znaków w polu to 3
            </label>;
        }
    }

    getInputCssClasses(stateIsValid){
        let inputCssClasses = ["form-control"];

        if(stateIsValid === true){
            inputCssClasses.push('input-valid')
        }
        else if(stateIsValid === false
            ||  stateIsValid === null && this.state.isRegisterBtnClicked){
            inputCssClasses.push('input-invalid')
        }

        return inputCssClasses;
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

        if(this.state.imageUrl === undefined ||this.state.imageUrl === null || this.state.imageUrl === ""){
            imageToRender = <img src={userImage} className="card-img-top rounded" alt="..." />;
        }
        else{
            imageToRender = <img src={this.state.imageUrl} className="card-img-top rounded" alt="..." />;
        }

        return (
            <div className="card">
                {imageToRender}
                <div className="card-body">
                    <h5 className="card-title">Zdjęcie profilowe</h5>
                    <p className="card-text">Klkiknij w przycisk, wybierz i załaduj nowe zdjęcie.</p>
                    <div className="custom-file">
                        <input onChange={this.handleOnImageLoad} type="file" className="custom-file-input" id="customFileLang" lang="pl" />
                        <label className="custom-file-label" htmlFor="customFileLang" lang="pl" />
                    </div>
                </div>
            </div>
        );
    }

    generateInputForCompany(){
        const inputLeftCorrectStyle = {
            marginLeft: "15px"
        }

        if(this.state.isPlanner){
            if(this.state.isEditBtnClicked){
                return (
                    <div className="form-group">
                        {this.generateReadOnlyLabel("company-name-label", "Nazwa firmy:", true)}
                        <input style={inputLeftCorrectStyle} className="form-control" value={this.state.companyName} onChange={this.handleOnInputChange} type="text" id="company-name" />
                    </div>
                );
            }
            else{
                return (
                    <div className="form-group">
                        {this.generateReadOnlyLabel("company-name-label", "Nazwa firmy:", true)}
                        {this.generateReadOnlyLabel("company-name", this.state.companyName)}
                    </div>
                );
            }
        }
    }

    generateEditBtns(){
        let closeBtn = null;

        if(this.state.isEditBtnClicked){
            closeBtn = (<button type="button" className="close" onClick={this.handleOnCloseBtnClick} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>);
        }

        const editBtnStyle={
            marginRight: "30px"
        }

        return (
            <div className="col-12">
                {closeBtn}
                <button type="button" style={editBtnStyle} onClick={this.handleOnEditBtnClick} className="btn btn-warning float-right" disabled={this.state.isEditBtnClicked === true || this.state.isEditBtnClicked === false}><i className="fas fa-edit"></i> Edytuj</button>
            </div>
        );        
    }

    generateForEdit(){
        let saveBtn = null;

        if(this.state.isEditBtnClicked){
            saveBtn = (<button type="button" onClick={this.handleOnSaveBtnClick} className="btn btn-success">
            <i className="fas fa-check"></i> Zapisz
            </button>); 
        }

        // let nameCssClassess = this.getInputCssClasses(this.state.isNameValid);
        const rowBreaksStyle = {
            marginBottom: "15px"
        }
        const inputLeftCorrectStyle = {
            marginLeft: "15px"
        }

        return (
            <div className="container">
                <div className="row" style={rowBreaksStyle}>
                    {this.generateEditBtns()}
                </div>
                <form>
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
                                <input style={inputLeftCorrectStyle} className="form-control" value={this.state.name} onChange={this.handleOnInputChange} type="text" id="name" />
                            </div>
                            <div className="form-group">
                                {this.generateReadOnlyLabel("city-label", "Miasto:", true)}
                                <input style={inputLeftCorrectStyle} className="form-control"  value={this.state.city} onChange={this.handleOnInputChange} type="text" id="city" />
                            </div>
                            <div className="form-group">
                                {this.generateReadOnlyLabel("address-label", "Adres:", true)}
                                <input style={inputLeftCorrectStyle} className="form-control"  value={this.state.address} onChange={this.handleOnInputChange} type="text" id="address" />
                            </div>
                            <div className="form-group">
                                {this.generateReadOnlyLabel("phone-label", "Telefon:", true)}
                                <input style={inputLeftCorrectStyle} className="form-control"  value={this.state.phone} onChange={this.handleOnInputChange} type="text" id="phone" />
                            </div>
                            {this.generateInputForCompany()}                            
                        </div>
                    </div>
                    <div className="row" style={rowBreaksStyle}>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">

                        </div>
                    </div>
                </form>
                {saveBtn}
            </div>
        );
    }

    generateForReadOnly(){
        const rowBreaksStyle = {
            marginBottom: "15px"
        }

        return (
            <div className="container">
                <div className="row" style={rowBreaksStyle}>
                    <div className="col-12">
                        <button type="button" onClick={this.handleOnEditBtnClick} className="btn btn-warning float-right" disabled={this.state.isEditBtnClicked === true}><i className="fas fa-edit"></i> Edytuj</button>
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
                        {this.generateInputForCompany()}
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        );
    }

    generateLoader(){
        return <div className="loader"></div>;
    }

    generateProfile(){
        // if(this.state.isEditBtnClicked === null){
        //     return this.generateLoader();
        // }
        if(this.state.isEditBtnClicked){
            return this.generateForEdit();
        }
        else{
            return this.generateForReadOnly();
        }
    }

    render() {
        return (
            this.generateProfile()
        );
    }
}

export default Profile;