import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Tiedostojen tallennus demo</h1>
        <p>Demossa harjoitellaan tietojen tallennusta ja latausta sek� sql serverin kautta ett� serverilt� sijaitsevasta kansiosta</p>
        <p>Demossa sovelletaan mm. asnet core + react + sql + html bootstrap elementtej� hy�dynt�en</p>
      </div>
    );
  }
}
