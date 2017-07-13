import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class Nav extends React.Component{
  render(){
    let nav = <Link to={this.props.navState.link}> {this.props.navState.text} </Link>;
    return(
      <nav>{nav}</nav>
    );
  }
}

const mapStateToProps = (state, props) => ({
  navState: state.navState,
  link: state.link
});

export default connect(mapStateToProps)(Nav);