import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton, MenuItem, Table } from 'react-bootstrap';
import { populateDataBuffer } from '../../actions/dataActions.js';
import ViewConstants from '../../constants/ViewConstants.js';
import candidateData from 'json-loader!../../dummydata/winners.json';
import { schema2Table } from '../../helpers/schema2Table';


class CandidateView extends React.Component{
  constructor(props){
    super(props);
    this.queryMode = ViewConstants.QueryMode.OVERVIEW;
    this.candidateSelection = "";
    this.queryType = ViewConstants.QueryMode.CANDIDATES;
  }

  componentWillMount(){
    //Populate DataBuffer with default info
    var bufferData = {
      title: "Click on a Candidate To get Info",
      query: "select PartyName, P.Name as PresCandidate, VP.Name as VPCandidate, EVotes, EVotesP, PVotes, PVotesP " +
      "from Ran R, Party PTY, Candidate P, Candidate VP "+
      "where Year = "+this.props.currentYear+" and R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID;"
    }
    this.props.populateDataBuffer(bufferData);
  }

  _updateDataBuffer(){
    //Populate DataBuffer with new info
    if(this.queryMode == ViewConstants.QueryMode.OVERVIEW){
      var bDTitle = "Click on a Candidate to get info";
      switch(this.queryType){
        case ViewConstants.QueryMode.CANDIDATES:
          var query = "select PartyName, P.Name as PresCandidate, VP.Name as VPCandidate, EVotes, EVotesP, PVotes, PVotesP " +
          "from Ran R, Party PTY, Candidate P, Candidate VP "+
          "where Year = "+this.props.currentYear+" and R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID;"

        case ViewConstants.QueryMode.WINNER:
          var query = "select Name as ElectedPresident "+
          "from Candidate C, Election E"+
          "where Year = "+this.props.currentYear+" and E.WinnerCID = C.CID;"

        case ViewConstants.QueryMode.NONCONSEC:
          var query = "select P.Name, E.Year as Elected, E2.Year as Defeated, E3.Year as Re_Elected "+
          "from Candidate P, Election E, Election E2, Election E3 "+
          "where E.Year<E2.Year and E2.Year<E3.Year and E.WINNERCID=P.CID and E3.WINNERCID=P.CID and E2.WINNERCID!=P.CID;"

        case ViewConstants.QueryMode.SWING:
          var query = "select distinct P.Name, R.Year, PartyName, VP.Name as RunningMate, Winner.Name as Winner "+
          "from Candidate P, Candidate VP, Candidate Winner, Election E, Ran R, Ran R2, Party PTY "+
          "where R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID and E.WINNERCID=Winner.CID and E.Year = R.Year and R2.CID=P.CID and R2.Year!=R.Year and R2.PID!=R.PID "+
          "order by P.Name;"

    }
    }
    else{
      var bDTitle = "Info for " + this.candidateSelection;
      var query = "select R.Year, PartyName, VP.Name as RunningMate, Winner.Name as Winner "+
      "from Candidate P, Candidate VP, Candidate Winner, Election E, Ran R, Party PTY "+
      "where P.Name = "+this.candidateSelection+" and R.PID=PTY.PID and R.CID=P.CID and R.VID=VP.CID and E.WINNERCID=Winner.CID and E.Year = R.Year;"
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

  _clickCallback(e){
    this.queryMode = ViewConstants.QueryMode.INDIV_CAND;
    this.candidateSelection = e.target.getAttribute("name");
    this._updateDataBuffer();
  }
  _toCandidatesQuery(){
    this.queryType = ViewConstants.CandidateQueries.CANDIDATES;
  }
  _toWinnersQuery(){
    this.queryType = ViewConstants.CandidateQueries.WINNERS;
  }
  _toNonConsecQuery(){
    this.queryType = ViewConstants.CandidateQueries.NONCONSEC;
  }
  _toSwingQuery(){
    this.queryType = ViewConstants.CandidateQueries.SWING;
  }

  render(){
    var table = schema2Table(candidateData.schema,candidateData.elements,this._clickCallback.bind(this),true);
    return(
      <div id = "candidateDisplay">
        <div id = "dropdownContainer">
          <ButtonToolbar>
            <DropdownButton title="Query Options" id="dropdown-size-medium">
              <MenuItem eventKey="1" onSelect={this._toCandidatesQuery.bind(this)}>Candidates</MenuItem>
              <MenuItem eventKey="2" onSelect={this._toWinnersQuery.bind(this)}>Winners</MenuItem>
              <MenuItem eventKey="3" onSelect={this._toNonConsecQuery.bind(this)}>Non-Consecutive</MenuItem>
              <MenuItem eventKey="4" onSelect={this._toSwingQuery.bind(this)}>Swing Candidates</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
        {table}
      </div>
    );
  }
}

export default connect(
  state => ({
    currentYear: state.currentYear
  }),
  dispatch => ({
    populateDataBuffer: (bufferParams) => dispatch(populateDataBuffer(bufferParams))
  })
) (CandidateView);
