import React, { Component } from "react";
import css from './ColorBox.module.css';

export class ColorBox extends Component {
	//* 1) Отримати індекс активного елементу 
	//! 2) Створити масив індексів активних(обраних) елементів
	//! 2.1)Доадти логіку інверсії роботи кнопок кольорів(якщо такий ідекс вже є, прибираємо його, якщо його немає, додаємо його)

	//! 3) Створити масив обраних елементів згідно масивів індексів
	//! 4) Відрендерити масив обраних елементів


// ? Логіка роботи з LocalStorage: 

	state = {
		activeButtonIndex: null, //! індекс обраного елемента
		// selectedButtonsIdx: [], //! масив індексів активних(обраних) елементів

		
		// * При будь-якому завантажені застосунку аналізуємо стан LocalStorage:
		// * 1.1 Якщо нічого не має, то у властивість стейту, selectedButtonsIdx створюємо пустий масив
		// * 1.2 Якщо LocalStorage не пустий, то значення LocalStorage перезаписуємо у властивість стейту selectedButtonsIdx

		selectedButtonsIdx: JSON.parse(localStorage.getItem("selectedIdx")) || [],

		// selectedColors: [] //! масив обраних елементів згідно масивів індексів
	}
	// * 2 При першому завантажені якщо нічого не має  у властивість стейту, то створюємо пустий масив який записуємо у LocalStorage

	componentDidMount() {
		console.log('Спрацював componentDidMount');
        const saved = localStorage.getItem("selectedIdx");
        if (!saved) {
            localStorage.setItem("selectedIdx", JSON.stringify([]));
        }
    };

// * 3 При будь яких змінах властивості selectedButtonIdx, записуємо selectedButtonIdx у LocalStorage

	componentDidUpdate(prevProps, prevState) {
		console.log('⚡Спрацював componentDidUpdate');

        if (prevState.selectedButtonsIdx !== this.state.selectedButtonsIdx) {
					console.log("🔸🔸Зміна state, selectedButtonIdx")
            localStorage.setItem(
                "selectedIdx",
                JSON.stringify(this.state.selectedButtonsIdx)
            );
        }
				
				//todo: 1.Перевірка оновлення компонента у звичайному методі класу componentDidUpdate:
        const prevActiveButtonIdx = prevState.activeButtonIndex;
        const nextActiveButtonIdx = this.state.activeButtonIndex;

        console.log("🔙prevActiveButtonIdx:", prevActiveButtonIdx);
        console.log("🔜nextActiveButtonIdx:", nextActiveButtonIdx);

        if (prevActiveButtonIdx !== nextActiveButtonIdx) {
            console.log("❗️⭕️❗️Оновлено поле 'state.activeButtonIndex'");
            //todo: Оновлення localStorage "activeButtonIndex":
            localStorage.setItem("activeButtonIndex", JSON.stringify(nextActiveButtonIdx));
        };
    };

	//! Для створення масиву selectedColors[] нам потрібно: вхідний масив, масив індексів активних(обраних) елементів.

