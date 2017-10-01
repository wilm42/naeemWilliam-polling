export const INITIALIZE_FIREBASE = "INITIALIZE_FIREBASE";
export const initialize_firebase = (firedb, fireauth) => ({
	type: INITIALIZE_FIREBASE,
	firedb,
	fireauth,
});

export const SELECT_POLL = "SELECT_POLL";
export const selectPoll = (pollId, userId) => ({
	type: SELECT_POLL,
	pollId,
	userId,
});

export const USER_VALIDATED = "USER_VALIDATED";
export const user_validated = user => ({
	type: USER_VALIDATED,
	user,
});

export const REQUEST_ONE_POLL = "REQUEST_ONE_POLL";
export const requestOnePoll = selectionIndex => ({
	type: REQUEST_ONE_POLL,
	selectionIndex,
});

export const SUCCESS_MAKE_SELECTION = "SUCCESS_MAKE_SELECTION";
export const successMakeSelection = res => ({
	type: SUCCESS_MAKE_SELECTION,
	res,
});

export const ERROR_MAKE_SELECTION = "ERROR_MAKE_SELECTION";
export const errorMakeSelection = error => ({
	type: ERROR_MAKE_SELECTION,
	error,
});

export const getOnePoll = pollId => dispatch => {
	dispatch(requestOnePoll());
	return fetch(`/api/polls/${pollId}`, {
		method: "GET by id",
		headers: {
			"Content-Type": "application/json",
		},
		// 'body': JSON.stringify(putBody)  COME BACK HERE TO WORK ON FETCH FOR SINGLE POLL
	})
		.then(res => res.json())
		.then(res => dispatch(successMakeSelection(res)))
		.catch(error => dispatch(errorMakeSelection(error)));
};

export const recipientMakeSelection = (
	pollId,
	choices,
	selectionId,
) => dispatch => {
	choices[selectionId].vote = choices[selectionId].vote + 1;
	const putBody = Object.assign({}, { choices });
	dispatch(requestOnePoll());
	return fetch(`/api/polls/${pollId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(putBody),
	})
		.then(res => res.json())
		.then(res => dispatch(successMakeSelection(res)))
		.then(() => dispatch(getPolls()))
		.catch(error => dispatch(errorMakeSelection(error)));
};

export const REQUEST_GET_POLLS = "REQUEST_GET_POLLS";
export const requestGetPolls = () => ({
	type: REQUEST_GET_POLLS,
});

export const SUCCESS_GET_POLLS = "SUCCESS_GET_POLLS";
export const successGetpolls = response => ({
	type: SUCCESS_GET_POLLS,
	response,
});

export const ERROR_GET_POLLS = "ERROR_GET_POLLS";
export const errorGetPolls = error => ({
	type: ERROR_GET_POLLS,
	error,
});

export const getPolls = () => dispatch => {
	dispatch(requestGetPolls());
	return fetch("/api/polls")
		.then(res => res.json())
		.then(json => dispatch(successGetpolls(json)))
		.catch(err => dispatch(errorGetPolls(err)));
};

export const REQUEST_CREATE_POLL = "REQUEST_CREATE_POLL";
export const requestCreatePoll = () => ({
	type: REQUEST_CREATE_POLL,
});

export const SUCCESS_CREATE_POLL = "SUCCESS_CREATE_POLL";
export const successCreatePoll = res => ({
	type: SUCCESS_CREATE_POLL,
	res,
});

export const ERROR_CREATE_POLL = "ERROR_CREATE_POLL";
export const errorCreatePoll = error => ({
	type: ERROR_CREATE_POLL,
	error,
});

export const CAST_VOTE = "CAST_VOTE";
export const castVote = () => ({
	type: CAST_VOTE,
});

export const createPoll = (obj, history) => dispatch => {
	dispatch(requestCreatePoll());
	return fetch("/api/polls", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	})
		.then(res => {
			dispatch(successCreatePoll(res));
			history.push("/");
		})
		.catch(error => {
			dispatch(errorCreatePoll(error));
		});
};

export const REQUEST_POLL_RECIPIENT = "REQUEST_POLL_RECIPIENT";
export const requestPollRecipient = () => ({
	type: REQUEST_POLL_RECIPIENT,
});

export const SUCCESS_POLL_RECIPIENT = "SUCCESS_POLL_RECIPIENT";
export const successPollRecipient = response => ({
	type: SUCCESS_POLL_RECIPIENT,
	response,
});

export const ERROR_POLL_RECIPIENT = "ERROR_POLL_RECIPIENT";
export const errorPollRecipient = error => ({
	type: ERROR_POLL_RECIPIENT,
	error,
});

export const getPollRecipient = id => dispatch => {
	dispatch(requestPollRecipient());
	return fetch(`/api/polls/${id}`)
		.then(res => res.json())
		.then(json => dispatch(successPollRecipient(json)))
		.catch(error => dispatch(errorPollRecipient(error)));
};

export const NAV_STATE_DASHBOARD = "NAV_STATE_DASHBOARD";
export const navStateDashboard = () => ({
	type: NAV_STATE_DASHBOARD,
});

export const NAV_STATE_CREATE = "NAV_STATE_CREATE";
export const navStateCreate = () => ({
	type: NAV_STATE_CREATE,
});

export const NAV_STATE_RECIPIENT = "NAV_STATE_RECIPIENT";
export const navStateRecipient = () => ({
	type: NAV_STATE_RECIPIENT,
});
