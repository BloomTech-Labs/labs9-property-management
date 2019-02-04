# Labs 9 - Property Management 
Welcome to our Property Management Application.


## Contributors
|   **Josue Peralta**  |   **Keegan Burkett**  |    **Charlie Winslow**   |   **Luis Fernando Salazar** |   **Sean Kennedy**   |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:|
| [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/)  | [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/) |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) |

# Table of Contents
- [Getting Started](#getting-started)
    - [What You Need](#what-you-need)
    - [Running The App Locally](#running-the-app-locally)
- [Tech-Stack](#tech-stack)
    - [Front-End](#front-end)
        - [React](#react)
        - [React Router](#react-router)
        - [Material-UI](#material-ui)
        - [Styled Components](#styled-components)
        - [Typeface Roboto](#typeface-roboto)
        - [Recompose](#recompose)
    - [Back-End](#back-end)
        - [Node.js](#node.js)
        - [Express](#express)
        - [Knex](#knex)
        - [Helmet](#helmet)
        - [Morgan](#morgan)
        - [Faker](#faker)
        - [Bluebird](#bluebird)
- [API Documentation](#api-documentation)
    - [Back-End API](#back-end-api)
        - [Endpoints](#endpoints)
    - [Third-Party APIs](#third-party-apis)
        - [Stripe](#stripe)

# Getting Started
## What You Need
### Firebase Account
- Sign up for a Firebase Account
- Create a Firebase Project
- Find your project's configuration in the `General` tab of your project's settings dashboard
- Copy the config settings into a `.env` file placed in the `/client` directory of your project's codebase.

The environment variable names should look like this:
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
```
- Go to the `Service accounts` tab in your Firebase project settings and generate a new private key
- Copy the the keys into a new `.env` file that will be placed in the root directory of your project's codebase

The environment variable names should look like this:

```
FIREBASE_DB_URL=
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
```

### Stripe Account
### Twilio Account
## Running The App Locally
- Clone or Fork the repository
- Run `yarn install` in the root directory to install server dependencies
- Run `knex migrate:latest` to setup the local database.
- Run `yarn server` in the root directory to start the server with nodemon
- Run `yarn install` in the client directory to install client dependencies
- Run `yarn start` in the client directory to start the client app

# Tech-Stack
## Front-End
### React
### React Router
### Material-UI
Material-UI is a component library that follow's Google's Material Design standard. We decided to use this library as opposed to a library like Bootstrap because Material-UI offers sleeker styling and a wide range of ready to use components.

### Styled Components
Styled Components is used in parts of the app such as the landing/marketing pages. This CSS-in-JS solution allows us to avoid handling multiple stylesheets and abstract the CSS to the component level. [View Dependency](https://github.com/styled-components/styled-components)

### Typeface Roboto
Self hosting fonts can significantly speed up a site's loading speed by avoiding an extra network request. Material-UI was built with the `Roboto` font in mind so we are using a self-hosted `Roboto` font. | [View Dependency](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto)

### Recompose
Nesting HOCs into each other can become verbose. Recompose gives us a clean way to organize and nest higher-order components. | [View Dependency](https://github.com/acdlite/recompose)

## Back-End
### Node.js
### Express
### Knex
### Helmet
### Morgan
### Faker
Used during development to create hundreds of dummy data records. This allows us to test endpoints without having to manually submit hundreds of records into the database | [View Dependency](https://github.com/Marak/Faker.js)

### Bluebird
# API Documentation
## Back-End API

Every request from the client has an authorization header containing a token given by firebase upon login. Every request from the client passes through a middleware function that verifies the token in the authorization header. If the token is verified, the middleware function attaches the returned user's Firebase UID to the request body. As a result, **every request will contain the user's UID**. This allows us to always have a way to reference the user in the database without having to pass the user's ID as a parameter in the URL. If needed, the uid can be accessed in each endpoint like so, 
```
router.post('/example-path', (req, res) => {
    const { uid } = req.body;

    /* The rest of the code */
})
```
### Endpoints

**GET** `/api/users/verifyregistration`

Upon logging in, the client sends a request to this path. This endpoint checks if the user is already registered in the database and returns their `role` which could be `'admin'`, `'tenant'` or `null`.
If the user doesn't exist, a `role` of `null` is returned so the client can redirect the user to the account setup page.

**POST** `/api/users/register`

Called when a user submits their chosen account type in the account setup page. This endpoint inserts a user's Firebase UID and chosen account type (`role`) into the database.

**POST** `/api/properties`

Called by property owners when adding a property. Returns the id of the newly added property

**GET** `/api/properties/admin`

Returns all the properties that an owner owns

**GET** `/api/properites/admin/alldata`

Returns all of an owner's properties along with their tenants

## Third-Party API
### Firebase Auth
### Stripe
### Twilio