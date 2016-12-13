import React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import { changeYear } from '../actions/dataActions.js';

class YearSlider extends React.Component{
  constructor(props){
    super(props);
    //Save the state of slider so that we can
    //change the slider text w/o changing
    //the year that the application uses to load data
    this.state = {
      yearOnDisplay:1788
    }
  }

  componentDidUpdate(){
    console.log(this.state.yearOnDisplay);
    console.log(this.props.currentYear);
  }

  _yearAdjusted(value){
    this.setState({
      yearOnDisplay:value
      });
  }
  _afterYearAdjusted(value){
    this.props.changeYear(value);
  }

  render(){
    return(
      <div>
        <h3>Year: {this.state.yearOnDisplay}</h3>
        <Slider min ={1788} max={2016} step={4} tipFormatter={null} onChange={this._yearAdjusted.bind(this)} onAfterChange={this._afterYearAdjusted.bind(this)}/>
      </div>
    );
  }

}
export default connect(
  state => ({
    currentYear:state.currentYear
  }),
  dispatch => ({
    changeYear: (targetYear) => dispatch(changeYear(targetYear))
  })

) (YearSlider);
