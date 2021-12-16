const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const users = require('./routes/users');
const familyCards = require('./routes/familyCards');
const cors = require('cors');
const auth = require('./routes/auth');
// const cors = require('cors');
const fs = require('fs');
const path = require('path');
const auth = require('./middleware/auth');
const res = require('express/lib/response');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/familyCards', familyCards);
app.use('/api/auth', auth);

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        })
    }
    if (res.headerSent){
        return next(error);
    }
    res.status(err.code || 500);
    res.json({message: error.message || "an unknown error occured."})
});

const port = process.env.PORT || 5020
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});