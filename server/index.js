const express = require('express');
const app = express();

const userRoute = require('./userProfile/userProfileRoute');
const registerRoute = require('./register/registerRoute');
const loginRoute = require('./login/loginRoute');
const courseRoute = require('./course/courseRoute');
const postRouts = require('./Q&A/q&aRout');
const likeRouts = require('./Q&A/Like/likeRouts');
const thumbsUpRouts = require('./Q&A/thumbsUpAndDown/thumbsUpRouts');
const thumbsDownRouts = require('./Q&A/thumbsUpAndDown/thumbsDownRouts');
const repliesRout = require('./Q&A/replies/repliesRout');
const adminRoute = require('./admin/adminRoute');

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods' , 'POST,GET,OPTIONS,PUT');
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
app.use('/likes' , likeRouts);
app.use('/thumbsUp' , thumbsUpRouts);
app.use('/thumbsDown' , thumbsDownRouts);
app.use('/replies' , repliesRout);
app.use('/admin', adminRoute);

//callback function
app.get('/', (req, res)=>{
    res.send('hello');
}
);

app.listen(5000);