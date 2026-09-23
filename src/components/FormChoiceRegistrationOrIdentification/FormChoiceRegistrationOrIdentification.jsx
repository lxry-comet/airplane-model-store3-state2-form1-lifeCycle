// import React, { Component } from "react";
import css from "./FormChoiceRegistrationOrIdentification.module.css";


//? Підняття стану
//! Звичайний компонент
export function FormChoiceRegistrationOrIdentification({
	onClose
}) {

  return (
    <div className={css.registrationIdentificationBox}>
      <h2 className={css.titleRegistrationIdentification}>Шановний користувач,</h2>
      <h2 className={css.titleRegistrationIdentification}>для здійснення покупок</h2>
      <h2 className={css.titleRegistrationIdentification}>вам необхідно:</h2>
      <h2 className={`${css.titleRegistrationIdentification} ${css.titleRegistration}`}><u>пройти реєстрацію</u></h2>
      <h2 className={css.titleRegistrationIdentification}>та/або</h2>
      <h2 className={`${css.titleRegistrationIdentification} ${css.titleIdentification}`}><u>увійти до свого акаунту</u></h2>
      <div className={css.registrationIdentificationButtonBox}>
        
        <button
          className={`${css.buttonRegistrationIdentification} ${css.buttonRegistration}`}
          type="button"
					// onClick={(event) => onClose(event.currentTarget.textContent)}
					onClick={onClose}
				>
          Registration
        </button>

        <button
          className={`${css.buttonRegistrationIdentification} ${css.buttonLogin}`}
          type="button"
					// onClick={(event) => onClose(event.currentTarget.textContent)}
					onClick={onClose}
			 	>
          Login
        </button>
      
        <button
          className={`${css.buttonRegistrationIdentification} ${css.buttonCancel}`}
          type="button"
					onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  )
};
