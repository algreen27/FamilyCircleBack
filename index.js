const connectDB = require('./startup/db');
const express = require('express');
const app = express();
// const users = require('./routes/users');
// const posts = require('./routes/posts');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', users, posts);

app.use("/uploads/images", express.static(path.join("uploads", "images")));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});