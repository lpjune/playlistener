import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube from './util/Youtube';
import Spotify from './util/Spotify';
import Customers from './components/customers';

Spotify.getAccessToken();
Youtube.getVideoInfo('https://www.youtube.com/watch?v=pok8H_KF1FA').then(res => {
  Spotify.search(res.name, res.artist)
})

// fetch('/api/info')
//       .then(res => res.json())
//       .then(res => console.log("Info fetched...", res));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;
