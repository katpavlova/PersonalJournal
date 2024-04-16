import './CardButton.css';

function CardButton({children}) {

	// return React.createElement('div', {}, 'Project');

	return (
		<button className='card-button'>
			{children}
		</button>
	);
}

export default CardButton;
