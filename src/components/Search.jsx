import React from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import "./styles/search-style.css"
import SearchActionCreator from "../actions/SearchActionCreator";
import SearchStore from "../stores/SearchStore";

// const people = [
//     {
//       first: 'Charlie',
//       last: 'Brown',
//       twitter: 'dancounsell'
//     },
//     {
//       first: 'Charlotte',
//       last: 'White',
//       twitter: 'mtnmissy'
//     },
//     {
//       first: 'Chloe',
//       last: 'Jones',
//       twitter: 'ladylexy'
//     },
//     {
//       first: 'Cooper',
//       last: 'King',
//       twitter: 'steveodom'
//     }
//   ];
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
//   function escapeRegexCharacters(str) {
//     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   }
  
//   function getSuggestions(value) {
//     const escapedValue = escapeRegexCharacters(value.trim());
    
//     if (escapedValue === '') {
//       return [];
//     }
  
//     const regex = new RegExp('\\b' + escapedValue, 'i');
    
//     return people.filter(person => regex.test(getSuggestionValue(person)));
//   }
  
function getSpecialistSuggestionValue(suggestion) {
    return `${suggestion.name}`;
}

function getCitySuggestionValue(suggestion) {
    return `${suggestion}`;
}

function renderSpecialistSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
  
    return (
      <span className={'suggestion-content'}>
        <img className="plannerImage" src={suggestion.imageUrl} alt="..." />
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
  
              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
}

function renderCitySuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
  
    return (
      <span className={'suggestion-content'}>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
  
              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
}

