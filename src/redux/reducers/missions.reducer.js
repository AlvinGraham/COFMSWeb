const missionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_MISSIONS':
      return [];
    case 'SET_SET_MISSIONS':
      return action.payload;
    default:
      return state;
  }
};

export default missionsReducer;
