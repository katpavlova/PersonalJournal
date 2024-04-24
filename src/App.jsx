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
import { useState } from 'react';

function App() {
	const INITIAL_DATA = [
		{
			id: 1,
			title:'Подготовка к обновлению курсов',
			text: 'С учётом сложившейся международной обстановки, выбранный нами инновационный путь предполагает независимые способы реализации кластеризации усилий. Прежде всего, глубокий уровень погружения предопределяет высокую востребованность стандартных подходов. Как принято считать, акционеры крупнейших компаний, превозмогая сложившуюся непростую экономическую ситуацию, объективно рассмотрены соответствующими инстанциями. Внезапно, базовые сценарии поведения пользователей своевременно верифицированы! Имеется спорная точка зрения, гласящая примерно следующее: некоторые особенности внутренней политики неоднозначны и будут функционально разнесены на независимые элементы.',
			date: new Date()
		},
		{
			id: 2,
			title:'Тщательные исследования конкурентов неоднозначны',
			text: 'Сложно сказать, почему некоторые особенности внутренней политики формируют глобальную экономическую сеть и при этом — разоблачены. Являясь всего лишь частью общей картины, базовые сценарии поведения пользователей являются только методом политического участия и ассоциативно распределены по отраслям. Банальные, но неопровержимые выводы, а также реплицированные с зарубежных источников, современные исследования формируют глобальную экономическую сеть и при этом — смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности. Мы вынуждены отталкиваться от того, что укрепление и развитие внутренней структуры однозначно определяет каждого участника как способного принимать собственные решения касаемо укрепления моральных ценностей. В своём стремлении повысить качество жизни, они забывают, что новая модель организационной деятельности обеспечивает широкому кругу (специалистов) участие в формировании приоретизации разума над эмоциями.',
			date: new Date()
		}
	];
	const [data, setData] = useState(INITIAL_DATA);
	const addItem = item => {
		setData(oldItems => [...oldItems, {
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
					{data.length === 0 ? <p>Нет ни одной заметки. Самое время создать первую!</p> :data.sort(sortItems).map(el => 
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