class Search extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            nameCompanyName: SearchStore.getNameCompanyName(),
            specialistSuggestions: SearchStore.getSpecialists(),
            city: SearchStore.getCity(),
            citySuggestions: SearchStore.getCities()
        }
    }

    componentWillMount() {
        SearchStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        SearchStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            nameCompanyName: SearchStore.getNameCompanyName(),
            specialistSuggestions: SearchStore.getSpecialists(),
            city: SearchStore.getCity(),
            citySuggestions: SearchStore.getCities()
        });
    }

    // handleOnCityChange = (e) => {
    //     SearchActionCreator.setCity(e.target.value);
    // }

    onChangeSpecialistSuggestionChange = (event, { newValue, method }) => {
        SearchActionCreator.setNameCompanyName(newValue);
    };

    onSpecialistSuggestionsFetchRequested = ({ value }) => {
        SearchActionCreator.searchSpecialists(value, this.state.city);
    };

    onSpecialistSuggestionsClearRequested = () => {
        //SearchActionCreator.clearSpecialistsData();
    };

    onChangeCitiesSuggestionChange = (event, { newValue, method }) => {
        SearchActionCreator.setCity(newValue);
    };

    onCitySuggestionsFetchRequested = ({ value }) => {
        SearchActionCreator.searchCities(value);
    };

    onCitySuggestionsClearRequested = () => {
        //SearchActionCreator.clearCitiesData();
    };

    onSpecialistSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        console.log("suggestion", suggestion);
    };

    render() {
        const nameStyle = {
            paddingRight: "5px"
        };
        const cityStyle = {
            paddingLeft: "5px",
            paddingRight: "5px"
        };
        const searchStyle = {
            paddingLeft: "5px"
        };
        const inputPropsSpecialists = {
            placeholder: "Nazwa firmy lub specjalisty",
            value: this.state.nameCompanyName,
            onChange: this.onChangeSpecialistSuggestionChange
        };    
        const inputPropsCities = {
            placeholder: "Miasto",
            value: this.state.city,
            onChange: this.onChangeCitiesSuggestionChange
        };    

        return (
            <div className="container">
                <div className="row">
                    <div style={nameStyle} className="col-12 col-sm-5">
                        <Autosuggest 
                            onSuggestionSelected={this.onSpecialistSuggestionSelected}
                            suggestions={this.state.specialistSuggestions}
                            onSuggestionsFetchRequested={this.onSpecialistSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSpecialistSuggestionsClearRequested}
                            getSuggestionValue={getSpecialistSuggestionValue}
                            renderSuggestion={renderSpecialistSuggestion}
                            inputProps={inputPropsSpecialists} 
                            id="name-company-name" 
                        />
                        {/* <input className="form-control" type="text" placeholder="Nazwa firmy lub specjalisty" id="name-company-name" /> */}
                    </div>
                    <div style={cityStyle} className="col-12 col-sm-5">
                        <Autosuggest 
                            suggestions={this.state.citySuggestions}
                            onSuggestionsFetchRequested={this.onCitySuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onCitySuggestionsClearRequested}
                            getSuggestionValue={getCitySuggestionValue}
                            renderSuggestion={renderCitySuggestion}
                            inputProps={inputPropsCities} 
                            id="city" 
                            />
                        {/* <input className="form-control" value={this.state.city} onChange={this.handleOnCityChange} type="text" placeholder="Miasto" id="city" /> */}
                    </div>
                    <div style={searchStyle} className="col-12 col-sm-2">
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i> Szukaj
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    // render() {
    //     const nameStyle = {
    //         paddingRight: "5px"
    //     };
    //     const cityStyle = {
    //         paddingLeft: "5px",
    //         paddingRight: "5px"
    //     };
    //     const searchStyle = {
    //         paddingLeft: "5px"
    //     };

    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <div style={nameStyle} className="col-12 col-sm-5">
    //                     <input className="form-control" type="text" placeholder="Nazwa firmy lub specjalisty" id="name-company-name" />
    //                 </div>
    //                 <div style={cityStyle} className="col-12 col-sm-5">
    //                     <input className="form-control" type="text" placeholder="Miasto" id="city" />
    //                 </div>
    //                 <div style={searchStyle} className="col-12 col-sm-2">
    //                     <button type="button" className="btn btn-primary">
    //                         <i className="fas fa-search"></i> Szukaj
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}

export default Search;




// const people = [
//     {
//       first: 'Charlie',
//       last: 'Brown',
//       twitter: 'dancounsell'
//     },
//     {
//       first: 'Charlotte',
//       last: 'White',
//       twitter: 'mtnmissy'
//     },
//     {
//       first: 'Chloe',
//       last: 'Jones',
//       twitter: 'ladylexy'
//     },
//     {
//       first: 'Cooper',
//       last: 'King',
//       twitter: 'steveodom'
//     }
//   ];
  
//   // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
//   function escapeRegexCharacters(str) {
//     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   }
  
//   function getSuggestions(value) {
//     const escapedValue = escapeRegexCharacters(value.trim());
    
//     if (escapedValue === '') {
//       return [];
//     }
  
//     const regex = new RegExp('\\b' + escapedValue, 'i');
    
//     return people.filter(person => regex.test(getSuggestionValue(person)));
//   }
  
//   function getSuggestionValue(suggestion) {
//     return `${suggestion.first} ${suggestion.last}`;
//   }
  
//   function renderSuggestion(suggestion, { query }) {
//     const suggestionText = `${suggestion.first} ${suggestion.last}`;
//     const matches = AutosuggestHighlightMatch(suggestionText, query);
//     const parts = AutosuggestHighlightParse(suggestionText, matches);
  
//     return (
//       <span className={'suggestion-content ' + suggestion.twitter}>
//         <span className="name">
//           {
//             parts.map((part, index) => {
//               const className = part.highlight ? 'highlight' : null;
  
//               return (
//                 <span className={className} key={index}>{part.text}</span>
//               );
//             })
//           }
//         </span>
//       </span>
//     );
//   }

// class Search extends React.Component{
//     constructor(props){
//         super(props);

// this.state = {
//       value: '',
//       suggestions: [] 
//     }  
//     }

//     onChange = (event, { newValue, method }) => {
//         this.setState({
//           value: newValue
//         });
//       };
      
//       onSuggestionsFetchRequested = ({ value }) => {
//         this.setState({
//           suggestions: getSuggestions(value)
//         });
//       };
    
//       onSuggestionsClearRequested = () => {
//         this.setState({
//           suggestions: []
//         });
//       };

//     render() {
//         const { value, suggestions } = this.state;
//         const inputProps = {
//           placeholder: "Type 'c'",
//           value,
//           onChange: this.onChange
//         };
    
//         return (
//           <Autosuggest 
//             class="form-control"
//             suggestions={suggestions}
//             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//             onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//             getSuggestionValue={getSuggestionValue}
//             renderSuggestion={renderSuggestion}
//             inputProps={inputProps} />
//         );
//     }
// }

//     // render() {
//     //     const nameStyle = {
//     //         paddingRight: "5px"
//     //     };
//     //     const cityStyle = {
//     //         paddingLeft: "5px",
//     //         paddingRight: "5px"
//     //     };
//     //     const searchStyle = {
//     //         paddingLeft: "5px"
//     //     };

//     //     return (
//     //         <div className="container">
//     //             <div className="row">
//     //                 <div style={nameStyle} className="col-12 col-sm-5">
//     //                     <input className="form-control" type="text" placeholder="Nazwa firmy lub specjalisty" id="name-company-name" />
//     //                 </div>
//     //                 <div style={cityStyle} className="col-12 col-sm-5">
//     //                     <input className="form-control" type="text" placeholder="Miasto" id="city" />
//     //                 </div>
//     //                 <div style={searchStyle} className="col-12 col-sm-2">
//     //                     <button type="button" className="btn btn-primary">
//     //                         <i className="fas fa-search"></i> Szukaj
//     //                     </button>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     );
//     // }
// // }

// export default Search;