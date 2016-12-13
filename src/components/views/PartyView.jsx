import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { populateDataBuffer } from '../../actions/dataActions.js';
import ViewConstants from '../../constants/ViewConstants.js';

var ScaleChart = require('./d3/ScaleChart.js');
import party from 'json-loader!../../dummydata/party.json';
class PartyView extends React.Component{
  constructor(props){
    super(props);
    this.data = {};
    this.queryMode = ViewConstants.QueryMode.OVERVIEW;
    this.partySelection = ""
  }

  componentWillMount(){
    //Populate DataBuffer with default info
    var bufferData = {
      title: "Parties in " + this.props.currentYear + " U.S Presidential Election",
      query: "select PartyName, R.Year, C.name as PRESCANDIDATE, VP.name as VPCANDIDATE, R.EVOTES, R.EVOTESP,(case when E.WINNERCID = C.CID then 'WON' else 'DEFEATED' end) as RESULT" +
        "from Party P, Ran R, Candidate C, Candidate VP, Election E" +
        "where R.PID=P.PID and R.CID=C.CID and R.VID=VP.CID and R.Year = " + this.props.currentYear + " and R.Year = E.Year;" // Query parties for a given year and each parties electoral votes
    }
    this.props.populateDataBuffer(bufferData);
  }
  _clickCallback(info){
    this.queryMode = ViewConstants.QueryMode.INDIV_PARTY;
    this.partySelection = info.name;
    this._updateDataBuffer();
  }

  componentDidMount(){
    var destination = ReactDOM.findDOMNode(this);
    ScaleChart.create(destination, {
      width: '100%',
      height: '500px'
    }, this.getChartState(),this._clickCallback.bind(this));

  }

  _updateDataBuffer(){
    //Populate DataBuffer with new info
    if(this.queryMode == ViewConstants.QueryMode.OVERVIEW){
      var bDTitle = "Parties in " + this.props.currentYear + " U.S Presidential Election";
      var Query = "select PartyName, R.Year, C.name as PRESCANDIDATE, VP.name as VPCANDIDATE, R.EVOTES, R.EVOTESP,(case when E.WINNERCID = C.CID then 'WON' else 'DEFEATED' end) as RESULT" +
        "from Party P, Ran R, Candidate C, Candidate VP, Election E" +
        "where R.PID=P.PID and R.CID=C.CID and R.VID=VP.CID and R.Year = " + this.props.currentYear + " and R.Year = E.Year;"
    }
    else{
      var bDTitle = this.partySelection + " in " + this.props.currentYear + " U.S Presidential Election";
      var Query = "select PartyName, R.Year, C.name as PRESCANDIDATE, VP.name as VPCANDIDATE, R.EVOTES, R.EVOTESP,(case when E.WINNERCID = C.CID then 'WON' else 'DEFEATED' end) as RESULT" +
        "from Party P, Ran R, Candidate C, Candidate VP, Election E" +
        "where PartyName="+this.partySelection+" and R.PID=P.PID and R.CID=C.CID and R.VID=VP.CID and R.Year = " + this.props.currentYear + " and R.Year = E.Year;"
    }
    var bufferData = {
      title: bDTitle,
      query: Query
    }
    this.props.populateDataBuffer(bufferData);

  }

  componentDidUpdate(){
    this._updateDataBuffer();

    var destination = ReactDOM.findDOMNode(this);
    ScaleChart.update(destination, this.getChartState());
  }

  getChartState(){
    return {
      data: party,
      domain: {x:[1, 4], r:[0,538]}
    }
  }

  componentWillUnmount(){
    var destination = ReactDOM.findDOMNode(this);
    ScaleChart.destroy(destination);
  }


  render(){
    return(
      <div id="partyPlot"></div>
    );
  }
}

export default connect(
  state =>({
    currentYear:state.currentYear
  }),
  dispatch =>({
    populateDataBuffer: (bufferParams)=> dispatch(populateDataBuffer(bufferParams))
  }
  )
) (PartyView);
