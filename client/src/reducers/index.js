import * as actions from '../actions';

const initialState = {
  title: 'Vacation',
  question: 'Where should I go on vacation this year?',
  answers: [
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
  createdDate: '7/11/2017',
  totalVotes: 40,
  recipientHasSelected: false,
  recipientChoice: null
};

export const reducer = (state=initialState, action)=>{
  console.log(action);
  switch(action.type){
    case actions.RECIPIENT_MAKE_SELECTION:
      let updatedAnswers = state.answers;
      updatedAnswers[action.selectionIndex].count = updatedAnswers[action.selectionIndex].count + 1
      return Object.assign({}, state, {
        totalVotes: state.totalVotes + 1,
        recipientHasSelected: true,
        recipientChoice: action.selectionIndex,
        answers: updatedAnswers
      });
    default:
      return state
  }
};