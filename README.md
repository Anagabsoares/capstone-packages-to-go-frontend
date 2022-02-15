# Packages-To-Go Frontend 

## Description

- This  is a package delivery management web application, created as a Capstone project for Ada Developer Academy.  It aims to help buildings to manage their  resident's incoming packages and delivery requests.
- This app allows  the manager's account to create a list of packages, associate each package with its owner, update package information, view package information and delete package information when the package is  delivered successfully.
- This app also allows the resident's account to access/view  the packages and request delivery.

## Dependencies

- React 
     - react-dom
     - react-icons
     - react-router-dom
     - react-scripts
     - react-transition-group,
     - reactstrap
     - recharts
     - react-router-dom
     - react-bootstrap-table2-toolkit
     - react-bootstrap
- @auth0/auth0-react
- axios 


## Enviroment Set-up

   
### Clone

- Clone the forked repo. Do not clone this inside of another project folder, because that will cause issues.

- Create a new React app within this project folder. You must perform this within this front-end project folder.

        $ npx create-react-app .
  Add axios
  Install axios:

        $ yarn add axios

  Creating a .env File
  Create a file named .env.
   The front-end layer needs to send API requests to the back-end layer. In order to handle this, the front-end layer repo must include a .env file with this line:

        REACT_APP_BACKEND_URL=http://BACKEND-URL
        optional backend: https://github.com/Anagabsoares/capstone-packages-to-go-backend

    Note that this REACT_APP_BACKEND_URL must include http://.

-  Use this environment variable to send your API requests. You can read it by using the expression process.env.REACT_APP_BACKEND_URL. For example, we may use it like this in any component:

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {
    // ...

