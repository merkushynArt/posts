import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import { HiHome } from 'react-icons/hi';
import { BiUserPin, BiLogIn, BiLogOut } from 'react-icons/bi';
import { MdOutlineAddCircle } from "react-icons/md";


export const NavBar = () => {
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();

   const activeStyles = {
      color: "rgb(0, 0, 0)",
   }

   const logoutHandler = () => {
      dispatch(logout());
      window.localStorage.removeItem('token');
      toast('Ви вийшли із системи');
   }

   return (
      <div className='navbar'>
         <div className='navbar__container'>

            <span className='navbar__avatar'>
               A
            </span>

            { isAuth && (
               <ul className='navbar__list'>
                  <li>
                     <NavLink
                        to={'/'}
                        href='/'
                        className='navbar__list-item'
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                     >
                        <HiHome style={{fontSize : '24px'}}/>
                        Головна
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to={'/posts'}
                        href='/'
                        className='navbar__list-item'
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                     >
                        <BiUserPin style={{fontSize : '24px'}}/>
                        Мої пости
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to={'/new'}
                        href='/'
                        className='navbar__list-item'
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                     >
                        <MdOutlineAddCircle style={{fontSize : '24px'}}/>
                        Добавити пост
                     </NavLink>
                  </li>
               </ul>
            )}

            <div className='authblock__container'>
               {isAuth ? (<button className='authblock' onClick={logoutHandler}><BiLogOut style={{fontSize : '24px'}}/> Вийти</button>) : (<Link className='authblock' to={'/login'}><BiLogIn style={{fontSize : '24px'}}/> Увійти </Link>)}
            </div>

         </div>
      </div>
   )
}
