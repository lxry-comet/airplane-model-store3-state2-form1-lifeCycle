import React, { Component } from 'react'
import css from './ScaleSelection.module.css'

export class ScaleSelection extends Component {
	
	state = {
		// modelScale: "all",
		modelScale: this.props.onInitialScale,
	}
	componentDidUpdate(prevProps, prevState){
		console.log('⚠️Спрацював componentDidUpdate - ScaleSelection')
		console.log('⚠️Спрацював prevState.modelScale', prevState.modelScale)
		console.log('⚠️Спрацював this.state.modelScale', this.state.modelScale)
		console.log('⚠️Спрацював prevProps.onInitialScale', prevProps.onInitialScale)
		console.log('⚠️Спрацював this.props.onInitialScale', this.props.onInitialScale)
		
		if(prevProps.onInitialScale !== this.props.onInitialScale ){
			this.setState({
				modelScale: this.props.onInitialScale
			})
		}
	}
	
	handleChangeModelScale = event => {
		const {aircrafts} = this.props
		console.log("⚠️ aircrafts",aircrafts)
		const {name, value} = event.currentTarget
		console.log("Зміна масштабу моделі")
		console.log(typeof value)
		//! Використовуємо властивості об'єкта, що обчислюються
		//! Зберігаємо значення інпутів в state
		this.setState({
			[name]: value
		})
		//! Після отримання value, json, Сформувати масив об'єктів в яких scale === value
		//! Знаходимо масив моделей обраного масштабу
    const modelsSelectedScale =  
		value === "all"
		? aircrafts
		: aircrafts.filter(aircraft =>
			aircraft.model.scale.some(item => item === Number(value)))
		// console.log("🔸modelsSelectedScale: ", modelsSelectedScale)
		this.props.onGetModelsSelectedScale(modelsSelectedScale, value)
	}

	render() {
		const {isCartButtonOn} = this.props
		const {modelScale } = this.state
		console.log("⚠️ Number All", Number("All"))

		console.log('----------------------------------------------')
		// console.log('✅Sort: ', sort)
		// console.log('🎯inputSearchPlaceholder: ', inputSearchPlaceholder)
		// console.log("✅radioButtonValue:", radioButtonValueApp)
		console.log("✅Зміна масштабу моделі", modelScale)
		console.log('______________________________________________')

		return (
			<div className={css.scaleSelectionBox}>
				<h3 className={css.scaleSelectionTitle}>Оберіть масштаб моделі:</h3>
					<label>
              {/* масштаб моделі */}
              <select
                className={css.scaleSelectionSelect}
                name="modelScale"
                value={modelScale}
                onChange={this.handleChangeModelScale}
                disabled={isCartButtonOn === 'cartButton'} //! блокування, якщо активна кнопка «Кошик»
              >
                <option className={css.scaleSelectionOption} value="all">Всі</option>
                <option className={css.scaleSelectionOption} value="200">1:200</option>
                <option className={css.scaleSelectionOption} value="144">1:144</option>
                <option className={css.scaleSelectionOption} value="100">1:100</option>
                <option className={css.scaleSelectionOption} value="72">1:72</option>
                <option className={css.scaleSelectionOption} value="60">1:60</option>
                <option className={css.scaleSelectionOption} value="48">1:48</option>
                <option className={css.scaleSelectionOption} value="32">1:32</option>
              </select>
          </label>
			</div>
		)
	}
}
