// article query now takes an array in 

// Axios for react ajax request
const axios = require('axios');

// Get authKey
const authKey = require('config.js');

// Axios search request to NYT
const articleQuery = (arr) =>{
    let [topic, beginYear, endYear] = arr;

    // need to get my key again
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + topic + "&begin_date=" + beginYear + "0101&end_date=" + endYear + "1231";

    return new Promise((fufill, reject)=>{

        let results = [];

        axios.get(queryURL).then((resp)=>{

            if(resp.data.resp.docs[0]){
                console.log(resp);
        
                // ask someone how the NYTimes 
                for(let i=0;i<resp.data.resp.docs.length;i++){
                    results.push(resp.data.resp.docs[i]);
                }

                // close out request with promise sending out the results
                fufill(result);
            }
            else{
                // There were no results given the search parameters so close out promise
                reject("");
            }
        });
    });
}

const apiSave=()=>{

    // get the post url for manipulation
    let apiURL = window.location.origin + '/api/saved';

    // Promise so it has to complete the axios inquery
    return new Promise((fufill, reject)=>{

    
        // Format saved link so that it can be stored in mongo
        let params = new URLSearchParams();
        params.append("title", articleObj.title);
        params.append("date", articleObj.date);
        params.append("url", articleObj.url);

        axios.post(apiURL, params).then((resp)=>{
            if(resp){
                fufill(resp);
            }
            else{
                reject('');
            }
        });
    });
}


const apiGet = () =>{

    // As mentioned in apiSave the apiURL is for use with the api Routes
    let apiURL = window.location.origin + '/api/saved';

    // Promise so it has to complete the axios inquery
    return new Promise((fufill,reject)=>{

        // axios get for api get
        axios.get(apiURL).then((resp)=>{
            if(resp){
                fufill(resp);
            }
            else{
                reject('');
            }
        });
    });
}

// api helper for the Deletion post route
const apiDelete = (deleteID)=>{
    // I am rambling but gasp this time we are deleting!
    let apiURL = window.location.origin + '/api/delete/'+ deleteID;

    return new Promise((fufill,reject)=>{

        // send Id for deletion
        axios.post(apiURL).then((resp)=>{
            if(resp){
                fufill(resp);
            }
            else{
                reject('');
            }
        });
    });
}

module.exports = {
    articleQuery,
    apiSave,
    apiGet,
    apiDelete
}