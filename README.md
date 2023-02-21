# Workout Planner (MERN stack) with JWT auth

## Description
- This is a MERN stack application for keeping track of workouts for every user
- The project follows the MVC design pattern
- The front end uses React hooks like useContext, useReducer and custom hooks. It also uses CSS
 - The backend uses Node.js, Express.js and connects to MongoDB Atlas (A cloud version of MongoDB) with Mongoose
 - I used JWT for authorization to access data specific to the user
 - User's only see their own workouts and that is enforced by the JWTs
 - Currently not hosted, I have plans to add some more features and then I will host it using AWS
  - Future plans: Implement pagination and an edit feature

 ## Current look
  - This is what it currently looks like

  - ### Login page
  ![A picture of the log in page where the user must enter a valid email and password](readMeImages/workoutAppLogin.png)

  - ### Sign up page
  ![A picture of the sign up page where the user can enter an email and password to create an account](readMeImages/workoutAppSignup.png)

  - ### Workouts for the current user
  ![A picture of the main page which shows multiple workouts and their info as well as a form to create and add new workouts](readMeImages/workoutAppWorkouts.png)

 ## Demo
  - To run it locally you will need to clone the repo
  - Enter npm install in the front end and server folders
  - Then start the frontend dev server and the backend server using:

        npm start
        nodemon
 - Then create an env file to hold the mongodb connection string

### Credits
 - Coded along with this [tutorial](https://www.youtube.com/@NetNinja) to refresh my MERN stack knowledge