const mongoose = require('mongoose');

const url = process.env.dbUrl;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});