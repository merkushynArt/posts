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
            Пості немає.
         </div>
      )
   }

   return (
      <div className='max-w-[900px] mx-auto py-10'>
         <div className='flex justify-between gap-8'>

            <div className='flex flex-col gap-10 basis-4/5'>
               <PostItem/>
               <PostItem/>
            </div>

            <div className='basis-1/5'>
               <div className='text-xs uppercase text-white'>
                  Популярні пости:
               </div>
               {popularPosts?.map(
                     (post, idx) => (<PopularPosts key={idx} post={post} />)
                  )
               }
            </div>

         </div>
      </div>
   )
}
