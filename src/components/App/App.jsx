//! Перерендер компонентів відбувається у двох випадках:
//! 1.Коли до них приходять нові props ✅
//! 2.Коли змінюється state ✅

//* import '../../App.css'
import '@/App.css'
// import planes from '../../json/planes.json'

import aircrafts from '@/json/aircrafts.json'
// import planes from '@/json/planes.json'
// import helicopters from '@/json/helicopters.json'

import React, { Component } from 'react'

// import PlanesList from '../PlanesList/PlanesList.jsx'
import { Filter } from '@/components/Filter/Filter.jsx'
import PlanesList from '@/components/PlanesList/PlanesList.jsx'
// import Section from '../Section/Section.jsx'
import Section from '@/components/Section/Section.jsx'
import { Sorter } from '@/components/Sorter/Sorter.jsx'
import {ScaleSelection} from '@/components/ScaleSelection/ScaleSelection.jsx'
import css from './App.module.css'
import { id } from 'date-fns/locale'
import { CgOpenCollective } from 'react-icons/cg'
import {RegistrationIdentification}  from "@/components/RegistrationIdentification/RegistrationIdentification.jsx"
import debounce from 'lodash.debounce'

//! Приклад початкового сортування на ім'я (за полем name.brief)

const aircrafts2 = aircrafts //! Це не окрема копія, це копія за посиланям

// const aircrafts2 = [...aircrafts]; //! Це окрема копія
aircrafts2.sort((a, b) => a.name.brief.localeCompare(b.name.brief))

// aircrafts.sort((a, b) =>
//     a.name.brief.localeCompare(b.name.brief)
// );
console.log('🎯aircrafts', aircrafts)
console.log('🎯aircrafts2', aircrafts2)
//! Приклад початкового сортування за роком створення (за полем info.year)
// aircrafts2.sort((a, b) => a.info.year - b.info.year);

//! Сортування, в якому моделі, яких немає в наявності знаходяться в кінці списку
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++')

//! 1) відокремити "білих"(є в наявночті) від "чорних" (немає в наявності),
//! 2) Білі скласти на початку, а чорні в кінець

const white = aircrafts.filter(aircraft => aircraft.model.actualImages)
const black = aircrafts.filter(aircraft => !aircraft.model.actualImages)

console.log('white', white)
console.log('black', black)

const aircraftsNew = [...white, ...black]
console.log('⚡aircraftsNew', aircraftsNew)
// aircrafts.splice(0, aircrafts.length);
//? або
aircrafts.length = 0
aircrafts.push(...aircraftsNew)
console.log('⚡aircrafts', aircrafts)

console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++')

export class App extends Component {
	// ! План створення кошику:
	// * [1] Отримати реакцію на кнопку "Додати до кошику" (onClick)
	// * [2] Стврити в стейті масив індексів обраних елементів
	// * [3] З-за допомогою реакції на кнопку наповнювати масив індексів обраних елементів
	// * [4] Створити масив обраних елементів згідно з масиву індексів
	//  [5] Створити кнопку КОШИК
	// ? [5.1] Стилізувати кнопку КОШИК згідно з дизайном
	// * [6] При натисканы на кнопку кошиу, відбувається рендер масиву обраних елементів

	state = {
		aircraftsArray: aircrafts,

		aircraftTitle: 'Магазин моделей літаків та вертольотів',
		activeButton: 'allButton',
		bgColor: 'white',
		aircraftId: null, //! "id" обраного елемента
		// indicesSelectedModels: [] //! масив індексів обраних моделей
		indicesSelectedModels:
			JSON.parse(localStorage.getItem('indicesSelectedModels')) || [],

		inputSearchValue: '', //! значення inputSearch
		radioButtonValue: 'brief', //! значення радіо-кнопки
		aircraftsArrAfterFiltration: aircrafts, //! дубльоване значення aircraftsArr після фільтрації
		modelsSelectedScale: aircrafts //! масив моделей обраного масштабу
	}

	// * 2 При першому завантажені якщо нічого не має  у властивість стейту, то створюємо пустий масив який записуємо у LocalStorage
	componentDidMount() {
		console.log('Спрацював componentDidMount')
		const saved = localStorage.getItem('indicesSelectedModels')
		if (!saved) {
			localStorage.setItem('indicesSelectedModels', JSON.stringify([]))
		}
	}

