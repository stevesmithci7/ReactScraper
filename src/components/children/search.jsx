// Implements search functionality to be passed to other components
// Also queries saved articles list to display their results
const React = require('react');

// call logic to retrieve axios calls
const axiosHelper = require('../utils/helpers.js');

// delare component logic for search export
const search = React.createClass({
    // set initial array of search results
    setInitialSate: ()=>{
        return {
            articleArr: []
        };
    },

    _handleSave: (event) => {
        // get article ID
        let articleId = event.target.value;

        let clickedArticle;
        for(let i=0;i<this.state.articleArr.length;i++){
            if(this.state.articleArr[i].id == articleId){
                clickedArticle = this.state.articleArr[i].id;
            }
        }

        // is there a better way of doing this?
        var thisOrNot2this = this;

        // send necessary save to db
        axiosHelper.apiSave(saveArticleObj).then(function(){

            // The purpose is to re-render the Mongo DB based on new results
            axiosHelper.apiGet().then((query)=>{
              thisOrNot2this.props._resetMongoResults(query.data);
            });
      
      
        }.bind(this))
      
    },

    // Render Results of the Search panel
    render: ()=>{
        // is there a better way of doing this?
        var thisOrNot2this = this;

        return (

            <div className="panel panel-default">
      
              <div className="panel-heading">
                <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Results</b></i></h3>
              </div>
      
              <div className="panel-body">
                <ul className="list-group col-md-8 col-md-offset-2">
      
                  {/* Map all results of the search */}
                  {this.props.apiResults.map(function(search, i) {
      
                    // Build array of articles
                    thisOrNot2this.state.arrayOfArticles.push({
                      id: search._id,
                      title: search.headline.main,
                      date: search.pub_date,
                      url: search.web_url
                    });
      
                    return (
                      <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                        <div className="input-group">
                          <div type="text" className="form-control">
                            <b><a href={search.web_url} target="_new" style={ {color: "black"} }>{search.headline.main}</a></b>
                            <i> {search.pub_date.substring(0, 10)}</i>
                          </div>       
                          <span className="input-group-btn">
                            <button className="btn btn-success" type="button" onClick={thisOrNot2this._handleSave} value={search._id}>Save</button>
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

// Pass search for usage elsewhere
module.exports = search;