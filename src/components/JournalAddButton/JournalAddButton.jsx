import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton() {

	// return React.createElement('div', {}, 'Project');

	return (
		<CardButton className="journal-add">
            Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;
