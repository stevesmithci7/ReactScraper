// When user favorites articles they are saved here for future reference
// React for prototyping class
const React = require('react');

// We need axios to call links and details of the articles saved so call axiosHelper
var axiosHelper = require('../utils/axiosHelper.js');

// Prototypes out saved component
const saved = React.createClass({
    // set initial state this should not be called at all so it returns false 
    setInitialState:()=>{
        console.log("there was an error in saved")
        return false;
    },

    _handleDelete: (event)=>{
        // Gather mongo db id for manipulation
        var targetMongoId = event.target.value;

        // we need to pass 'this' i.e the target for deletion through multiple functions so we need to store 'this'
        var thisOrNot2this = this;

        // calls axiosHelper to find target ID 
        axiosHelper.apiDelete(targetMongoId).then(()=>{
            // this will re-render the favorites after deletion
            axiosHelper.apiGet().then((query)=>{
                thisOrNot2this.props._resetMongoResults(query.data);
            });
        });
    },

    // render the results panel
    render: function() {

        // is there a better way of doing this?
        var thisOrNot2this = this;
    
        return (
    
          <div className="panel panel-default">
    
            <div className="panel-heading">
              <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Saved Articles</b></i></h3>
            </div>
    
            <div className="panel-body">
              <ul className="list-group col-md-8 col-md-offset-2">

                {/* itterate through results to display other info */}
                {this.props.mongoResults.map(function(search, i) {
    
                  return (
                    <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                      <div className="input-group">
                        <div type="text" className="form-control">
                          <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                          <i> {search.date.substring(0, 10)}</i>
                        </div>
                        <span className="input-group-btn">
                          <button className="btn btn-danger" type="button" onClick={thisOrNot2this._handleDelete} value={search._id}>Remove</button>
                        </span>
                      </div>
                    </li>
                  );
                })}
    
              </ul>
            </div>
    
          </div>
          
        );
    }
});

// passes functionality to main.jsx
module.exports = saved;