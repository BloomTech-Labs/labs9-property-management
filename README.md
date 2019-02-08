# Labs 9 - Property Management 
Welcome to our Property Management Application.


## Contributors
|   **Josue Peralta**  |   **Keegan Burkett**  |    **Charlie Winslow**   |   **Luis Fernando Salazar** |   **Sean Kennedy**   |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:|
| [<img src="https://media.licdn.com/dms/image/C5603AQGh0ll6Jzyx-w/profile-displayphoto-shrink_200_200/0?e=1554940800&v=beta&t=sHT8KrR6wk6xxpaKSb2m_-awW0xqps1bJFDOYlKYF9w" width="80">](https://github.com/Josephus-P) | [<img src="" width="80">](https://github.com/)  | [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/) | [<img src="" width="80">](https://github.com/) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/Josephus-P)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/) |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/)  |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/josueperalta) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com) |

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
        - [Uppy](#uppy)
        - [Material-UI-Pickers](#material-ui-pickers)
        - [React-Text-Mask](#react-text-mask)
    - [Back-End](#back-end)
        - [Node.js](#node.js)
        - [Express](#express)
        - [Knex](#knex)
        - [Cors](#cors)
        - [Helmet](#helmet)
        - [Morgan](#morgan)
        - [Faker](#faker)
        - [Bluebird](#bluebird)
- [API Documentation](#api-documentation)
    - [Back-End API](#back-end-api)
        - [Endpoints](#endpoints)
    - [Third-Party APIs](#third-party-apis)
        - [Stripe](#stripe)
        - [Twilio](#twilio)
        - [Uppy](#uppy)
        - [Transloadit](#transloadit)
        - [Google Cloud Storage](#google-cloud-storage)

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
- Sign up for a Stripe Account
- Go to the `Connect` menu link in your Stripe dashboard then click the get started button
- Copy and paste your test `client ID` into your `.env` file in the root directory of your project
```
STRIPE_CLIENT_ID=YOUR_STRIPE_CLIENT_ID
```
- Go back to your Stripe dashboard and click the `Developers` menu link then click `API Keys`
- Copy the test `publishable key` and replace the publishable key located in the render function of `Payments.js`
```
const publishableKey = 'your publishable key';
```
- Copy and paste your test `secret key` into your `.env` file in the root directory of your project
```
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```

### Twilio Account
- Sign up for a twilio account at (https://www.twilio.com/console)
- Once the account is made, navigate to the settings on your Twilio console and copy the        ACCOUNT SID and AUTH TOKEN given in the API Credentials section.
-  Create a server-side .env file and in your .env file, create your enviroment variables       and add your credentials.
    ```  
    twilio_accountSid=your Sid
    twilio_authToken=your Token
    ```
- Once the credentials are in place make your way to the bottom of the server.js file to       find the Twilio endpoint.
- Here you will place your .env variables, the recieving number that must be verified with     Twilio (https://www.twilio.com/console/phone-numbers/verified), the message, and the         Twilio number given to you in the Twilio console, on the Dashboard.
```
server.get('/text', (req, res) => {
  client.messages
    .create({
      body: 'The message that will be sent to the user',
      to: '+Number Recieving Text',
      from: '+Your Twilio Number', 
    })
```
- After all previous steps are completed, try sending a text using the submit button in        WorkOrders.js after a work order is created.
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
React is a javaScript library for building user interfaces. React's most important advances are the emphasis on components, one-way data flow, the Virtual DOM, JSX, and architecture that extends beyond HTML. React's simplicity lies in that it makes it easy to declare user-interfaces in self-contained independent components. | [View Dependency](https://reactjs.org/)

### React Router
React Router is the standard routing library for React. From the docs: “React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. | [View Dependency](https://reacttraining.com/react-router/web/guides/quick-start)

### Material-UI
Material-UI is a component library that follow's Google's Material Design standard. We decided to use this library as opposed to a library like Bootstrap because Material-UI offers sleeker styling and a wide range of ready to use components. | [View Dependency](https://github.com/styled-components/styled-components)

### Styled Components
Styled Components is used in parts of the app such as the landing/marketing pages. This CSS-in-JS solution allows us to avoid handling multiple stylesheets and abstract the CSS to the component level. | [View Dependency](https://github.com/styled-components/styled-components)

### Typeface Roboto
Self hosting fonts can significantly speed up a site's loading speed by avoiding an extra network request. Material-UI was built with the `Roboto` font in mind so we are using a self-hosted `Roboto` font. | [View Dependency](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto)

### Recompose
Nesting HOCs into each other can become verbose. Recompose gives us a clean way to organize and nest higher-order components. | [View Dependency](https://github.com/acdlite/recompose)

### Uppy
"Uppy is a sleek and modular file uploader. It fetches files from local disk, Google Drive, Instagram, remote urls, cameras etc, and then uploads them to the final destination. It’s fast, easy to use and lets you worry about more important problems than building a file uploader." | [View Dependency](https://github.com/transloadit/uppy)

### Material-UI-Pickers
Easy-to-use date/time pickers implemented with the material design standard | [View Dependency](https://github.com/dmtrKovalenko/material-ui-pickers)

### React-Text-Mask
An input mask library that creates formatted inputs for strings such as phone numbers, dates and more | [View Dependency](https://github.com/text-mask/text-mask)

## Back-End
### Node.js
Node offers a lot of advantages such as:
* JavaScript on the server: use the same programming language and paradigm for both client and server. This minimizes context switching and makes it easy to share code between the client and the server.
* single threaded: removes the complexity involved in handling multiple threads.
* asynchronous: can take full advantage of the processor it’s running on. This matters because the node process will be running on a single CPU.
* npm repository: access the the largest ecosystem of useful libraries (most of them free to use) in the form of npm modules.

Also, Node allows for data interchange in `JSON (JavaScript Object Notation)` format between the client and the server.

### Express
Express is a web application framework that sits on top of Node.js web server. We chose Express because it offers:
* Simplicity
* Flexibility
* Scalability
* It is intuitive

Express main features are:
* Middleware:
When sending a request, you can use `middleware functions` to verify the request before getting the response. After using a middleware on a response, it can allow the response to return or call the next middleware.

* Routing:
Using routes is a way to break the application into smaller components (similar to React). Each route can have its own middleware. Having different routes also allows a team of many people to work on different endpoints at the same time.

The drawbacks of using Node+Express is that due to the flexibility and control it provides, we needed to make more decisions in regards to the Backend architecture. It also offers very little out of the box compared to other frameworks. You also need to do all the error handlings yourself.

[View Dependency](https://expressjs.com/)

### Knex
Knex can be used as an SQL query builder in Node.JS. Knex provides schema building features to create and modify a database and tables.
A database migration describes changes made to the structure of a database. Things like adding new tables, modifying existing ones or removing a column from a table are all migrations.

We used Knex to build our database schema. | [View Dependency](https://knexjs.org/)

### Cors
Third party middleware to make it easy to configure CORS in a Node.js application. | [View Dependency](https://www.npmjs.com/package/cors)

### Helmet
Third party middleware for configuring security headers in a Node.js application. | [View Dependency](https://www.npmjs.com/package/helmet)

### Morgan
Third party middleware for logging in Node.js applications.| [View Dependency](https://www.npmjs.com/package/morgan)

### Faker
Used during development to create hundreds of dummy data records. This allows us to test endpoints without having to manually submit hundreds of records into the database | [View Dependency](https://github.com/Marak/Faker.js)

### Bluebird
Bluebird is a fully feature promise library with focus on innovative features and performance. We are using Bluebird to get a nested JSON object for a User of type "owner" to display all its properties and tenants on the Frontend without getting repeated data.| [View Dependency](http://bluebirdjs.com/docs/api-reference.html)

See example:

```owner = {
  "property_name":"Lambda House",
  "address": "123 Lambda Street",
  "tenants": [
        {
            "tenant_id": 6,
            "leased_start_date": "December 2018",
            "end_date": "January 2020"
        },
        {
            "tenant_id": 7,
            "leased_start_date": "December 2018",
            "end_date": "January 2020"
        }
    ]
  },
  {
  "property_name":"Lambda House 2",
  "address": "124 Lambda Street",
  "tenants": [
      {
        "tenant_id": 8,
        "leased_start_date": "December 2018",
        "end_date": "January 2020"
      }
    ]
  }
}
```

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

#### Users Endpoints

**GET** `/api/users/verifyregistration`

Upon logging in, the client sends a request to this path. This endpoint checks if the user is already registered in the database and returns their `role` which could be `'admin'`, `'tenant'` or `null`.
If the user doesn't exist, a `role` of `null` is returned so the client can redirect the user to the account setup page.

**POST** `/api/users/register`

Called when a user submits their chosen account type in the account setup page. This endpoint inserts a user's Firebase UID and chosen account type (`role`) into the database.

#### Owners Endpoints

**POST** `/api/properties`

Called by property owners when adding a property. Returns the id of the newly added property

**GET** `/api/properties/admin`

Returns all the properties that an owner owns

**GET** `/api/properites/admin/alldata`

Returns all of an owner's properties along with their tenants

**GET** `/api/stripe-connect`

Checks if the owner has connected their Stripe account to the application and returns an object that contains a boolean value

**POST** `/api/stripe-connect`

Called upon redirect from Stripe back to the application, after the owner clicks Stripe's Connect with Stripe button. This endpoint sends a POST request to Stripe with the authorization code provided in Stripe's reponse and saves the owners Stripe user id in the database.

#### Tenants Endpoints

**GET** `/api/tenants/dashboard`

Returns the property data assigned to a tenant.

**GET** `/api/tenants/maintenanceView`

Returns tenant info for Tenant Maintenance View component.

**GET** `/api/work-orders/maintenance`

Returns all work orders submitted by a tenant.

**POST** `/api/work-orders`

Called by tenants to submit a work order.

**POST** `/api/payments`

Called when a tenant submits a payment using the Stripe checkout modal. This endpoint charges the tenant and sends the funds to the owners connected Stripe account.

## Third-Party API
### Firebase Auth
### Stripe

A powerful, simple, and seamless payment commerce solution | [View Dependency](https://stripe.com/docs)


### Twilio
Twilio's programmable SMS enables our app to send text alerts to the users that agree to recieve them.

### Transloadit
The API we decided to use for processing uploaded images, Transloadit (https://transloadit.com/docs/) will give each image a url and store them in our Google Cloud Storage bucket.

### Google Cloud Storage
Photos uploaded by users are being stored in our Google Cloud Storage bucket.(https://cloud.google.com/storage/docs/)