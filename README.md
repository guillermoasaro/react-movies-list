# React Movies List

Test `v16.13.1` [React](https://github.com/facebook/react/) applications using functional components and hooks to be able to maintain state and allow generating side effects.

In short, it consists of a login page, a list of movies and a detail view for the movies. See the [components](#Components) section for more information of the components and its functions.

## Built with

  - [React Router](https://github.com/ReactTraining/react-router) for basic and nested routing.
  - [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap) to have CSS stylized React components.
  - [JavaScript Cookie](https://github.com/js-cookie/js-cookie) to store the user session in a browser cookie.
  - It consumes a test API provided by a local [JSON Server](https://github.com/typicode/json-server).
  - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run with

  - `git clone`
  - `yarn install`
  - `yarn dev`

## Available Scripts

In the project directory, you can run:

### `yarn dev`

It uses [concurrently](https://github.com/kimmobrunfeldt/concurrently) to run the app and the Mock API in one single command.<br />

Equivalent to `yarn start & yarn json-server` but better.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn json-server`

Runs [json-server](https://github.com/typicode/json-server) Mock API in the port `3001`.<br />

It reads its configuration from `routes.json` and the data from `db.json`.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Components

### App

- Create routing separated between a private area (`Dashboard`) and public page (`Login`).
- State:
  - Maintains the user's session in its state using the React `useState` hook.
  - Has `signIn` and `signOut` methods that update the state of the component.
- Cookies:
  - It is responsible for setting the session in cookies using the `SessionHelper` helper.
  - It is in charge of keeping the cookie updated with each change of its state, using the react `useEffect` hook.

### Login

- Responsible for displaying the login form
- Receive `signIn` function in props from `App` component.
- Process the form when submitted by the user
  - Fetch the API request for authentication
  - Handle errors
  - Calls the function `signIn` received in props
    - Passing user data and
    - Redirect to the page it came from using `useLocation` and `useHistory` from React Router
  - If the user was already authenticated, it redirects to the dashboard using `Redirect` from React Router

### Dashboard

- Represents panel for authenticated users.
- Receive `signOut` function in props from `App` component.
- Get movies from the API  when the component done mounting by using the React `useEffect` hook and a array `[]` literal.
  - Creates its state as an array of movies using the React hook `useState`.
  - In case a blank response shows and `Alert` component.
- Creates a nested routing for the private views of the movie list and the detail view using Route and `useRouteMatch` to set the path.
- Integrate `Navigation` bar with other views.
  - Pass movies by props to `MoviesList` and `MovieDetail`.

### Navigation

- Shows the `Navbar` keeping the current user name visible.
  - Use `SessionHelper` to get the cookie.
- Show logout button.
  - Receives a signout function for props from the `Dashboard`.
  - Passed as function parameter, a function to redirect to login using `useHistory` from React Router.

### MoviesList

- Shows the list of movies of the current user.
  - Receives the movie array in its props from the `Dashboard` component.
  - For each element of the array load a the movie data in the `Card`, `Row` and `Col` components from React-Bootstrap.
  - Use `Link` and `useRouteMatch` from React Router to generate a link to the detail path of a movie.

### MovieDetail

- Search the selected movie in the movies array.
  - Get the ID of the movie from the url parameter using `useParams` function of React Router.
  - Filters the movies array received in props from the `MoviesList` component.
  - Get the movie object.
- Shows the detail of a movie.
  - Loads two React-Bootstrap `Card` elements, one with the image and the other with the title, description and year.
  - Allows going back using the `useHistory` function of React Router and a `Button` from React-Bootstrap.

# Helper Components

### PrivateRoute
- Wrapper of an React Router `Route`.
- Redirects to login when an unauthenticated user tries to access one of the child components.
  - Use `Redirect` from React Router for redirection to login.
- Get the session cookie using the `isAuthenticated` method of the `SessionHelper` helper.

### SessionHelper
- Set of functions to manage user session using browser cookies.
  - `getCookieSession`, `setCookieSession`, `isAuthenticated` and for a quick ckeck.
- It uses the `js-cookie` library.