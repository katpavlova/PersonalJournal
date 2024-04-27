import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useEffect, useReducer, useState  } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

// const INITIAL_STATE = {
// 	title: true,
// 	post: true,
// 	date: true
// };

function JournalForm({onSubmit}) {
	// const [formValidState, setFormValidState] = useState(INITIAL_STATE);

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(() => {
		let timerId;
		if(!isValid.date || !isValid.post || !isValid.title) {
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
				// setFormValidState(INITIAL_STATE);
			}, 2000);
		}
		return() => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	// const [inputData, setInputData] = useState('');

	// const inputChange = (event) => {
	// 	setInputData(event.target.value);
	// };

	const addJournalItem = (e) => {
		e.preventDefault();
		// const formData = new FormData(e.target);
		// const formProps = Object.fromEntries(formData);
		// let isFormValid = true;
		// if (!formProps.title.trim().length) {
		// 	setFormValidState(state => ({...state, title: false}));
		// 	isFormValid = false;
		// } else {
		// 	setFormValidState(state => ({...state, title: true}));
		// }
		// if (!formProps.post.trim().length) {
		// 	setFormValidState(state => ({...state, post: false}));
		// 	isFormValid = false;
		// } else {
		// 	setFormValidState(state => ({...state, post: true}));
		// }
		// if (!formProps.date) {
		// 	setFormValidState(state => ({...state, date: false}));isFormValid = false;
		// } else {
		// 	setFormValidState(state => ({...state, date: true}));
		// }
		// if (!isFormValid) {
		// 	return;
		// }
		dispatchForm({type: 'SUBMIT'});
	};
	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	return (

		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input type="text" onChange={onChange} value= {values.title} name="title" className={cn(styles['input-title'], {[styles['invalid']]: !isValid.title})} />
			</div>
			
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					Дата
				</label>
				<input type="date" name="date" onChange={onChange} value= {values.date} id="date" className={cn(styles['input'], {[styles['invalid']]: !isValid.date})} />
			</div>
			
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					Метки
				</label>
				<input type="text" name="tag" onChange={onChange} value= {values.tag} id="tag" className={cn(styles['input'])} />
			</div>

			
			<textarea name="post" onChange={onChange} value= {values.post} id="" cols="30" rows="10" className={cn(styles['input'], {[styles['invalid']]: !isValid.post})}></textarea>
			<Button text="Добваить" />
		</form>

	);
}

export default JournalForm;


