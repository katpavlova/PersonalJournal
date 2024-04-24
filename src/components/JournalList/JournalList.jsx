import './JournalList.css';

function JournalList({children}) {

	// return React.createElement('div', {}, 'Project');

	return (
		<div className="journal-list">
			{children}
		</div>
	);
}

export default JournalList;
