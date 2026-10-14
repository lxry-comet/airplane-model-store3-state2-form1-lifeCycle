import css from './Filter.module.css'

export function Filter({
	onAll,
	onPlanes,
	onBiplanes,
	onHelicopters,
	buttonActive,
	onCart,
	numberOfSelectedModels,
	isUserActive
}) {
	// console.log('ButtonActive', buttonActive)

	// const allButton = buttonActive === 'allButton' ? `${css.buttonAllFiltration} ${css.active}` : `${css.buttonAllFiltration}`;

	// const planeButton = buttonActive === 'planeButton' ? `${css.buttonPlaneFiltration} ${css.active}` : `${css.buttonPlaneFiltration}`;

	// const biplaneButton = buttonActive === 'biplaneButton' ? `${css.buttonBiplaneFiltration} ${css.active}` : `${css.buttonBiplaneFiltration}`;

	//! const helicopterButton = buttonActive === 'helicopterButton' ? `${css.buttonHelicopterFiltration} ${css.active}` : `${css.buttonHelicopterFiltration}`;

	return (
		<div className={css.filterBox}>
			<button
				//* Треба щоб клас нейм набуває значення: `${css.buttonAllFiltration} ${css.active}` коли кнопка натиснута. Коли не активна, набуває значення: '${css.buttonAllFiltration}'.

				className={
					buttonActive === 'allButton'
						? `${css.buttonAllFiltration} ${css.active}`
						: `${css.buttonAllFiltration}`
				}
				type='button'
				onClick={onAll}
			>
				ВСІ
			</button>

			<button
				className={
					buttonActive === 'planeButton'
						? `${css.buttonPlaneFiltration} ${css.active}`
						: `${css.buttonPlaneFiltration}`
				}
				type='button'
				onClick={onPlanes}
			>
				Літаки
			</button>
			<button
				className={
					buttonActive === 'biplaneButton'
						? `${css.buttonBiplaneFiltration} ${css.active}`
						: `${css.buttonBiplaneFiltration}`
				}
				type='button'
				onClick={onBiplanes}
			>
				Біплани
			</button>
			<button
				className={
					buttonActive === 'helicopterButton'
						? `${css.buttonHelicopterFiltration} ${css.active}`
						: `${css.buttonHelicopterFiltration}`
				}
				type='button'
				onClick={onHelicopters}
			>
				Вертольоти
			</button>
			<button
				className={
					buttonActive === 'cartButton'
						? `${css.buttonCartFiltration} ${css.active}`
						: `${css.buttonCartFiltration}`
				}
				type='button'
				onClick={onCart}
				disabled={!isUserActive}
			>
				Кошик &nbsp;
				<span
					className={
						numberOfSelectedModels === 0
							? `${css.cartItemCount} `
							: `${css.cartItemCount} ${css.cartItemCountNone}`
					}
				>
					{numberOfSelectedModels}
				</span>
			</button>
		</div>
	)
}
