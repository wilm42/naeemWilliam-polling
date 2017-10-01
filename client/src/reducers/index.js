import * as actions from "../actions";

const initialState = {
	db: null,
	auth: null,
	user: false,
	allPolls: [
		{
			id: null,
			title: "",
			question: "",
			choices: [
				{
					text: "",
					count: null,
				},
			],
			date: null,
			totalVotes: null,
		},
	],
	recipientHasSelected: false,
	recipientChoice: null,
	selectedPoll: 0,
	recipient: {
		choices: [],
	},
	navState: {
		text: "+ New Poll",
		link: "/create",
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.INITIALIZE_FIREBASE:
			return Object.assign({}, state, {
				db: action.firedb,
				auth: action.fireauth,
			});
		case actions.USER_VALIDATED:
			return Object.assign({}, state, {
				user: true,
			});
		case actions.SELECT_POLL:
			const selectedPoll = `/${action.userId}/${action.pollId}`;
			return Object.assign({}, state, {
				selectedPoll: selectedPoll,
			});
		case actions.REQUEST_GET_POLLS:
			return Object.assign({}, state, {
				loading: true,
				error: null,
			});
		case actions.SUCCESS_GET_POLLS:
			return Object.assign({}, state, {
				loading: false,
				error: null,
				allPolls: action.response,
			});
		case actions.ERROR_GET_POLLS:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});
		case actions.CAST_VOTE:
			return Object.assign({}, state, {
				castVote: true,
			});
		case actions.REQUEST_POLL_RECIPIENT:
			return Object.assign({}, state, {
				loading: true,
				error: null,
			});
		case actions.ERROR_POLL_RECIPIENT:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});
		case actions.SUCCESS_POLL_RECIPIENT:
			console.log("setting response to state.recipient");
			return Object.assign({}, state, {
				recipient: action.response,
			});
		case actions.NAV_STATE_DASHBOARD:
			return Object.assign({}, state, {
				navState: {
					link: "/create",
					text: "+ Create New Poll",
				},
			});
		case actions.NAV_STATE_CREATE:
			return Object.assign({}, state, {
				navState: {
					link: "/",
					text: "Dashboard",
				},
			});
		case actions.NAV_STATE_RECIPIENT:
			return Object.assign({}, state, {
				navState: {
					link: "/create",
					text: "+ Create Your Own Poll",
				},
			});
		default:
			return state;
	}
};
