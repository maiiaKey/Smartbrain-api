const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '444f217899ae4c5f9254316ba681e2f7'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('err', err))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = { handleImage, handleApiCall }