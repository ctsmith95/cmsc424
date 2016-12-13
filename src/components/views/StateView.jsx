import React from 'react';
import { connect } from 'react-redux';
import { populateDataBuffer } from '../../actions/dataActions.js';
import ViewConstants from '../../constants/ViewConstants';
import stateData from 'json-loader!../../dummydata/stateData.json';

class StateView extends React.Component{
  constructor(props){
    super(props);
    this.geoJson = {};
    this.queryMode = ViewConstants.QueryMode.OVERVIEW;
    this.selectedState = "";
  }

  componentWillMount(){
    //Populate DataBuffer with default info
    var bufferData = {
      title: "Map of U.S Presidential Election: " + this.props.currentYear,
      query: "select PTY.PartyName, P.Name as PresCandidate, VP.Name as VPCandidate, S.State, S.PVotes, S.PVotesP, S.EVotes " +
      "from Ran R, Party PTY, Candidate P, Candidate VP, StateResult S "+
      "where R.Year = "+this.props.currentYear+" and S.Year = R.Year and R.PID = S.PID and R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID;"
    }
    this.props.populateDataBuffer(bufferData);
  }


  _updateDataBuffer(){
    //Populate DataBuffer with new info
    if(this.queryMode == ViewConstants.QueryMode.OVERVIEW){
      var bDTitle = "Map of U.S Presidential Election: " + this.props.currentYear;
      var query = "select PTY.PartyName, P.Name as PresCandidate, VP.Name as VPCandidate, S.State, S.PVotes, S.PVotesP, S.EVotes " +
      "from Ran R, Party PTY, Candidate P, Candidate VP, StateResult S "+
      "where R.Year = "+this.props.currentYear+" and S.Year = R.Year and R.PID = S.PID and R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID;"
    }
    else{
      var bDTitle = this.selectedState + " in " + this.props.currentYear + " U.S Presidential Election";
      var query = "select PTY.PartyName, P.Name as PresCandidate, VP.Name as VPCandidate, S.State, S.PVotes, S.PVotesP, S.EVotes " +
      "from Ran R, Party PTY, Candidate P, Candidate VP, StateResult S "+
      "where R.Year = "+this.props.currentYear+" and S.Year = R.Year and R.PID = S.PID and and S.State = "+this.selectedState+" R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID;"
    }
    var bufferData = {
      title: bDTitle,
      query: query
    }
    this.props.populateDataBuffer(bufferData);

  }
  componentDidUpdate(){
    this._updateDataBuffer();
  }

  _highlightState(e){
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#000',
        dashArray: '',
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

  }

  _resetHighlight(e) {
    this.geoJson.resetStyle(e.target);
  }

  _requestStateData(e){
    var layer = e.target;
    var stateName = layer.feature.properties.name;
    this.queryMode = ViewConstants.QueryMode.INDIV_STATE;
    this.selectedState = stateName;
    this._updateDataBuffer();

  }

  _onEachFeature(feature, layer) {

    layer.on({
       mouseover: this._highlightState,
       mouseout: this._resetHighlight.bind(this),
       click: this._requestStateData.bind(this)
    });
  }

 _styleMapFeature(feature){
   if(stateData.hasOwnProperty(feature.properties.name)){
     return {fillColor: stateData[feature.properties.name].candidates[0].color,
       weight: 2,
       opacity: 1,
       color: 'white',
       dashArray: '3',
       fillOpacity: 0.7}; //what a doozy
   }
   else{
     return {
       fillColor: '#EEEEEE',
       weight: 2,
       opacity: 1,
       color: 'white',
       dashArray: '3',
       fillOpacity: 0.7
     };
   }

 }
  componentDidMount(){
    //Show the leaflet map
    var stateMap = L.map('stateMap').setView([38.73, -96.4], 4);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    	maxZoom: 18,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(stateMap);

    this.geoJson = L.geoJson(statesData,{
      style: this._styleMapFeature,
      onEachFeature: this._onEachFeature.bind(this)
    }).addTo(stateMap);

  }
  render(){
    return(
      <div id="stateMap">
      </div>
    );
  }
}

export default connect(
  state => ({
    currentYear:state.currentYear
  }),
  dispatch => ({
    populateDataBuffer: (bufferParams) => dispatch(populateDataBuffer(bufferParams))
  })
) (StateView);
