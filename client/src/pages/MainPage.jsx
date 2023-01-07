import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopularPosts } from '../components/PopularPosts.jsx';
import { PostItem } from '../components/PostItem.jsx';
import { getAllPosts } from '../redux/features/post/postSlice.js';

export const MainPage = () => {
   const dispatch = useDispatch();
   const { posts, popularPosts } = useSelector((state) => state.post);

   useEffect(() => {
      dispatch(getAllPosts());
   }, [dispatch]);

   if (!posts.length) {
      return (
         <div className='text-xl text-center text-white py-10'>
            Постів немає.
         </div>
      )
   }

   return (
      <div className='main'>           
         <div className='posts-container'>
            {posts?.map((post, idx) => (<PostItem key={idx} post={post} />))}
         </div>

         <div className='posts-popular'>
            <div className='text-xs uppercase'>
               Популярні пости:
            </div>
            {popularPosts?.map(
               (post, idx) => (<PopularPosts key={idx} post={post} />)
            )}
         </div>

      </div>
   )
}
