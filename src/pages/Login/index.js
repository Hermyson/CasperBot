import React,{ useState} from 'react';
import icon from '../../assets/Chatbot.jpg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from "../../services/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { useHistory } from "react-router-dom";

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const auth = getAuth(app);
    const navigate = useNavigate();
    
    let history = useHistory();

    function handleSignIn(e){
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                
                 setLogged(true);
                
                
               

                console.log("ok!");
               
            })
            .catch((error) => {
                
                setLogged(false);
                alert("Usuário ou senha incorreta");
                console.log(error.message)
               
                
            });
    }
    if(logged){
        //navigate('../Dashboard')
        history.push('../Dashboard');
    }
    
          
   
    
    return (
        <div className="container">
            <div className="content">
                <img src={ icon } alt="logo"></img>
                <h2>Casperbot Gerencie Notícias</h2>
                
                <h1>Por favor digite suas informações de login</h1>
                                            
                <input type="text" name="email" id="email" placeholder="usuario@email.com" onChange={e => setEmail(e.target.value)}/>          
                        
                <input type="password" name='password' id='password' placeholder="digite sua senha" onChange={e => setPassword(e.target.value)}/>  
            
                <button className="yellow-button" onClick={handleSignIn} type="submit">Login</button>
               
            </div>
            
        </div>
        

    );
}

export default Login;
