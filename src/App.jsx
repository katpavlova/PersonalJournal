import Body from '../layouts/Body/Body';
import LeftPanel from '../layouts/LeftPanel/LeftPanel';
import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import { useState, useEffect } from 'react';

function App() {
	const [items, setItems] = useState([]);
	// const [data, setData] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(
				data.map(item => ({
					...item,
					date: new Date(item.date)
				})
				)
			);
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}

	}, [items]);


	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			text: item.post,
			title: item.title,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
		}]);
	};
	const sortItems = (a,b) =>{
		if(a.date > b.date){
			return 1;
		} else {
			return -1;
		}
	};



	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{items.length === 0 ? <p>Нет ни одной заметки. Самое время создать первую!</p> :items.sort(sortItems).map(el => 
						<CardButton key={el.id}>
							<JournalItem 
								title= {el.title}
								text= {el.text}
								date={el.date}
							/>
						</CardButton>
					)}

				</JournalList>

			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
			
		</div>
	);
}

export default App;
