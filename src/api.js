import axios from 'axios';
import qs from 'qs';

const clientId = 'jdsl3lgf1c8gcxi44u29sm30m015n3'
const instance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: { 'Client-ID': clientId }
});

export const getGames = () => instance.get('/games/top?first=5');
export const getCurrentStreams = gameID => instance.get(`/streams?game_id=${gameID}&first=24`);
export const getUsers = userIds => {
  const params = qs.stringify({ id: userIds }, { arrayFormat: 'repeat' });
  return instance.get(`/users?${params}`);
}