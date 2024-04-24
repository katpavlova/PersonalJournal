import './Body.css';

function Body({children}) {

	// return React.createElement('div', {}, 'Project');

	return (
		<div className="body">
			{children}
		</div>
	);
}

export default Body;
