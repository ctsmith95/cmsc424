import React from 'react';
import { connect } from 'react-redux';
import { switchViews } from '../actions/navigationActions.js';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class EENavBar extends React.Component{


  _toStateView(){
    this.props.switchViews('State');
  }
  _toCandidateView(){
    this.props.switchViews('Candidate');
  }
  _toPartyView(){
    this.props.switchViews('Party');
  }
  render(){
    return(
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a>Election Explorer</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} onSelect={this._toStateView.bind(this)}>State View</NavItem>
            <NavItem eventKey={2} onSelect={this._toPartyView.bind(this)}>Party View</NavItem>
            <NavItem eventKey={3} onSelect={this._toCandidateView.bind(this)}>Candidate View</NavItem>
          </Nav>
        </Navbar>
    );
  }
}

export default connect(
  state =>({}),

  dispatch => ({
    switchViews: (targetView) => dispatch(switchViews(targetView))
  })
) (EENavBar)
