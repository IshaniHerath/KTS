const express = require('express');
const app = express();

const userRoute = require('./userProfile/userProfileRoute');

app.use('/userProfile', userRoute);

//callback function
app.get('/', (req, res)=>{
    res.send('hello');
}
);

app.listen(5000);