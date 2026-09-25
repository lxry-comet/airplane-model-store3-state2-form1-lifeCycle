import { Component } from 'react'
import css from './FormIdentification.module.css'

const INITIAL_STATE = {
	userEmail: '',
	userPassword: '',
	useruserLicence: false
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
		//? перевірка за userEmail порівнюючи userEmail з тим який в users
		//? Перебрати масив users знаходячи на кожній ітерації значення властивості кожного об'єкту (елементу) userEmail 
		//? та порівнювати її з змінною userEmail. Якщо відповідність знайдена перейти до іншого кроку (аутентифікація) 
		//? інакше дпти повідомлення: console.log(Користувач з таким E-mail: ${userEmail} відсутній☹️);

		const {users} = this.props
		console.log("🔸👨‍👩‍👦‍👦Users: ", users)
		const isEmail = users.some(user => user.userEmail === userEmail);
		console.log("📩Такий Email є в db?:", isEmail);

		if (!isEmail){
			alert(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
      console.log(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
			return;
		}
		//! Перевірка Пароля (Аутентифікація)
		//? Перевірка за userPassword порівнюючи userPassword який є в user
		const user = users.find(user => user.userEmail === userEmail)
		console.log("Знайли користувача за емейлом: ", user)
		
		if (user.userPassword !== userPassword){
			alert(`Введений неправильний пароль☹️☹️`);
      console.log(`Введений неправильний пароль☹️☹️`);
			return;
		} 
		alert(`Вітаю Вас, ${user.userName} 😊 \nІдентифікація/Аутентифікація пройдена ✅`);

		this.props.onAccountLogin({ ...this.state }) //! Тут відбувається виклик функції з AppComplexForm submitForm({ ...this.state })
		// form.reset();
		this.reset() //! очищуємо поля всіх інпутів
		this.props.onClose()
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
		const {onClose} = this.props
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
					type='email'
					id='userEmail'
					name='userEmail'
					value={userEmail}
					placeholder='Email'
					onChange={this.handleChange}
					required
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
					required
				/>
				{/*//! Кнопки Login та Cancel */}
				<div className={css.buttonBoxFormIdentification}>
					<button
						className={`${css.buttonFormIdentification} ${css.loginButton}`}
						type="submit"
						disabled={!userEmail || !userPassword} //! блокування кнопки 
					>
						Login
					</button>

					<button
						className={`${css.buttonFormIdentification} ${css.cancelButton}`}
						type="button"
						onClick={onClose}
					>
						Cancel
					</button>
				</div>

			</form>
		)
	}
}
