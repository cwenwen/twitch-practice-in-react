import axios from 'axios';

const header = {
  headers: {
    'Client-ID': 'jdsl3lgf1c8gcxi44u29sm30m015n3'
  }
}

export const getGames = () => {
  return axios.get('https://api.twitch.tv/helix/games/top?first=5', header);
}

export const getCurrentStreams = gameID => {
  return axios.get(`https://api.twitch.tv/helix/streams?game_id=${gameID}&first=24`, header);
}

export const getUsers = userIds => {
  let url = `https://api.twitch.tv/helix/users?id=${userIds[0]}`;
    for (let i = 1; i < userIds.length; i++) {
      url += `&id=${userIds[i]}`;
    };
  return axios.get(url, header);
}