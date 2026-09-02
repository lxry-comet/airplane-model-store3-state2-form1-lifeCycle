import React, { Component } from 'react'
import css from './RegistrationIdentification.module.css'

export function RegistrationIdentification() {
	// const {} = this.props
	// const { } = this.state

	console.log('----------------------------------------------')

	console.log('______________________________________________')

	return (
		<div className={css.boxRegistrationIdentification}>
			<h3 className={css.titleRegistrationIdentification}>
				Для здійснення покупок необхідно увійти до свого аккаунту ⇒
			</h3>
			<div className={css.buttonBoxRegistrationIdentification}>
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
				<button
					className={`${css.buttonRegistrationIdentification} ${css.buttonSignOut}`}
					type='button'
				>
					SignOut
				</button>
			</div>
		</div>
	)
}
