export const REQUEST_MAKE_SELECTION = 'REQUEST_MAKE_SELECTION';
export const requestMakeSelection = (selectionIndex) => ({
  type: REQUEST_MAKE_SELECTION,
  selectionIndex
});

export const SUCCESS_MAKE_SELECTION = 'SUCCESS_MAKE_SELECTION';
export const successMakeSelection = (res) => ({
  type: SUCCESS_MAKE_SELECTION,
  res
});

export const ERROR_MAKE_SELECTION = 'ERROR_MAKE_SELECTION';
export const errorMakeSelection = (error) => ({
  type: ERROR_MAKE_SELECTION,
  error
});

export const recipientMakeSelection = (selectionIndex) => ({
  
});

export const REQUEST_GET_POLLS = 'REQUEST_GET_POLLS';
export const requestGetPolls = () => ({
  type: REQUEST_GET_POLLS,
});

export const SUCCESS_GET_POLLS = 'SUCCESS_GET_POLLS';
export const successGetpolls = (response) => ({
  type: SUCCESS_GET_POLLS,
  response
});

export const ERROR_GET_POLLS = 'ERROR_GET_POLLS';
export const errorGetPolls = (error) => ({
  type: ERROR_GET_POLLS,
  error
});

export const getPolls = () => dispatch => {
  dispatch(requestGetPolls())
  return fetch('/api/polls')
    .then(res=> res.json())
    .then(json=> dispatch(successGetpolls(json)))
    .catch(err=> dispatch(errorGetPolls(err)))
};