import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useEffect, useReducer, useRef, useState  } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../input/input';

// const INITIAL_STATE = {
// 	title: true,
// 	post: true,
// 	date: true
// };

function JournalForm({onSubmit}) {
	// const [formValidState, setFormValidState] = useState(INITIAL_STATE);

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};


	useEffect(() => {
		let timerId;
		if(!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
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
				<Input type="text" ref={titleRef} onChange={onChange} value= {values.title} name="title" appearence="title" isValid={isValid.title}/>
			</div>
			
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					Дата
				</label>
				<Input type="date" ref={dateRef} name="date" onChange={onChange} value= {values.date} id="date" isValid={isValid.date}/>
			</div>
			
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					Метки
				</label>
				<Input type="text" name="tag" onChange={onChange} value= {values.tag} id="tag" />
			</div>

			<textarea name="post" ref={postRef} onChange={onChange} value= {values.post} id="" cols="30" rows="10" className={cn(styles['input'], {[styles['invalid']]: !isValid.post})}></textarea>
			<Button text="Добваить" />
		</form>

	);
}

export default JournalForm;


