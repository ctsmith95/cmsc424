import ActionConstants from '../constants/ActionConstants.js';

export function changeYear(targetYear){
    return{
      type: ActionConstants.CHANGE_YEAR,
      targetYear
    };
}

export function populateDataBuffer(bufferParams){
  return{
    type: ActionConstants.POPULATE_BUFFER,
    bufferParams
  }
}
