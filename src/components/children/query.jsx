// Query holds search form
// React for manipulation
const React = require('react');

// Creates logic for searching 
const query = React.createClass({
    // set values to initial state
    setInitialState:()=>{
        return {
            topic: "",
            startYear: "",
            endYear: ""
        };
    },

    // when the submit button is clicked the following functions will all trigger retreiving 
    _handleSubmit: (event)=>{
        // we don't want the page to reload
        event.preventDefault();

        // manipulate parent element
        this.props._setSearchFeilds(this.state.topic, this.state.startYear, this.state.endYear);
    },

    _handleTopicChange: (event)=>{
        this.setState({topic: event.target.value});
    },

    _handleStartYearChange: (event)=>{
        this.setState({topic: event.target.value});
    },

    _handleEndYearChange: (event)=>{
        this.setState({topic: event.target.value});
    },

    // Render the search form 
    render: function() {
    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Search</b></i></h3>
        </div>

        <div className="panel-body text-center">
          <form role="form" onSubmit={this._handleSubmit}>

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="topic" className="text-center">Topic</label>
              <input type="text" className="form-control text-center" id="topic" onChange={this._handleTopicChange} />
            </div>

            <br />

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="startYear">Start Year</label>
              <input type="text" className="form-control text-center" id="startYear" onChange={this._handleStartYearChange} />
            </div>

            <br />

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="endYear">End Year</label>
              <input type="text" className="form-control text-center" id="endYear" onChange={this._handleEndYearChange} />
            </div>

            <br />

            <button type="submit" className="btn btn-info col-md-offset-5 col-md-2" id="searchBtn">Search</button>

          </form>
        </div>

      </div>

    );
  }

})