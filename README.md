# spiral
# Project Title

Spiral

## Overview

Spiral is a self-discovery and personal growth platform inspired by Spiral Dynamics Theory, a model in developmental psychology. It features a unique test to identify a user's current level of ego development, generating a comprehensive profile and recommending tailored actions and learning paths aligned with their personal goals

### Problem

Most self-help apps on the market fail to offer genuine self-discovery tools, especially those based on the transformative Spiral Dynamics Theory. I believe that authentic growth and change begin with a deep understanding of oneself, supported by a clear vision and roadmap. Spiral addresses this by facilitating true personal development through insightful self-discovery.

### User Profile

- individuals interested in self help and personal development.
  - looking for a better understanding of themselves.
  - looking for understand others better.
  - that wants to grow personaly and professionally

### Features

- As a user, I want to be able to take the test
- As a user, I want to be able to see the results of my test
- As a logged in user, I want to be able to see my profile

## Implementation

### Tech Stack

- NextJS
- TypeScript
- MySQL
- Express
- Client libraries:
  - axios
  - Tailwind
  - Formik
  - MUI
  - Recharts
- Server libraries:
  - knex
  - express
  - bcrypt for password hashing

### APIs

OpenAIapi

### Sitemap

- Home page
- Spiral Test page
- Result page
- Profile page
- Register
- Login

### Mockups

#### Home Page

![](home.png)

#### Test Page

![](test.png)

#### Result Page

![](result.png)

#### Profile Page

![](profile.png)

#### Login Page

![](login.png)


#### RegisterPage

![](register.png)



### Data

![](sql-diagram.png)

### Endpoints

**GET /stages**

- Get a list of spiral dynamics stages

Response:

```
[
    {
        "id": 1,
        "name": "archaic",
        "tier": 1,
        "description": "Automatic, reflexive,Centers around satisfaction ...",
        "color": "beige"
        "challenges": "",
        "doing":{
            "coping":"",
            "needs": "",
            "purpose":""
        }
        "being":{
            "awareness":"",
            "experience": "",
            "affect":""
        }
        "thinking":{
            "conceptions":"",
            "knowledge": "",
            "intrepretation":""
        }
    },
    ...
]
```

**GET /spiral/assessment**

- Get assessment questions and options

Parameters:

- token (optional): JWT used to add user rating

Response:

```
{
    "id": 1,
    "questions":[
        {   "id": 1,
            "question1":"question 1",
            "options":["option1", "option2"]
        }
    ]

}
```

**POST /spiral/result**

Parameters:

- id: assessment id
- token: JWT of the logged in user
- responses: an object of selected responses for each question.

Response:

```
{   
    "id": 1,
    "user_id": 1,
    "stages": {
        5: 30%,
        6: 20%,
    },
    "feedback":"",
    "challenges":"",
    "oppotrunities":"",
    "roadmap": {},
    "bookRecom":{},

}
```
**get /spiral/result/:id**

Parameters:

- id: user id
- token: JWT of the logged in user


Response:

```
{
    "id": 1,
    "stages": [{
        "id":5,
        percentage: "30%"
    }],
    "feedback":"",
}
```

**get /user/:id**

Parameters:

- id: user id
- token: JWT of the logged in user


Response:

```
{
    "id": 1,
    "testResult":[],
}
```

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features have first been implemented
  - Store JWT in localStorage, remove when a user logs out
  - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client

  - NextJS project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Gather Data for 9 stages of spiral.

- Create seeds with the data

- Deploy client and server projects so all commits will be reflected in production

- Feature: landing page 

  - Implement list of different stages
  - 
  - Create GET /stages endpoint

- Feature: spiral test

  - Implement view test page with questions and options
  - save use's selected options
  - Create post /spiral/result

- Feature: spiral feedback

  - Add chart and feedback
  - Create GET / resul

- Feature: user profile

  - Detailed description of user's current stage
  - Create GET / user

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in session storage / Context, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Forgot password functionality
- Ability to add a profile photo
- Add a roadmap for personal growth for each user based on their stages
- book recommendation.
- Unit and Integration Tests
