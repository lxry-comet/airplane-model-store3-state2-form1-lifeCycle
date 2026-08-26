import React, { Component } from 'react'
import css from './AppComplexForms.module.css'

import {ComplexForms} from '@/components/ComplexForms/ComplexForms.jsx'
import {ComplexFormsGenerationID} from '@/components/ComplexFormsGenerationID/ComplexFormsGenerationID.jsx'
import {ComplexFormsGenerationIDRadioButton} from "@/components/ComplexFormsGenerationIDRadioButton/ComplexFormsGenerationIDRadioButton.jsx"
import {ComplexFormsGenerationIDRadioButtonCheckboxesSelect} from "@/components/ComplexFormsGenerationIDRadioButtonCheckboxesSelect/ComplexFormsGenerationIDRadioButtonCheckboxesSelect.jsx"
import {Modal} from '@/components/Modal/Modal.jsx'

export class AppComplexFormsLifeCycle extends Component {

	render() {

		return (
		<>
			{/* <Modal title='Це контент модалки-1'/> */}
			<Modal 
			// title='Це контент модалки-2'
			>
				<h1>Це контент модалки як children</h1>
            <p>Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Omnis consequatur
              commodi ad totam doloremque nulla
              accusantium maiores eum deserunt
              ullam maxime architecto, iure voluptatum,
              ipsum laudantium recusandae reprehenderit
              corrupti. Molestias?
            </p>
			</Modal>
		</>
		)
	}
}
