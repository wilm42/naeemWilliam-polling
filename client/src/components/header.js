import React from 'react';
import Nav from './nav';

export default class Header extends React.Component{
  render(){
    return(
      <header className="container"><span className="logo"><img src="/images/pollicon.svg"/><span className="logoText">Pollster</span></span><Nav /></header>
    );
  }
} 