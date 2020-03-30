export function setError(payload) {
    return { type: "SET_ERROR", payload }
}

export function setError_mapDispatchToProps(dispatch) {
    return {
        setError: error => dispatch(setError(error))
    };
}
