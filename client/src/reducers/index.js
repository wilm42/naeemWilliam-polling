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
	selectedPoll: "",
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
		default:
			return state;
	}
};
