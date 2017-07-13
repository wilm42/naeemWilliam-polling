import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class Nav extends React.Component{
  render(){
    let nav = <Link to={this.props.navState.link} className="container column"> {this.props.navState.text} </Link>;
    return(
      <nav className="container">{nav}</nav>
    );
  }
}

const mapStateToProps = (state, props) => ({
  navState: state.navState,
  link: state.link
});

export default connect(mapStateToProps)(Nav);