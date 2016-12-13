import React from 'react';
import { connect } from 'react-redux';
import StateView from './views/StateView.jsx';
import PartyView from './views/PartyView.jsx';
import CandidateView from './views/CandidateView.jsx';
class ViewContainer extends React.Component{
  constructor(props){
    super(props);
    this.currentView = "State";
  }
  render(){
    switch(this.props.currentView){
      case "State":
        return(
          <StateView/>
        );
      case "Party":
        return(
          <PartyView/>
        );
      case "Candidate":
        return(
          <CandidateView/>
          );
      default:
        return(
          <h1>Something Went Wrong ¯\_(ツ)_/¯</h1>
        );
    }

  }
}

export default connect(
  state => ({
    currentView: state.currentView
  })
) (ViewContainer);
