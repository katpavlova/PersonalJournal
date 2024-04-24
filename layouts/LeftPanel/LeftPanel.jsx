import './LeftPanel.css';

function LeftPanel({children}) {

	// return React.createElement('div', {}, 'Project');

	return (
		<button className='left-panel'>
			{children}
		</button>
	);
}

export default LeftPanel;
