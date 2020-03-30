const Messages = (state = [], action) => {
    switch (action.type) {
      case 'SET_ERROR':
        return [
          ...state,
          {
            errorMsg: action.payload.msg,
            error: action.payload.error
          }
        ]
      default:
        return state
    }
  }
  
  export default Messages