import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useContext, useEffect, useReducer, useRef, useState  } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../input/input';
import { UserContext } from '../../context/user.context';

// const INITIAL_STATE = {
// 	title: true,
// 	post: true,
// 	date: true
// };

function JournalForm({onSubmit, data}) {
	// const [formValidState, setFormValidState] = useState(INITIAL_STATE);

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);

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
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(()=> {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	useEffect(()=>{
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data]);

	const addJournalItem = (e) => {
		e.preventDefault();
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
				<Input type="date" ref={dateRef} name="date" onChange={onChange} value= {values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} id="date" isValid={isValid.date}/>
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


