import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

//! Aбсолютний шлях + Реекспорт
import {
  App,
	// AppCounter,
  AppColorBox,
  AppSearchDebounce, //! Пошук елементів + Debounce
  AppSearchDebounceTextBacklight, //! Пошук елементів + Debounce + Підсвічування тексту
  AppUncontrolledElementsForm, //! 4.4.1.Неконтрольовані елементи форм
  AppControlledElementsForm, //! 4.4.2.Контрольовані елементи форм
  AppComplexForms, //! 4.4.3.Складні форми
  AppComplexFormsLifeCycle //! Життєві цикли реакт
} from '@/components/App';



createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter basename='/airplane-model-store3-state2-form1-lifeCycle'>
        {/* <App /> */}
        {/* <AppColorBox />  */}
        {/* <AppSearchDebounce /> */}
        {/* <AppSearchDebounceTextBacklight /> */}
        {/* <AppUncontrolledElementsForm onSubmit={values => console.log(values)}/> */}
        {/* <AppControlledElementsForm /> */}
        {/* <AppComplexForms onSubmit={values => console.log(values)} /> */}
        {/* <AppComplexForms/> */}
        <AppComplexFormsLifeCycle/>

		</BrowserRouter>
	</StrictMode>
)
