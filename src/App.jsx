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
import { useLocalStorage } from './hooks/use-localstorage.hook';

function App() {
	const [items, setItems] = useLocalStorage('data');
	// const [data, setData] = useState([]);

	function mapItems(items) {
		if(!items){
			return [];
		}
		return items.map(i=> ({
			...i,
			date: new Date(i.date)
		}));
	}

	const addItem = item => {
		setItems([...mapItems(items), {
			text: item.post,
			title: item.title,
			date: new Date(item.date),
			id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
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
				<JournalList items={mapItems(items)}>

				</JournalList>

			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
			
		</div>
	);
}

export default App;
