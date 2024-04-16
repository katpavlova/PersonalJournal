import './JournalItem.css';

function LournalItem({title, text, date}) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<div className="journal-item__header">
				{title}
			</div>
			<div className="journal-item__body">
				<div className="journal-item__date">
					{formatedDate}
				</div>
				<div className="journal-item__text">
					{text}
				</div>
			</div>
		</>
	);
}

export default LournalItem;
