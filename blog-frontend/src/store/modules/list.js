import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

//action types
const GET_POST_LIST = 'list/GET_POST_API';

// action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta); 
// createAction을 하면 파라미터로 전달 받은 값을 객체 않에 넣는 것을 자동화 해준다
// ex) getPostList({ page, tag });
// export const getPostList = (page, tag) => ({
//   type: 'GET_POST_LIST',
//   page,
//   tag
// });

// initial state
const initialState = Map({
  posts: List(),
  lastPage: null
});

// reducer
export default handleActions({
  ...pender({
    type: GET_POST_LIST,
    onSuccess: (state, action) => {
      const { data: posts } = action.payload;

      const lastPage = action.payload.headers['last-page'];
      return state.set('posts', fromJS(posts))
                  .set('lastPage', parseInt(lastPage, 10));
    }
  })    
}, initialState);