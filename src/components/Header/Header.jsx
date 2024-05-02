import './Header.css';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function Header() {
	const {userId, setUserId} = useContext(UserContext);

	const changeUser= (e)=> {
		setUserId(Number(e.target.value));
	};
	

	return (
		<>
			Logo
			<select name="user" id="user" value={userId} onChange={changeUser}>
				<option value="1">Kate</option>
				<option value="2">German</option>
			</select>
		</>
	);
}

export default Header;
