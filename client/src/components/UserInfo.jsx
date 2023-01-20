import React from 'react';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
   const { user } = useSelector((state) => state.auth);
   return (
      <div className='user-info'>
         <div className="user-info__avatar">
            <img src="" alt="avatar" />
         </div>
         <div className='user-info__text'>
            <div>{user.username}</div>
         </div>
      </div>
   );
}
