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
import { UserContextProvider } from './context/user.context';

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
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items)].map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			}));
		}
	};
	const sortItems = (a,b) =>{
		if(a.date > b.date){
			return 1;
		} else {
			return -1;
		}
	};
	const [selectedItem, setSelectedItem] = useState({});




	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(items)} setItem={setSelectedItem}>
					</JournalList>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} data={selectedItem} />
				</Body>
			
			</div>
		</UserContextProvider>
	);
}

export default App;