	// * 3 При будь яких змінах властивості selectedButtonIdx, записуємо selectedButtonIdx у LocalStorage

	componentDidUpdate(prevProps, prevState) {
		console.log('Спрацював componentDidUpdate')

		if (prevState.indicesSelectedModels !== this.state.indicesSelectedModels) {
			localStorage.setItem(
				'indicesSelectedModels',
				JSON.stringify(this.state.indicesSelectedModels)
			)
		}
	}

	allFiltration = () => {
		console.log('all')

		this.setState({
			inputSearchValue: '',

			aircraftsArray:  this.state.modelsSelectedScale,
			aircraftsArrAfterFiltration:  this.state.modelsSelectedScale,
			aircraftTitle: 'Магазин моделей літаків та вертольотів',
			activeButton: 'allButton',
			bgColor: 'lightgreen',
			radioButtonValue: 'brief'
		})
		console.log('aircrafts', aircrafts)
	}
	planeFiltration = () => {
		console.log('planeFiltration')

		// const planesArray = aircrafts.filter(item => item.aircraftType === 'plane')
		const planesArray = this.state.modelsSelectedScale.filter(item => item.aircraftType === 'plane')

		console.log('planesArray', planesArray)

		this.setState({
			inputSearchValue: '',

			aircraftsArray: planesArray,
			aircraftsArrAfterFiltration: planesArray,

			aircraftTitle: 'Магазин моделей літаків',
			activeButton: 'planeButton',
			bgColor: 'lightgreen',
			radioButtonValue: 'brief'
		})
	}
	biplaneFiltration = () => {
		console.log('biplaneFiltration')

		const biplanesArray =  this.state.modelsSelectedScale.filter(
			item => item.aircraftType === 'biplane'
		)

		console.log('biplanesArray', biplanesArray)

		this.setState({
			inputSearchValue: '',

			aircraftsArray: biplanesArray,
			aircraftsArrAfterFiltration: biplanesArray,

			aircraftTitle: 'Магазин моделей біпланів',
			activeButton: 'biplaneButton',
			bgColor: 'lightgreen',
			radioButtonValue: 'brief'
		})
	}
	helicopterFiltration = () => {
		console.log('helicopterFiltration')
		const helicopterArray =  this.state.modelsSelectedScale.filter(
			item => item.aircraftType === 'helicopter'
		)

		console.log('helicopterArray', helicopterArray)

		this.setState({
			inputSearchValue: '',

			aircraftsArray: helicopterArray,
			aircraftsArrAfterFiltration: helicopterArray,

			aircraftTitle: 'Магазин моделей вертольотів',
			activeButton: 'helicopterButton',
			bgColor: 'lightgreen',
			radioButtonValue: 'brief'
		})
	}
	cartFiltration = () => {
		const selectedModels = this.state.indicesSelectedModels.flatMap(id =>
			aircrafts.filter(element => element.id === id)
		)

		//? Коли натиснута кнопка кошик, aircraftsArray треба замінити з aircrafts на selectedModels
		//? А коли вона не активна то в aircraftsArray кладемо значення яке вираховується кожною кнопкою фільтрів (окрім)

		console.log('Кошик')
		// console.log('Selected Models: ', selectedModels);
		//* Коли натиснута кнопка кошик, початковий масив для пошуку з інпутом є selectedModels
		this.setState({
			aircraftsArray: selectedModels,
			inputSearchValue: '',
			aircraftTitle: 'Кошик',
			activeButton: 'cartButton',
			bgColor: '#ff991c91',
			aircraftsArrAfterFiltration: this.state.indicesSelectedModels.flatMap(
				id => aircrafts.filter(element => element.id === id)
			),
			radioButtonValue: 'brief'
		})
	}
	getActiveId = id => {
		this.setState({
			aircraftId: id
		})
		if (this.state.indicesSelectedModels.includes(id)) {
			//! 1 Масив this.state.indicesSelectedModels
			//! 2 Індекс - id
			//! 3 З масиву this.state.indicesSelectedModels потрібно видалити елемент з 	індексом який дорівнює id
			//activeButtonid: id, //! це буде останній активний елемент.
			this.setState({
				indicesSelectedModels: this.state.indicesSelectedModels.filter(
					item => item !== id
				)
			})
		} else {
			//! 1 Масив this.state.indicesSelectedModels
			//! 2 Індекс - id
			//! 3 З масиву this.state.indicesSelectedModels потрібно додати елемент з індексом який дорівнює id

			//? Створюємо новий масив, у який копіюмо всі елементи зі старого масиву та додаємо до них новий елемент
			this.setState({
				// activeButtonid: id,
				indicesSelectedModels: this.state.indicesSelectedModels
					.concat(id)
					.sort((a, b) => a - b)
			})
		}
	}