	getActiveIndex = (index) => {

		//! відноситься до варіанту 1 - з PrevState
		// this.setState({
		// 	activeButtonIndex: index
		// })

		//? Варіант 1 - з PrevState
		// this.setState((prevState) => {
    //       //  selectedButtonsIdx: prevState.selectedButtonsIdx.concat([index]) 

		// 	if (prevState.selectedButtonsIdx.includes(index)){
		// 		//! 1 Масив this.state.selectedButtonsIdx
		// 		//! 2 Індекс - index
		// 		//! 3 З масиву this.state.selectedButtonsIdx потрібно видалити елемент з 	індексом який дорівнює index
		// 		return{
		// 				selectedButtonsIdx: prevState.selectedButtonsIdx.filter((item) => item !== index) 
		// 			}
		// 		}
		// 	else{
		// 		//! 1 Масив this.state.selectedButtonsIdx
		// 		//! 2 Індекс - index
		// 		//! 3 З масиву this.state.selectedButtonsIdx потрібно додати елемент з індексом який дорівнює index
		// 		return {
		// 			//? Створюємо новий масив, у який копіюємо всі елементи зі старого масиву та додаємо до них новий елемент
    //     	selectedButtonsIdx: [...prevState.selectedButtonsIdx, index] 
    // 		};			
		// 	}
    // }); 
		
		//? Варіант 2 - без PrevState
		
			if ( this.state.selectedButtonsIdx.includes(index)){
				//! 1 Масив this.state.selectedButtonsIdx
				//! 2 Індекс - index
				//! 3 З масиву this.state.selectedButtonsIdx потрібно видалити елемент з 	індексом який дорівнює index
						//activeButtonIndex: index, //! це буде останній активний елемент. 
				this.setState({
					selectedButtonsIdx: this.state.selectedButtonsIdx.filter((item) => item !== index), 
				}) 

				}
			else{
				//! 1 Масив this.state.selectedButtonsIdx
				//! 2 Індекс - index
				//! 3 З масиву this.state.selectedButtonsIdx потрібно додати елемент з індексом який дорівнює index
				
					//? Створюємо новий масив, у який копіюємо всі елементи зі старого масиву та додаємо до них новий елемент
				this.setState({
					 activeButtonIndex: index,
        	selectedButtonsIdx: this.state.selectedButtonsIdx.concat(index).sort((a, b) => a - b)
				})
			}

			//! ДЗ законсолити -> this.setState((prevState) => prevState.selectedButtonsIdx)

			//? const result = this.setState((prevState) => prevState.selectedButtonsIdx);
    	//? 	console.log('Тут сформувався масив індексів: ', result);

			//! Формуємо масив обраних елементів(кольорів)
			this.setState((prevState) => {
				return {selectedColors: prevState.selectedButtonsIdx.map((item) => this.props.colorBoxes[item])};
			});
    };

//! selectedButtonsIdx: [...this.state.selectedButtonsIdx, index] - переробити через concat
//? selectedButtonsIdx: this.state.selectedButtonsIdx.concat(index)
		// const y = array.arrayAll; //! повне безглуздя
		// console.log('Index-state: ', this.state.activeButtonIndex); //!❌ ТАК РОБИТИ не треба !!!!!
		func = () => {
			console.log('Це фунуція func')
			return 'Це функція func'
		}
	render(){

		const {colorBoxes} = this.props;
		const {
			activeButtonIndex, 
			selectedButtonsIdx, 
			// selectedColors
		} = this.state;

		const selectedColors = selectedButtonsIdx.map((item) => this.props.colorBoxes[item]);

		//! Спробувати прибрати зі стейту ще одну властивість. 
		//! Розуміючи той факт, що далі ця задача буде вирішувати у застосунку з літаками. 
		// const activeButtonIndex = selectedButtonsIdx.length > 0
		// ? selectedButtonsIdx[selectedButtonsIdx.length - 1]
		// : null;

		const numberOfColors = selectedColors.length;
		// console.log("🔘🆔Активна кнопка:", activeButtonIndex);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("----------------------------------------------");


		//? Поєднуємо: 
		//* початковий масив: colorBoxes; 
		//* activeButtonIndex - індекс останнього доданого елементу;
		//* Рішенння колір останнього доданого елемента:
		// ?  colorBoxes[activeButtonIndex].label
		// ?  colorBoxes[activeButtonIndex].color
	
		return(
			<div className={css.colorBoxContainer}>
				<h3 className={css.colorBoxTitle}>Вибір Кольорів</h3>

				<p className={css.colorBoxDescription}>Остнній доданий колір: &nbsp;
					<span
					 className={css.colorBoxSelectedColor}
					 style={{backgroundColor:
						activeButtonIndex === null 
						? 'transparent' 
						: colorBoxes[activeButtonIndex].color
					}}
					 >
						{
						activeButtonIndex === null 
						? 'Колір не обрано' 
						:colorBoxes[activeButtonIndex].label
						}
						</span>
				</p>
					
				<div className={css.colorBox}>
					{colorBoxes.map((item, index) =>(
						<button 
						key={item.color}
						className={css.colorBoxButton} 
						style={{backgroundColor: item.color}}
						onClick={() => this.getActiveIndex(index)}
						// onClick={this.getActiveIndex(index)}❌
						// onClick={this.getActiveIndex}❌
						>
							{
								// Треба порівняти вибраний індекс з індексом у масиві. Якщо є то '✅On', якщо немає то '🆓Off'

							//*[1] selectedButtonsIdx.includes(index)
							//* [2 - 90% працездатності]selectedButtonsIdx.find((item) => item === index)
							selectedButtonsIdx.some((item) => item === index)
								? '✅On' 
								: '🆓Off'
						}
							</button>
						))}
				</div>
					{/*
					//! ДЗ: 
						//? Додати в рендер розмітку яка відмальовує масив обраних елементів згідно макету.
					*/}	
				<h3 className={css.colorBoxTitle}>Обрані кольори з <b>LocalStorage</b></h3>

				<p className={css.colorBoxDescription}>Кількість обраних кольорів: &nbsp;
					<span>
						{
						selectedColors === null 	
						? 'Колір не обрано' 
						: numberOfColors
						}
						</span>
				</p>
				<div className={css.selectedColors}>
					{
						selectedColors.map((item) => {
							return(
								<div key={item.color} style={{backgroundColor: item.color}}>
									<div className={css.selectedColorsText}>{item.color}</div>
								</div>
							);
						})
					}
				</div>
			</div>


			
		)
	}
}


