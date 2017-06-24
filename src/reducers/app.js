import { NAMESPACE_CHANGE } from '../actions';

const initialState = {
  namespace: 'badge-system'
};

export default (state = initialState, action) => {
  switch(action.type) {
    case NAMESPACE_CHANGE:
      return {
        namespace: action.namespace
      };
    default:
      return state;
  }
};
