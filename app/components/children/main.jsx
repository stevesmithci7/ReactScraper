// Decalring using React as front-end user interface
const React = require('react');

// includes for the individual components of the react app for ease of export
var query = require('./query.jsx');
var search = require('./search.jsx');
var saved = require('./saved.jsx');

// functionality for axios request to scrape the NYT
var axiosHelper = require('../utils/axiosHelper');

const main = React.createClass({
    // Logic for when the scraper is first initialized, the paramaters for the site must be populated
    initilization: () =>{
        return {
            apiResults: [],
            mongoResults: [],
            searchTerms: ['','','']
        }
    },

    // Logic to check if the component has 1. rendered 2. collected saved data from api
    componentDidMount: () =>{
        // get functionality from axiosHelper to retreive saved artciles
        axiosHelper.apiGet().then((query=>{
            this.setState({mongoResults: query.data});
        })).bind(this);
    },

    // When the state of a result/term changes update the apiResults with the changes
    componentDidUpdate: (previousProp, previousState)=>{
        if(this.state.searchTerms != previousState.searchTerms){
            axiosHelper.articleQuery(this.state.searchTerms).then((data)=>{
                this.setState({apiResults: data});
            }).bind(this);
        }
    },

    // Allows children to change the state of the parent main
    // this function allows for the manipulation of the search terms
    _setSearch:(arr)=>{
        // ask if i should parse out the array for mapping
        this.setState({searchTerms:arr});
    },

    // This function allows for the child to manipulate the mongo results
    _resetMongoResults:(newMongo)=>{
        this.setState({mongoResults:newMongo});
    },

    // this is the rendering of the main.jsx parent
    render:()=>{
        return (

            <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>
      
              <div className="page-header">
                <h1 className="text-center"><img style={ {width: "70%"} } src="img/nyt-header.svg" alt="The New York Times"/></h1>
                <h2 className="text-center" style={ {marginTop: "-12px"} }><b><i>React's recreation of NYT</i></b></h2>
                <h4 className="text-center">Search for topics of interest!</h4>
              </div>
      
              <Query _setSearchFeilds={this._setSearchFeilds} />
              <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
              <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />
      
            </div>
      
          );
    }
});

// export to package functionality for other files
module.exports = main;