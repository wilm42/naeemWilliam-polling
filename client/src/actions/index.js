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
