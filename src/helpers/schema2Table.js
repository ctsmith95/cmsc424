import React from 'react';
import { Table } from 'react-bootstrap';

export function schema2Table(schema,data,clickCallback,needsCallback){

  var header = schema.map(function(item,index){
    return(<th key={index}>{item}</th>);
  });

  //Iterate over all elements/properties
  //and generate table
  var tableBody = []; // a table is an array of rows
  var row = []; // a row is an array of columns
  for(var element of data){

    for(var property in element){
      if(needsCallback){
        row.push(<td onClick={clickCallback} name = {element["Name"]}>{element[property]}</td>);
      }
      else{
        row.push(<td>{element[property]}</td>);
      }
    }
    tableBody.push(<tr>{row}</tr>);
    row = [];
  }
  return(
    <Table striped bordered condensed hover>
    <thead>
      <tr>
        {header}
      </tr>
    </thead>
    <tbody>
      {tableBody}
    </tbody>
  </Table>
);
}
