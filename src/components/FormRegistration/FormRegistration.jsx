import { Component } from 'react'
import css from './FormRegistration.module.css'

const INITIAL_STATE = {
	userName: '',
	userEmail: '',
	userPassword: '',
	useruserExperience: '',
	useruseruserPassword: '',
	useruserLicence: false
}

export class FormRegistration extends Component {
	state = { ...INITIAL_STATE }

	//! Скидання state в початкове значення INITIAL_STATE
	reset = () => {
		this.setState({ ...INITIAL_STATE })
	}

	handleSubmit = event => {
		event.preventDefault()
		const {
			userName,
			userEmail,
			userPassword,
			useruserExperience,
			useruseruserPassword
		} = this.state

		console.log(`Email: ${userEmail}, Password: ${userPassword}`)
		this.props.onSubmit({ ...this.state }) //! Тут відбувається виклик функції з AppComplexForm submitForm({ ...this.state })
		// form.reset();
		this.reset() //! очищуємо поля всіх інпутів
	}

	handleChange = event => {
		//! Деструктуризуємо:
		const { name, value } = event.currentTarget
		console.log('name:', name)

		console.log('value:', value)

		//! Використовуємо властивості об'єкта, що обчислюються
		//! Зберігаємо значення інпутів в state
		this.setState({
			[name]: value
		})
	}
	handleChangeCheckbox = event => {
		const { checked } = event.currentTarget
		console.log('checked: ', checked)
		this.setState({
			userLicence: checked
		})
	}
	render() {
		const { userName, userEmail, userPassword, userExperience, userAge, userLicence } = this.state

		console.log('----------------------------------------------')
		console.log('🛅 Значення userName:', userName)
		console.log('🛅 Значення userEmail:', userEmail)
		console.log('🛅 Значення userPassword:', userPassword)
		console.log('🛅 Значення userExperience: ', userExperience)
		console.log('🛅 Значення userAge: ', userAge)
		console.log('🛅 Значення userLicence: ', userLicence)

		console.log('______________________________________________')

		return (
			<form className={css.formRegistration} onSubmit={this.handleSubmit}>
				<label className={css.labelFormRegistration} htmlFor='userName'>
					Ім'я
				</label>
				<input
					className={css.inputFormRegistration}
					type='text'
					id='userName'
					name='userName'
					value={userName}
					placeholder="Ім'я"
					onChange={this.handleChange}
				/>

				<label className={css.labelFormRegistration} htmlFor='userEmail'>
					Логін:
				</label>
				<input
					className={css.inputFormRegistration}
					type='text'
					id='userEmail'
					name='userEmail'
					value={userEmail}
					placeholder='Email'
					onChange={this.handleChange}
				/>

				<label className={css.labelFormRegistration} htmlFor='userPassword'>
					Пароль:
				</label>
				<input
					className={css.inputFormRegistration}
					type='password'
					id='userPassword'
					name='userPassword'
					value={userPassword}
					placeholder='Пароль'
					onChange={this.handleChange}
				/>
				{/*//! + 4.4.5.Радіокнопки */}
				<label>
					Учень
					<input
						type='radio'
						name='userExperience'
						value='junior'
						checked={userExperience === 'junior'}
						onChange={this.handleChange}
					/>
				</label>

				<label>
					Майстер
					<input
						type='radio'
						name='userExperience'
						value='middle'
						checked={userExperience === 'middle'}
						onChange={this.handleChange}
					/>
				</label>

				<label>
					Гуру
					<input
						type='radio'
						name='userExperience'
						value='senior'
						checked={userExperience === 'senior'}
						onChange={this.handleChange}
					/>
				</label>

				{/*//! + 4.4.7.Селект */}
				<label>
					Ваш вік
					<select
						name='userAge'
						value={userAge}
						onChange={this.handleChange}
					>
						<option value='' disabled>...</option>
						<option value='18-25'>18-25</option>
						<option value='26-35'>26-35</option>
						<option value='36+'>36+</option>
					</select>
				</label>
				{/*//! + 4.4.6.Чекбокс */}
				<label>
					Згоден з умовами
					<input
						type="checkbox"
						name="userLicence"
						checked={userLicence}
						onChange={this.handleChangeCheckbox}
					/>
				</label>

				<button
					className={css.buttonFormRegistration}
					type='submit'
					disabled={!userLicence} //! блокування кнопки чекбоксом
				>
					Login
				</button>
			</form>
		)
	}
}
