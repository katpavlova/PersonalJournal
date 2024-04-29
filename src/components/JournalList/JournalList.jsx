import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({items}) {

	// return React.createElement('div', {}, 'Project');
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	if (items.length == 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}
	
	return (
		<div className="journal-list">
			{items.map(el => (
				<CardButton key={el.id}>
					<JournalItem title={el.title} post={el.post} date={el.date} />
				</CardButton>
			)).sort(sortItems)}
		</div>
	);
}

export default JournalList;
