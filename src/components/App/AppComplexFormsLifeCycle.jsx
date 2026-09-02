import React, { Component } from 'react'
import css from './AppComplexForms.module.css'

import { ComplexForms } from '@/components/ComplexForms/ComplexForms.jsx'
import { ComplexFormsGenerationID } from '@/components/ComplexFormsGenerationID/ComplexFormsGenerationID.jsx'
import { ComplexFormsGenerationIDRadioButton } from '@/components/ComplexFormsGenerationIDRadioButton/ComplexFormsGenerationIDRadioButton.jsx'
import { ComplexFormsGenerationIDRadioButtonCheckboxesSelect } from '@/components/ComplexFormsGenerationIDRadioButtonCheckboxesSelect/ComplexFormsGenerationIDRadioButtonCheckboxesSelect.jsx'
import { Modal } from '@/components/Modal/Modal.jsx'
import {ColorBoxLifeCycle} from '@/components/ColorBoxLifeCycle/ColorBoxLifeCycle.jsx'
import {Clock} from '@/components/Clock/Clock.jsx'

const colorBoxOptions = [
  { label: 'red', color: '#ff0000' },
  { label: 'orange', color: '#ffa500' },
  { label: 'yellow', color: '#ffff00' },
  { label: 'green', color: '#008000' },
  { label: 'lightblue', color: '#add8e6' },
  { label: 'blue', color: '#3131ff' },
  { label: 'violet', color: '#ee82ee' },
];



export class AppComplexFormsLifeCycle extends Component {

	state = {
		showModal: false //! контроль відкриття/закриття модального вікна
	}




	//? showModal:false -> showModal:true
	// toggleModal=()=>{
	// 	console.log("🌀toggleModal: ");
	// 	this.setState({
	// 		showModal: true
	// 	})
	// }
	// toggleModal=()=>{
	// 	console.log("🌀toggleModal: ");
	// 	this.setState({
	// 		showModal: false
	// 	})
	// }
	// toggleModal = () => { //? без деструктурізації
  //   this.setState(prevState => ({
  //     showModal: !prevState.showModal
  //   }));
  // };
	toggleModal = () => { //? з деструктурізацією
    console.log("🌀toggleModal");
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

	render() {
		const { showModal } = this.state
		return (
			<>
				{/* <button type='button' onClick={this.toggleModal}>
					Відкрити модалку
					</button> */}

				{/* <Modal title='Це контент модалки-1'/> */}
				{/* {showModal && (
					<Modal
						// title='Це контент модалки-2'
						onClose={this.toggleModal}
					>
						<h1>Це контент модалки як children</h1>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
							consequatur commodi ad totam doloremque nulla accusantium maiores
							eum deserunt ullam maxime architecto, iure voluptatum, ipsum
							laudantium recusandae reprehenderit corrupti. Molestias?
						</p>
						<button type='button' onClick={this.toggleModal}>
							Закрити модалку
						</button>
					</Modal>
				)} */}
				{/* <ColorBoxLifeCycle colorBoxes={colorBoxOptions}/> */}
				{/*//! Таймер */}
        <button
          type="button"
          onClick={this.toggleModal}
        >
          Старт/Стоп таймер
        </button>
        {showModal &&<Clock />}

			</>
		)
	}
}
