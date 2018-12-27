import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import GamePage from './GamePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navs: [],
      gameIds: [],
      tab: 0,
      page: {
        title: 'Twitch Live Games',
        streams: []
      }
    }
  }

  onNavChange = tab => {
    this.setState({
      tab,
      page: {
        title: this.state.navs[tab]
      }
    })
  }

  getGames = () => {
    return axios.get('https://api.twitch.tv/helix/games/top?first=5', {
      headers: {
        'Client-ID': 'jdsl3lgf1c8gcxi44u29sm30m015n3'
      }
    })
  }

  getStreams = gameID => {
    return axios.get(`https://api.twitch.tv/helix/streams?game_id=${gameID}&first=24`, {
      headers: {
        'Client-ID': 'jdsl3lgf1c8gcxi44u29sm30m015n3'
      }
    })
  }

  getUsers = userIds => {
    let url = `https://api.twitch.tv/helix/users?id=${userIds[0]}`;
      for (let i = 1; i < userIds.length; i++) {
        url += `&id=${userIds[i]}`;
      }

    return axios.get(url, {
      headers: {
        'Client-ID': 'jdsl3lgf1c8gcxi44u29sm30m015n3'
      }
    })
  }

  componentDidMount() {
    let navs = [];
    let gameIds = [];
    let streams = [];
    let userIds = [];

    this.getGames()
    .then(gameResponse => {
      for (let i = 0; i < 5; i++) {
        navs.push(gameResponse.data.data[i].name);
        gameIds.push(gameResponse.data.data[i].id);
      }

      this.setState({
        navs,
        gameIds,
      });

      return this.getStreams(gameIds[0]);
    })
    .then(streamResponse => {
      streams = streamResponse.data.data;
      for (let i = 0; i < streams.length; i++) {
        userIds.push(streams[i].user_id);
      }
      
      return this.getUsers(userIds);
    })
    .then(userResponse => {
      const users = userResponse.data.data;
      for (let i = 0; i < users.length; i++) {
        streams[i].userInfo = users[i];
        streams[i].url = `https://www.twitch.tv/${users[i].login}`
      }
      this.setState({
        page: {
          title: navs[0],
          streams
        }
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tab, navs } = this.state;
    const gameIds = [...this.state.gameIds];
    let streams = [];
    let userIds = [];

    if (prevState.tab !== this.state.tab) {
      this.getStreams(gameIds[tab])
      .then(streamResponse => {
        streams = streamResponse.data.data;
        for (let i = 0; i < streams.length; i++) {
          userIds.push(streams[i].user_id);
        }
        return this.getUsers(userIds);
      })
      .then(userResponse => {
        const users = userResponse.data.data;
        for (let i = 0; i < users.length; i++) {
          streams[i].userInfo = users[i];
          streams[i].url = `https://www.twitch.tv/${users[i].login}`
        }
        this.setState({
          page: {
            title: navs[tab],
            streams
          }
        })
      })
    }
  }

  render() {
    const { navs, tab, page } = this.state;
    return (
      <React.Fragment>
        <Navbar 
          navs={navs} 
          tab={tab} 
          onChange={this.onNavChange}
        />
        <GamePage 
          page={page}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
