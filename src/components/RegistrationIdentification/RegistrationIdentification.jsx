import React, { Component } from 'react'
import css from './RegistrationIdentification.module.css'

export function RegistrationIdentification({ activeUser }) {

	console.log('----------------------------------------------')
	console.log("activeUser:", activeUser)
	console.log('______________________________________________')

	return (
		<div className={css.boxRegistrationIdentification}>
			{activeUser 
				? 
				<h2 className={css.titleRegistrationIdentification}>Вітаю вас, <span className={css.titleUserRegistrationIdentification}>{activeUser.userName}</span></h2>
				:
				<h2 className={`${css.titleRegistrationIdentification} ${css.titleReminderRegistrationIdentification}`}>
          <i>Для здійснення покупок необхідно увійти до свого акаунту ⇒</i>
        </h2>
			}
			
			<div className={css.buttonBoxRegistrationIdentification}>
				{!activeUser &&
					<>
						<button
							className={`${css.buttonRegistrationIdentification} ${css.buttonRegistration}`}
							type='button'
						>
							Registration
						</button>

						<button
							className={`${css.buttonRegistrationIdentification} ${css.buttonLogin}`}
							type='button'
						>
							Login
						</button>
					</>
				}

				{activeUser &&
					<button
						className={`${css.buttonRegistrationIdentification} ${css.buttonSignOut}`}
						type='button'>
						SignOut
					</button>
				}
			</div>
		</div>
	)
}
