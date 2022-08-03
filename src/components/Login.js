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

        <>
        
        <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div className="container">

             <div className="navbar-header">
                  <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                       <span className="icon icon-bar"></span>
                       <span className="icon icon-bar"></span>
                       <span className="icon icon-bar"></span>
                  </button>

                  <a href="index.html" className="navbar-brand">IndoFormula</a>
             </div>

             <div class="collapse navbar-collapse">


                  <ul className="nav navbar-nav navbar-right">
                       <li className="section-btn"><a href="/" data-toggle="modal" data-target="#modal-form">Login / Daftar</a></li>
                  </ul>
             </div>

        </div>
   </section>

        
        <section id="home" data-stellar-background-ratio="0.5">
          
            
            <div className="overlay">
            </div>
            <div className="container">
               <div className="row">

                    <div class="col-md-6 col-sm-12">
                         <div className="home-info">
                              <h1>Hi F1 mania<br/>Dapatkan informasi Formula 1 terkini</h1>
                              <a href="/" class="section-btn">Login / Daftar</a>
                         </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="home-video">
                            <h2>Login</h2>
                            <form onSubmit={submitForm}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" onChange={onChangeInput} placeholder="Your email" id="email" value={formData.email} required />
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" onChange={onChangeInput} placeholder="New password" id="password" value={formData.password} required />
                                {errMsg && <div className="err-msg">{errMsg}</div>}
                                {redirect ? redirect : <button type="submit" disabled={wait}>Login</button>}
                                <div className="bottom-link"><Link to="/signup">Sign Up</Link></div>
                            </form>
                        </div>
                    </div>
                    
               </div>
          </div>
            
        </section>
        </>
    )
}

export default Login;