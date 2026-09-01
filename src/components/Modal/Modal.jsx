//! 3. Модальне вікно(componentDidMount та componentWillUnmount)
//! 3.1.Проблема z - index, як вирішувати без милиць(портали)
//! 3.2.Слухач на keydown для Escape
//! 3.3.Слухач на клік по Backdrop

import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import css from "./Modal.module.css";

const modalRoot =   
 document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('1️⃣❗️❗️.Modal componentDidMount');

    //!: ❌ Для закриття модаки клавішею ESC -
    window.addEventListener('keydown', event => {
        console.log("event.code:", event.code);
        if (event.code === 'Escape') {
          console.log("Натиснули ❌ESC, потрібно закрити модалку");
          this.props.onClose();
        };
    });
  };

  
  componentDidUpdate(prevProps, prevState) {
    console.log("2️⃣❗️❗️.Modal componentDidUpdate");
  };


  componentWillUnmount() {
    console.log('3️⃣❗️❗️.Modal componentWillUnmount');
  };


  render() {
    console.log("0️⃣❗️❗️.Modal render");

    const {
      // title, 
      children,
      onClose
    }=this.props

    // console.log('Title: ', title)
    console.log('Children: ', children)
    // console.log('showModal: ', showModal)

    // return ( 
       
    //   <div className={css.modalBackdrop}>
    //     {/* <div className={css.modalContent} ><h1>Це контент модалки -1 </h1></div> */}    
    //         <div className={css.modalContent} >
    //           {children}
    //         </div> 
    //   </div>
    // );
  return createPortal(  
      <div className={css.modalBackdrop} >
        <div className={css.modalContent} >{children}</div>
      </div>,
      modalRoot,
    );
  };
};
