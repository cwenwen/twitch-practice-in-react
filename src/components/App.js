import React, { Component } from 'react';

import { getCurrentStreams, getGames, getUsers } from '../api';

import Footer from './Footer';
import GamePage from './GamePage';
import Navbar from './Navbar';

export default class App extends Component {
  state = {
    navs: [],
    gameIds: [],
    currentTab: 0,
    currentStreams: [],
    error: false,
  };

  onNavChange = currentTab => {
    this.setState({ currentTab });
  };

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
          currentStreams[i].url = `https://www.twitch.tv/${users[i].login}`;
        }
        if (currentStreams[0].game_id === gameIds[currentTab]) {
          // prevent discordance when multiple ajax requests are made
          this.setState({ currentStreams });
        }
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  };

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
          gameIds,
        });
      })
      .then(() => {
        this.updateStreams();
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTab !== this.state.currentTab) {
      this.setState({ currentStreams: [] });
      this.updateStreams();
    }
  }

  render() {
    const { navs, currentTab, currentStreams, error } = this.state;
    return (
      <div className="app">
        <Navbar
          navs={navs}
          currentTab={currentTab}
          onChange={this.onNavChange}
        />
        <GamePage
          gameInfo={navs[currentTab]}
          currentStreams={currentStreams}
          error={error}
        />
        <Footer />
      </div>
    );
  }
}
