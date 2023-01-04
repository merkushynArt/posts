import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
   comments: [],
   loading: false,
}

export const createComment = createAsyncThunk(
   'comment/createComment',
   async ({ postId, comment }) => {
      try {
         const { data } = await axios.post(`/comments/${postId}`, {
               postId,
               comment,
         });
         return data;
      } catch (error) {
         console.log(error);
      }
   },
)

export const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {},
   extraReducers: {
      // ССтворення посту
      [createComment.pending]: (state) => {
         state.loading = true;
      },
      [createComment.fulfilled]: (state, action) => {
         state.loading = false;
         state.comments.push(action.payload);
      },
      [createComment.rejected]: (state) => {
         state.loading = false;
      },
   },
});

export default commentSlice.reducer;