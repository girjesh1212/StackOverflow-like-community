# unotag

This repository contains code to a Stackoverflow like ques/ans community. The task is given at the following link: [https://gist.github.com/vasani-arpit/b0e3ba90935d206ac18eb565ac7a5299](https://gist.github.com/vasani-arpit/b0e3ba90935d206ac18eb565ac7a5299)

## How to start 
- Clone the repository
- Run the command **npm install** in root directory of this project to install dependencies
- Open the config.env file, paste PORT, mongoURI and secretOrKey 
- Run the command **npm run start** in root directory of this project to start the server

## Routes
On going to the route "GET localhost:PORT/" , you should see a list of available routes.
However, those available routes are:

userRoutes: [
    'GET /user/test',
    'POST /user/register',
    'POST /user/login',
    'GET /user/profile',
]

quesRoutes: [
    'GET /question/test',
    'POST /question/create',
    'GET /upvote/:quesId',
    'GET /downupvote/:quesId',
]

ansRoutes: [
    'GET /answer/test',
    'POST /answer/create',
    'GET /upvote/:ansId',
    'GET /downupvote/:ansId',
]

commentRoutes: [
    'GET /answer/test',
    'POST /answer/create',
]

## Try the routes and enjoy
Open postman and try these different routes.

In case of following messages:
- **Unauthorized**: Send authorization token in header obtained from /user/login route
- **{field: "This field is required"}** => Send this field in request body 
