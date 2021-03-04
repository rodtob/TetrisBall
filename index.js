const express = require("express");
const path = require('path');

const app = express();

app.use(express.static('public'))

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'TBindex.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

