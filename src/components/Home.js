import {useContext} from 'react';
import {UserContext} from '../context/UserContext';

const logo = require('../logo.png'); 

const Home = () => {
    const {user, logout} = useContext(UserContext);
    return (
        <div className="home">
            <div className="img">
                <img className="logo" src={logo} alt="logo"/>
            </div>
            
            <h1>Hi, {user.name}<br/><span>Selamat datang, {user.email}</span></h1>
            <button onClick={logout} className="logout">Logout</button>
        </div>
    )
}

export default Home;
