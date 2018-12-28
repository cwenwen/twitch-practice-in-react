# Twitch API Practice in React

### [Try it!](https://cwenwen.github.io/twitch-practice-in-react/)  

**Twitch Live Games** is a practice for fetching [New Twitch API](https://dev.twitch.tv/docs/api/).  

This project is refactored from [my former practice](https://github.com/cwenwen/APIsPractice/tree/master/Twitch_API).  

## Screenshot
![]( https://i.imgur.com/WKbCI0g.jpg)

## Description

On the navbar, there are the top 5 games on Twitch sorted by number of current viewers.  

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
├── .gitignore
├── index.html
├── package.json
├── webpack.config.js
├── yarn.lock
└── README.md
```

## Codes

Using [axios](https://github.com/axios/axios) to make HTTP Request:
```js
const instance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: { 'Client-ID': clinetId }
});

export const getGames = () => instance.get('/games/top?first=5');
```

## Built With

- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/) - To bundle the scripts
- [Bootstrap](https://getbootstrap.com/) - The CSS framework used
- [GitHub Pages](https://pages.github.com/) - The project been deployed to
