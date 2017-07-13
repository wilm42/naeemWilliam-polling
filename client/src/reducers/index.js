import * as actions from '../actions';

const initialState = {
  allPolls:[
    {
      title: 'Vacation',
      question: 'Where should I go on vacation this year?',
      choices: [
        {
          text: 'The Bahamas',
          count: 8
        },
        {
          text: 'Hawaii',
          count: 10
        },
        {
          text: 'Rome',
          count: 14
        },
        {
          text: 'Prague',
          count: 7
        }
      ],
      date: '7/11/2017',
      totalVotes: 40
    },
    {
      title: 'Braves',
      question: 'Where should I go on vacation this year?',
      choices: [
        {
          text: 'The Bahamas',
          count: 8
        },
        {
          text: 'Hawaii',
          count: 10
        },
        {
          text: 'Rome',
          count: 14
        },
        {
          text: 'Prague',
          count: 7
        }
      ],
      date: '7/11/2017',
      totalVotes: 40
    }
  ],
  recipientHasSelected: false,
  recipientChoice: null,
  selectedPoll: 0,
  castVote: false
};

export const reducer = (state=initialState, action)=>{
  console.log('this is object', action);
  switch(action.type){
    
    case actions.REQUEST_GET_POLLS:
      return Object.assign({}, state, {
        loading: true,
        error:null
      });
    case actions.SUCCESS_GET_POLLS:
      return Object.assign({}, state, {
        loading:false,
        error:null,
        allPolls: action.response
      });
    case actions.ERROR_GET_POLLS:
      return Object.assign({}, state, {
        loading:false,
        error: action.error
      });
    case actions.SELECT_POLL:
      return Object.assign({}, state, {
        selectedPoll: action.index
      });
    case actions.CAST_VOTE:
      return Object.assign({}, state, {
        castVote: true
      });
    default:
      return state
  }
};