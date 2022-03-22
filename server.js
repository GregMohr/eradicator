const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// app.use('/login', (req, res) => {
//   res.send({token: 'testeroni'});
// });

//set port as variable and default to environment 
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));