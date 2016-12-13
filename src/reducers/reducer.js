import NavConstants from '../constants/NavConstants.js';
import ActionConstants from '../constants/ActionConstants.js';
var init_state = {
  currentView: "State",
  currentYear:1788,
  //The data buffer will contain info
  //to populate the DataView. It consists
  //of a title and an array of data elements to
  //to be converted to either tables or paragraphs
  //within the DataView
  dataBuffer: {
    title: "Default Title",
    data: [{
      tableize: false,
      tableschema: [],
      info: "Lorem ipsum dolor amet"
    },{
      tableize: true,
      tableschema: ["Lorem", "Ipsum", "Dolor", "Amet"],
      info: [{
        Lorem:"lorem",
        Ipsum:"ipsum",
        Dolor:"dolor",
        Amet:"amet"
      }]
    }
    ]

  }
}

export default function(state=init_state,action){
  switch(action.type){
    case ActionConstants.SWITCH_VIEW:
      console.log("VIEW SWITCHING");
      return {
        currentView: action.targetView,
        currentYear: state.currentYear,
        dataBuffer: state.dataBuffer
      };
    case ActionConstants.CHANGE_YEAR:
      console.log("CHANGING YEAR");
      return {
        currentView: state.currentView,
        currentYear: action.targetYear,
        dataBuffer: state.dataBuffer
      };
    case ActionConstants.POPULATE_BUFFER:
      console.log("BUFFER UPDATING");
      return{
        currentView: state.currentView,
        currentYear: state.currentYear,
        dataBuffer: {
          title:action.bufferParams.title,
          data:[{
            tableize: false,
            tableschema: [],
            info: action.bufferParams.query
          }]
        }
      };
    default:
      return state;
  }
}
