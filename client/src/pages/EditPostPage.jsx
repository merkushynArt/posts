import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../redux/features/post/postSlice.js';
import axios from '../utils/axios.js';
import TextareaAutosize from 'react-textarea-autosize';

export const EditPostPage = () => {
   const [title, setTitle] = useState('');
   const [text, setText] = useState('');
   const [oldImage, setOldImage] = useState('');
   const [newImage, setNewImage] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
      setOldImage(data.imgUrl);
   }, [params.id]);

   const submitHandler = () => {
      try {
         const updatedPost = new FormData();
         updatedPost.append('title', title);
         updatedPost.append('text', text);
         updatedPost.append('id', params.id);
         updatedPost.append('image', newImage);
         dispatch(updatePost(updatedPost));
         navigate('/posts');
      } catch (error) {
         console.log(error);
      }
   }

   const clearFormHandler = () => {
      setTitle('');
      setText('');
   }

   useEffect(() => {
      fetchPost();
   }, [fetchPost]);

   return (
      <form
         className='add-post'
         onSubmit={(e) => e.preventDefault()}
      >
         <label className='add-post__image'>
            Прикріпити зображення:
            <input
               type='file'
               className='hidden'
               onChange={(e) => {
                  setNewImage(e.target.files[0]);
                  setOldImage('');
               }}
            />
         </label>

         <div className='flex object-cover py-2'>
            {oldImage && (
               <img
                  src={`http://localhost:3002/${oldImage}`}
                  alt={oldImage.name}
               />
            )}
            {newImage && (
               <img
                  src={URL.createObjectURL(newImage)}
                  alt={newImage.name}
               />
            )}
         </div>

         <label className='add-post__title'>
            Назва посту:
            <input
               type='text'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder='Назва посту'
            />
         </label>

         <label className='add-post__text'>
            Текст посту:
            <TextareaAutosize
               cacheMeasurements
               onChange={(e) => setText(e.target.value)}
               value={text}
               placeholder='Текст посту'
            />
         </label>

         <div className='post__btns'>
            <button
               onClick={submitHandler}
               className='btn-ok'
            >
               Оновити
            </button>
            <button
               onClick={clearFormHandler}
               className='btn-cancel'
            >
               Відмінити
            </button>
         </div>

      </form>
   );
}