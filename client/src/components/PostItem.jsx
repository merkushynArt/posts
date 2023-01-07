import React from 'react';
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
// Для того щоб дата була у нормальному вигляді
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
   if (!post) {
      return (
         <div className='text-xl text-center text-white py-10'>
            Загрузка...
         </div>
      );
   }

   return (
      <Link to={`/${post._id}`}>
         <div className='post flex flex-col basis-1/4 flex-grow'>

            <div className={post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
               {post.imgUrl && (
                  <img
                     src={`http://localhost:3002/${post.imgUrl}`}
                     alt='img'
                     className='object-cover w-full'
                  />
               )}
            </div>
            
            <div className='post-container'>
               <div className='post__info'>
                  <div>{ post.username }</div>
                  <div>
                     <Moment date={post.createdAt} format='D MMM YYYY' />
                  </div>
               </div>

               <div className='post__title'>{ post.title }</div>

               <p className='post__text line-clamp-3'>{ post.text }</p>

               <div className='post__calc'>
                  <button className='post__calc-item'>
                     <AiFillEye /> <span>{ post.views }</span>
                  </button>
                  <button className='post__calc-item'>
                     <AiOutlineMessage />{' '}
                     <span>{post.comments?.length || 0} </span>
                  </button>
               </div>
            </div>

         </div>
      </Link>
   )
}
