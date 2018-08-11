
const axios = require('axios');
require('dotenv').config();

const {
	API_KEY
} = process.env;

module.exports = {
    // User Callbacks

    searchPictures: (req, res) => {
        axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text="${req.query.text}"&per_page=25&format=json&nojsoncallback=1`)
            .then ( (results) => {
                res.status(200).send(results.data) })
            .catch ( (err) => res.status(500).send())
    },


}