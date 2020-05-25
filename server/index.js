const express = require('express');
const app = express();

const userRoute = require('./userProfile/userProfileRoute');
const registerRoute = require('./register/registerRoute');
const loginRoute = require('./login/loginRoute');
const courseRoute = require('./course/courseRoute');
const postRouts = require('./Q&A/q&aRout');

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods' , 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type');

    if(req.method === 'OPTION'){
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use('/userProfile', userRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/courses', courseRoute);
app.use('/posts' , postRouts);

//callback function
app.get('/', (req, res)=>{
    res.send('hello');
}
);

app.listen(5000);