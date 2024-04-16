import './Button.css';
import { useState } from 'react'; 

function Button() {

	// let text = 'Save';
	const [text, setText] = useState('Save');

	const clicked = () => {
		console.log('Hello!');
		setText('Close!!!!!!!');
	};

	return (
		<button onClick={clicked} className='button accent'>{text}</button>
	);
}

export default Button;