	debouncedSearch = debounce(text => {
		console.log('⏰debounce_text', text)
		this.performSearch(text)
	}, 1500)
	handleChangeInputSearchValue = event => {
		const value = event.target.value
		console.log('0️⃣ value: ', value)
		//! _____________Логіка фільтрації___________

		//! Початкові данні: aircrafts та значення input value

		//! Потрібно: перебрати масив aircrafts та на кожній ітерації порівняти input value та властивістю name.brief кожного елементу масиву

		//! Якщо знайдений збіг, то цей елемент додається в окремий масив, який після закінчення ітерації aircrafts буде рендеритись замість PlanesList

		// ! Після оновлення інпуту використати aircraftsArrAfterFiltration

		//* Перерендер плейнлісту має відбутись тоді коли змінюється стан selectedModels. Для цього треба змінити indicesSelectedModels

		//? Фігуранти (вхідні данні) нашої задачі:
		//* aircraftsArrAfterFiltration
		//* item.name.brief, item.name.nickname, item.info.countries, item.info.year - залежить від значення стейту radioButtonValue

		//! radioButtonValue = 'brief' то беремо "item.name.brief"
		//! radioButtonValue = 'nickname' то беремо "item.name.nickname"
		//! radioButtonValue = 'countries' то беремо "item.info.countries"
		//! radioButtonValue = 'year' то беремо "item.info.year"

		//* Значення інпуту: value

		//! пошук за ім'ям
		// const findBrief = this.state.aircraftsArrAfterFiltration.filter(
		// 	item => item.name.brief.toLowerCase()
		// 	.startsWith(value.toLowerCase().trim())
		// );
		// //! пошук за призвищем
		// 	const findNickName = this.state.aircraftsArrAfterFiltration.filter(
		// 	item => item.name.nickname.toLowerCase()
		// 	.includes(value.toLowerCase().trim())
		// );
		// //! країна виробник
		// 	const findCountry = this.state.aircraftsArrAfterFiltration.filter(
		// 	item => item.info.countries.some(country => country.toLowerCase().startsWith(value.toLowerCase().trim()))
		// );
		// //! рік випуску
		// 	const findYear = this.state.aircraftsArrAfterFiltration.filter(
		// 	item => String(item.info.year).startsWith(value.trim())
		// );
		// // console.log("⚡searchInputList: ", searchInputList)

		// let result = []

		// switch (this.state.radioButtonValue) {
		// 	case 'brief':
		// 		result = findBrief
		// 		break
		// 	case 'nickname':
		// 		result = findNickName
		// 		break
		// 	case 'country':
		// 		result = findCountry
		// 		break
		// 	case 'year':
		// 		result = findYear
		// 		break
		// 	default:
		// 		result = ''
		// 		break
		// }
		//! _________________________________________

		// console.log("☺️result: ", result)
		this.setState({
			// aircraftsArray: result, 	//!Логіка фільтрації
			inputSearchValue: value
			// indicesSelectedModels:
		})
		this.debouncedSearch(value)
	}
	performSearch = textInput => {
		//! пошук за ім'ям
		const findBrief = this.state.aircraftsArrAfterFiltration.filter(item =>
			item.name.brief.toLowerCase().startsWith(textInput.toLowerCase().trim())
		)
		//! пошук за призвищем
		const findNickName = this.state.aircraftsArrAfterFiltration.filter(item =>
			item.name.nickname.toLowerCase().includes(textInput.toLowerCase().trim())
		)
		//! країна виробник
		const findCountry = this.state.aircraftsArrAfterFiltration.filter(item =>
			item.info.countries.some(country =>
				country.toLowerCase().startsWith(textInput.toLowerCase().trim())
			)
		)
		//! рік випуску
		const findYear = this.state.aircraftsArrAfterFiltration.filter(item =>
			String(item.info.year).startsWith(textInput.trim())
		)
		// console.log("⚡searchInputList: ", searchInputList)

		let result = []

		switch (this.state.radioButtonValue) {
			case 'brief':
				result = findBrief
				break
			case 'nickname':
				result = findNickName
				break
			case 'country':
				result = findCountry
				break
			case 'year':
				result = findYear
				break
			default:
				result = ''
				break
		}
		console.log('☺️result: ', result)
		this.setState({
			aircraftsArray: result
			// indicesSelectedModels:
		})
	}
	getRadioButtonValue = value => {
		this.setState({
			radioButtonValue: value,
			inputSearchValue: '',
			aircraftsArray: this.state.aircraftsArrAfterFiltration
		})
	}
	getModelsSelectedScale = modelsScale => {
		console.log("📗Масив моделей обраного масштабу :", modelsScale);
		// this.setState({
		// 	modelsSelectedScale: modelsScale,
		// 	aircraftsArray: modelsScale.filter(item => item.aircraftType === 'plane'),
		// 	aircraftsArrAfterFiltration: modelsScale.filter(item => item.aircraftType === 'plane')
		// })
	//! Аналізувати натиснуту кнопку фільтрів.  

	
	console.log("🌐 Кнопка фільтра: ", this.state.activeButton)
	//! В залежості від значення this.state.activeButton, створюємо 4 різних зеачення aircraftsArray Ta aircraftsArrayAfterFiltration
	let result = []; //? масив
	switch(this.state.activeButton){
		case 'allButton':
			result = modelsScale;
			break;
		case 'planeButton':
			result = modelsScale.filter(item => item.aircraftType === 'plane')
			break;
		case 'biplaneButton':
			result = modelsScale.filter(item => item.aircraftType === 'biplane')
			break;
		case 'helicopterButton':
			result = modelsScale.filter(item => item.aircraftType === 'helicopter')
			break;	
		default:
			result = [];
		}
		this.setState({
			modelsSelectedScale: modelsScale,
			aircraftsArray: result,
			aircraftsArrAfterFiltration: result
		})
	}
	// escapeRegExp = str => {
	// 	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	// }

