
const axios = require('axios');
require('dotenv').config();

// needed for S3 processing
const {
	USER_NAME,
	API_ACCESS_KEY
} = process.env;

module.exports = {
    // User Callbacks

    getPictures: (req, res) => {
        axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}dd&text="${req.data}"&per_page=25`)
            .then ( (results) => {
                // console.log(results.data)
                res.status(200).send(results.data)} )
            .catch ( (err) => res.status(500).send())
    },

}