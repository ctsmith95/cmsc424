import React from 'react';
import ViewContainer from './ViewContainer.jsx';
import EENavBar from './NavBar.jsx';
import YearSlider from './YearSlider.jsx';
import DataView from './views/DataView.jsx';

class Application extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidUpdate(){
    console.log('Application Updated');
  }
  render(){
    return(
      <div>
        <EENavBar/>
        <div className = 'flex-container'>
          <ViewContainer/>
          <DataView/>
        </div>
        <YearSlider/>
      </div>
    );

  }
}

export default Application;
