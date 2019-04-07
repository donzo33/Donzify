import React, { Component } from 'react';
import './App.css';

//donzo: import spotify web api (https://github.com/JMPerez/spotify-web-api-js)


import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

// donzo: import hashparam from api spotify 

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { donzoName: 'Connect you before  !', donzoImage: '' }
    }
  }

  /// donzo: We import  the get hash params from the spotify example 

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  //donzo: We make a set Interval for have the info all 10 sec 


  getNowPlaying() {
    setInterval(() => {
      spotifyApi.getMyCurrentPlaybackState()

        .then(

          (response) => {
            this.setState({

              nowPlaying: {
                donzoName: response.item.name,
                donzoImage: response.item.album.images[0].url,
                donzoAlbum: response.item.album.name
              }
            });
          })


    }, 10000);
  }

  ///

  render() {
    return (
      <div className="App">
        <h1> Welcome to donzify ! v0.1</h1>
        <h6>a very simple snippet for displaying spotify info (+green screen integration)</h6>
        <a href='http://localhost:8888' > Connect to spotify  </a>
        <div style={{ background: '#50dd41' }}>
          Current play: {this.state.nowPlaying.donzoName}
        </div>
        <div style={{ background: '#50dd41' }}>
          Artist : {this.state.nowPlaying.donzoAlbum}
        </div>
        <div style={{ background: '#50dd41' }}>
          <img src={this.state.nowPlaying.donzoImage} style={{ height: 400 }} />
        </div>
        {this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Click for refresh the page (the magic work after 10 second !)
          </button>
        }
      </div>
    );
  }
}

export default App;