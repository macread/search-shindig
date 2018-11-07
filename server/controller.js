const https = require('https');
require('dotenv').config();

const {
	API_KEY
} = process.env;



module.exports = {
    // User Callbacks

    searchPictures: (req, res) => {
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text="${req.query.text}"&per_page=100&format=json&nojsoncallback=1`
        https.get(url, (results) => {
            let data = '';
            results.on('data', chunk => {
                data += chunk;
            })
            results.on('end', () => {
                res.status(200).send(data)
            })
        }).on('error', err => {
                res.status(500).send(err.message)
            })
        
    },


}