	// highlightTextProtection = (text, keyword) => {
	// 	if (!keyword) return text

	// 	const escapedKeyword = this.escapeRegExp(keyword)

	// 	const regex = new RegExp(`(${escapedKeyword})`, 'gi')

	// 	return text.split(regex).map((part, index) =>
	// 		part.toLowerCase() === keyword.toLowerCase() ? (
	// 			<span key={index} className={css.highlight}>
	// 				{part}
	// 			</span>
	// 		) : (
	// 			part
	// 		)
	// 	)
	// }

	//* Для того щоб функція getActiveId, впливала (перерендирила його) на компонент planesList треба, щоб змінилися пропси які безпосередньо впливать на рендер цього компоненту

	render() {
		//! [1] Блок диструктуризації props та state
		const {
			aircraftsArray, // aircrafts,
			aircraftTitle, // 'Магазин моделей літаків та вертольотів',
			activeButton, // 'allButton',
			bgColor, // 'white',
			aircraftId, // "id" обраного елемента
			indicesSelectedModels, // масив індексів обраних моделей
			inputSearchValue, // значення inputSearch
			aircraftsArrAfterFiltration,
			radioButtonValue,
			modelsSelectedScale
		} = this.state

		//! [2] Блок обчислювальних дaних
		//* Кількість обраних моделей
		const numberOfSelectedModels = indicesSelectedModels.length

		//* логіка пошуку літаків згідно даних з інпуту
		// const searchInputList = aircrafts.filter(
		// 	item => item.name.brief.toLowerCase()
		// 	.startsWith(inputSearchValue.toLowerCase().trim())
		// );

		//! Кількість типів ЛА
		const totalTypes = aircraftsArray.length
		//! Загальна кількість моделей ЛА
		// 		const numberOfModelsArray =  aircraftsArray.map(item => Object.values(item.model.colorsPrice).filter(element => element > 0).length);

		// 		const numberOfModels = numberOfModelsArray.reduce((previousValue, number) => {
		//     return previousValue + number;
		// }, 0);
		const numberOfModels = aircraftsArray
			.map(
				item =>
					Object.values(item.model.colorsPrice).filter(element => element > 0)
						.length
			)
			.reduce((previousValue, number) => {
				return previousValue + number
			}, 0)

		const selectedModels = indicesSelectedModels.flatMap(id =>
			aircrafts.filter(element => element.id === id)
		)

		const totalModels = selectedModels
			.map(
				item =>
					Object.values(item.model.colorsPrice).filter(element => element > 0)
						.length
			)
			.reduce((previousValue, number) => {
				return previousValue + number
			}, 0)

		//! [3] Блок консолей необхідних даних
		console.log('AircraftsArray: ', aircraftsArray)
		console.log('🆔 aircraftId State: ', aircraftId)
		console.log('Ⓜ️ Indices Selected Models: ', indicesSelectedModels)
		console.log('Selected Models: ', selectedModels)

		console.log('Кількість обраних моделей: ', numberOfSelectedModels)

		console.log('0️⃣Кількість типів ЛА: ', totalTypes)

		// console.log('Масив загальних кількостей моделей ЛА: ', numberOfModelsArray );
		console.log('Загальних кількостей моделей ЛА: ', numberOfModels)

		console.log('0️⃣Загальна кількість моделей в кошику: ', totalModels)
		console.log('Значення inputSearch: ', inputSearchValue)

		// console.log("⚡⚡⚡searchInputList: ", searchInputList)

		console.log(
			'🎯⚡✅aircraftsArrAfterFiltration: ',
			aircraftsArrAfterFiltration
		)

		console.log('radioButtonValue (✅Sort): ', radioButtonValue)

		console.log("🔸🔸🔸modelsSelectedScale: ", modelsSelectedScale)
		return (
			<>
			{/*//!  Реєстрація та Ідентифікація/Аутентифікація (Login) користувача */}
        <RegistrationIdentification
          onClose={this.toggleModal} //! відкриття/
        />

				<ScaleSelection
					aircrafts={aircrafts}
					onGetModelsSelectedScale={this.getModelsSelectedScale}
					isCartButtonOn={activeButton}
				/>
				<Filter
					onAll={this.allFiltration}
					onPlanes={this.planeFiltration}
					onBiplanes={this.biplaneFiltration}
					onHelicopters={this.helicopterFiltration}
					buttonActive={activeButton}
					onCart={this.cartFiltration}
					numberOfSelectedModels={numberOfSelectedModels}
				/>
				<Sorter
					inputSearch={inputSearchValue}
					onHandleChangeInputSearchValue={this.handleChangeInputSearchValue}
					onGetRadioButtonValue={this.getRadioButtonValue}
					radioButtonValueApp={radioButtonValue}
				/>

				<Section
					bgColor={this.state.bgColor}
					title={this.state.aircraftTitle}
					allTypes={totalTypes} //! кількість типів ЛА
					numberOfModels={numberOfModels} //! загальна кількість моделей ЛА
					numberOfSelectedModels={numberOfSelectedModels}
					totalModels={totalModels}
				>
					<PlanesList
						// items={this.state.aircraftsArray}

						// items={aircraftTitle === 'Кошик'
						// 	? selectedModels
						// 	: aircraftsArray
						// }

						// itemsCart={this.state.indicesSelectedModels.flatMap((id) => aircrafts.filter((element) => element.id === id))}

						// ! перевірити кількість обраних моделей в  numberOfSelectedModels, якщо він === 0 то title === "Кошик пустий" і ul не ренберемо, а якщо numberOfSelectedModels є хочаб 1 обрана модель то тоді title === "Кошик" і ul ренберемо

						items={	
							aircraftTitle === 'Кошик'
								? selectedModels //! Чи можна так робити?
								: aircraftsArray
							// :searchInputList
						}
						numberOfSelectedModels={numberOfSelectedModels}
						aircraftTitle={aircraftTitle}
						itemsCart={selectedModels}
						indicesSelectedModels={indicesSelectedModels}
						onActiveId={this.getActiveId}
						// highlightTextProtection={this.highlightTextProtection}
						inputSearchValue={inputSearchValue}
						radioButtonValueApp={radioButtonValue}

					/>
				</Section>
			</>
		)
	}
}
