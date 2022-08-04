import {useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/UserContext';
const Login = () => {
    const {loginUser, wait, loggedInCheck} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const logo = require('../logo.png'); 

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setErrMsg('Please Fill in all Required Fields!');
            return;
        }

        const data = await loginUser(formData);
        if(data.success){
            e.target.reset();
            setRedirect('Redirecting...');
            await loggedInCheck();
            return;
        }
        setErrMsg(data.message);
    }

    return (
        <div>

        <div className="wrapper">
            <header className="page-header">
                <nav>
                <img className="logo" src={logo} alt="logo"/>
                <div className="cta-contact"><Link to="/signup">Sign Up</Link></div>
                </nav>
            </header>

            <main className="page-main">

            <div className="row">
            <div className="columnsplit">
                <div>
                    <h1>Hi F1 Fans!</h1>
                    <h2>Dapatkan informasi dan gosip terkini mengenai Formula 1</h2>
                    <h3>Silahkan daftar atau login untuk melanjutkan.</h3>
                </div>
            </div>
            <div className="columnsplit">
                <div>
                    <h1>Login</h1>
                    <form onSubmit={submitForm}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" onChange={onChangeInput} placeholder="Your email" id="email" value={formData.email} required />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" onChange={onChangeInput} placeholder="New password" id="password" value={formData.password} required />
                        {errMsg && <div className="err-msg">{errMsg}</div>}
                        {redirect ? redirect : <button type="submit" disabled={wait}>Login</button>}
                        
                    </form>
                </div>
            </div>
            </div>

            </main>
            <footer className="page-footer">
                <small className='textfooter'>Andri Sutanto</small>
            </footer>
            </div>

        

        </div>
    )
}

export default Login;