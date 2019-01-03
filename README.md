# Twitch API Practice in React

### [Try it!](https://cwenwen.github.io/twitch-practice-in-react/)  

**Twitch Live Games** is a practice for fetching [New Twitch API](https://dev.twitch.tv/docs/api/).  
This project is refactored from [my former practice](https://github.com/cwenwen/APIsPractice/tree/master/Twitch_API).  

## Screenshot
![]( https://i.imgur.com/WKbCI0g.jpg)

## Description

On the navbar, there are the top 5 games at the moment.  
The main part of the page shows the most popular 24 live streams sorted by current viewers.

## File Structure

```
.
├── dist
│   └── bundle.js
├── src
│   ├── components
│   │   ├── App.js
│   │   ├── Footer.js
│   │   ├── GamePage.js
│   │   └── Navbar.js
│   ├── api.js
│   ├── index.css
│   └── index.js
├── .babelrc
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── webpack.config.js
└── yarn.lock
```
## Getting Started

Cloning the repository:  
```console
git clone https://github.com/cwenwen/twitch-practice-in-react.git
```

Installing all dependencies for the project:  
```console
yarn install
```

Starting a server instance, listening on port 8080:  
```console
yarn dev
```

## Codes

Using [axios](https://github.com/axios/axios) to make HTTP Request:
```js
const instance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: { 'Client-ID': clinetId },
});

export const getGames = () => instance.get('/games/top?first=5');
```

When quickly changing games on navbar - making multiple ajax requests in a short time, it may result in incongruence of the title and the streams.  
To prevent this:

```js
// Line 41, App.js

if (currentStreams[0].game_id === gameIds[currentTab]) {
  this.setState({ currentStreams });
}
```

## Built With

- [Bootstrap](https://getbootstrap.com/) - The CSS framework used
- [ESLint](https://github.com/eslint/eslint) - For code linting
- [GitHub Pages](https://pages.github.com/) - The project been deployed to
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/) - To bundle the scripts

## Improvement

[Code review from Yoctol](https://hackmd.io/64UmENxTRcOq5pcFfjOVIg)