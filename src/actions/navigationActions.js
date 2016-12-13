import ActionConstants from '../constants/ActionConstants.js';

export function switchViews(targetView) {
  return {
    type: ActionConstants.SWITCH_VIEW,
    targetView
  }
};
