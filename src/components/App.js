import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import GamePage from './GamePage';
import { getGames, getCurrentStreams, getUsers } from '../api';

export default class App extends Component {
  static propTypes = {
    navs: PropTypes.array,
    gameIds: PropTypes.array,
    currentTab: PropTypes.number,
    currentStreams:PropTypes.array,
    onChange: PropTypes.func
  };

  state = {
    navs: [],
    gameIds: [],
    currentTab: 0,
    currentStreams: []
  }

  onNavChange = currentTab => {
    this.setState({ currentTab });
  }

  updateStreams = () => {
    const { gameIds, currentTab } = this.state;
    let currentStreams = [];
    let userIds = [];
    
    getCurrentStreams(gameIds[currentTab])
    .then(streamResponse => {
      currentStreams = streamResponse.data.data;
      for (let i = 0; i < currentStreams.length; i++) {
        userIds.push(currentStreams[i].user_id);
      }
      return getUsers(userIds);
    })
    .then(userResponse => {
      const users = userResponse.data.data;
      for (let i = 0; i < users.length; i++) {
        currentStreams[i].userInfo = users[i];
        currentStreams[i].url = `https://www.twitch.tv/${users[i].login}`
      }
      if (currentStreams[0].game_id === gameIds[currentTab]) {
        // prevent discordance when multiple ajax requests are made
        this.setState({ currentStreams });
      }
    })
  }

  componentDidMount() {
    let navs = [];
    let gameIds = [];

    getGames()
    .then(gameResponse => {
      for (let i = 0; i < 5; i++) {
        navs.push(gameResponse.data.data[i].name);
        gameIds.push(gameResponse.data.data[i].id);
      }
      this.setState({
        navs,
        gameIds
      });
    })
    .then(() => {
      this.updateStreams();
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTab !== this.state.currentTab) {
      this.setState({ currentStreams: [] });
      this.updateStreams();
    }
  }

  render() {
    const { navs, currentTab, currentStreams } = this.state;
    return (
      <div className='app'>
        <Navbar 
          navs={navs} 
          currentTab={currentTab} 
          onChange={this.onNavChange}
        />
        <GamePage 
          navs={navs} 
          currentTab={currentTab} 
          currentStreams={currentStreams} 
        />
        <Footer />
      </div>
    );
  }
}