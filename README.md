# Labs 9 - Property Management 
Welcome to our Property Management Application.


## Contributors
|   **Josue Peralta**  |   **Keegan Burkett**  |    **Charlie Winslow**   |   **Luis Fernando Salazar** |   **Sean Kennedy**   |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:|
| [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/)  | [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/) |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) |

# Table of Contents
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
        
# Tech-Stack
## Front-End
### React
### React Router
### Material-UI
### Styled Components
### Typeface Roboto
### Recompose
## Back-End
### Node.js
### Express
### Knex
### Helmet
### Morgan
### Faker
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