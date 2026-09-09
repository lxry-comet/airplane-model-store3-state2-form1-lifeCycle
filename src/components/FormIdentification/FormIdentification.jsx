import { Component } from 'react'
import css from './FormIdentification.module.css'

const INITIAL_STATE = {
	userEmail: '',
	userPassword: '',
}

export class FormIdentification extends Component {
	state = { ...INITIAL_STATE }

	//! Скидання state в початкове значення INITIAL_STATE
	reset = () => {
		this.setState({ ...INITIAL_STATE })
	}

	handleSubmit = event => {
		event.preventDefault()
		const {
			userEmail,
			userPassword,
		} = this.state
		console.log(`✉️E-mail: ${userEmail},🈳Password: ${userPassword}`);

		
		//! Перевірка на наявність userEmail (Ідентифікація)
		const {users} = this.props
		console.log("Users: ", users)

		
		//? перевірка за userEmail порівнюючи userEmail з тим який в users

		//? Перебрати масив users знаходячи на кожній ітерації значення властивості кожного об'єкту (елементу) userEmail та порівнювати її з змінною userEmail. Якщо відповідність знайдена перейти до іншого кроку (аутентифікація) інакше дпти повідомлення: console.log(Користувач з таким E-mail: ${userEmail} відсутній☹️);
		
		//this.props.onSubmit({ ...this.state }) //! Тут відбувається виклик функції з AppComplexForm submitForm({ ...this.state })
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
		const { userEmail, userPassword } = this.state

		console.log('----------------------------------------------')
		console.log('🛅 Значення userEmail:', userEmail)
		console.log('🛅 Значення userPassword:', userPassword)

		console.log('______________________________________________')

		return (
			<form className={css.formIdentification} onSubmit={this.handleSubmit}>
				<h2 className={css.titleFormIdentification}>Ідентифікація/Аутентифікація</h2>
				<label className={css.labelFormIdentification} htmlFor='userEmail'>
					Логін:
				</label>
				<input
					className={css.inputFormIdentification}
					type='text'
					id='userEmail'
					name='userEmail'
					value={userEmail}
					placeholder='Email'
					onChange={this.handleChange}
				/>

				<label className={css.labelFormIdentification} htmlFor='userPassword'>
					Пароль:
				</label>
				<input
					className={css.inputFormIdentification}
					type='password'
					id='userPassword'
					name='userPassword'
					value={userPassword}
					placeholder='Пароль'
					onChange={this.handleChange}
				/>
				{/*//! Кнопки Login та Cancel */}
				<div className={css.buttonBoxFormIdentification}>
					<button
						className={`${css.buttonFormIdentification} ${css.loginButton}`}
						type="submit"

					>
						Login
					</button>

					<button
						className={`${css.buttonFormIdentification} ${css.cancelButton}`}
						type="button"

					>
						Cancel
					</button>
				</div>

			</form>
		)
	}
}
