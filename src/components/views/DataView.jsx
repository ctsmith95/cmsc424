import React from 'react';
import { connect } from 'react-redux';
import { schema2Table } from '../../helpers/schema2Table';

class DataView extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log("DataProps");
    console.log(this.props.dataBuffer);
  }
  _generateDataBody(){
    var dataBody = this.props.dataBuffer.data.map(function(element){
      if(element.tableize == true){
        return schema2Table(element.tableschema,element.info);
      }
      else{
        return(<h5>{element.info}</h5>);
      }
    })
    return dataBody;
  }

  componentDidUpdate(){
    console.log("dataView updated");
  }
  render(){
    console.log("re-rendering dataView");
    var dataBody = this._generateDataBody();
    return(
      <div id = "dataBox">
        <h3>{this.props.dataBuffer.title}</h3>
        {dataBody.map(function(element){
          return element;
        })}
      </div>
    );
  }
}
export default connect(
  state => ({
    dataBuffer:state.dataBuffer
  })
) (DataView);
