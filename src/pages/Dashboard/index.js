import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs,doc ,deleteDoc, setDoc} from "firebase/firestore"
import { db } from "../../services/firebaseConfig";
import Modal from 'react-modal';
import trash from '../../assets/delete.svg';
import edit from '../../assets/pencil.svg';
import "./styles.css";
import '../../global.css';
import { useNavigate } from 'react-router-dom';




function Dashboard() {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState('');
    const [link, setLink] = useState('');
    const [users, setUsers] = useState([]);
    const [iden, setInden] = useState("");
    

    const navigate = useNavigate();

    const userCollectionRef = collection(db,"noticia");

    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        
        try{
        const docRef = await addDoc(collection(db, "noticia"), {
            imageUrl,
            title,
            description,
            theme,
            link
          });

          alert("Dados adicionado com sucesso!", docRef)
          navigate(setModalIsOpen (false))
        }catch(event){
            console.error("Error adding document! ",event);
        } 
       
    } 
    
        
    useEffect(() => {
        const getNoticias = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getNoticias();
    }, [userCollectionRef]);

    async function handleDelete(id) {

        const userDoc = doc(db, "noticia",id);
        await deleteDoc(userDoc);
        alert("Deletado com Sucesso")
            
    }
    function handleUpdate(id){
        document.getElementById('edt').style.display = 'block'
        const num = id
        setInden(num)
    }



    function handleEdit(id){
        const userDoc = doc(db,"noticia",id);
        const docRef = {
            imageUrl: imageUrl,
            title: title,
            description: description,
            theme: theme,
            link: link
        };
        setDoc(userDoc, docRef)
            .then(userDoc =>{
                alert("Dados alterado com sucesso!");
            })
           
     }  
     function exit(){
        navigate ('../') 
     }
    
    
    return (
        <div className="table">
           <h3>Notícias cadastradas</h3>
           <table>
            
                <tr>
                    <th scope="col">Imagem</th>
                    <th scope="col">Título</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Tema</th>
                    <th scope="col">Link</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                </tr>
                
            
               {users.map((docRef) =>{
                return(
                    <tr>
                        <td>{docRef.imageUrl}</td>
                        <td>{docRef.title}</td>
                        <td>{docRef.description}</td>
                        <td>{docRef.theme}</td>
                        <td>{docRef.link}</td>
                        <td><button id='trash' onClick={() => { handleDelete(docRef.id)}}><img src={trash} alt="trash"></img></button></td>
                        <td><button id='edit' onClick={()=> {handleUpdate(docRef.id)}}><img src={edit} alt="edit"></img></button></td>
                     
                    </tr> 
                )
               })}  
                  
            </table>
           

            <div id="edt" hidden>
            
                <h2>Editar Notícia</h2>
                <br/>
                <p>Todos os campos devem ser preenchido!</p>
                <br/>
                <form > 
                        <label htmlFor="imageUrl">Url da imagem</label>
                        <input 
                            id="imageUrl" 
                            value={imageUrl} 
                            onChange={event => setImageUrl(event.target.value)}
                            
                        />

                        <label htmlFor="title">Título</label>
                        <input 
                            id="title" 
                            value={title} 
                            onChange={event => setTitle(event.target.value)}
                        />

                        <label htmlFor="description">Descrição</label>
                        <input 
                            id="description" 
                            value={description} 
                            onChange={event => setDescription(event.target.value)}
                        />


                        <label htmlFor="theme">Tema</label>
                        
                        <select 
                            id="theme" 
                            selected="Esportes"
                            value={theme} 
                            onChange={event => setTheme(event.target.value)}>
                                <option value="" selected disabled hidden>Escolha um tema</option>
                                <option value="Esportes">Esportes</option>
                                <option value="Entretenimento">Entretenimento</option>
                                <option value="Famosos">Famosos</option>
                                <option value="Política">Política</option>
                        </select>

                        <label htmlFor="link">Link para notícia</label>
                        <input 
                            id="link" 
                            value={link} 
                            onChange={event => setLink(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <div >
                           
                            <button className="yellow-button" type="submit" onClick={() => handleEdit(iden)}>Editar Notícia</button>
                                                 
                        </div>  
                </form>
            
            </div>                           
                         
                
                <button className="yellow-button" id="new-post" onClick={() => {setModalIsOpen(true)}}>Nova notícia</button>
                <button className="yellow-button" id="sair" onClick={() => exit()}>Sair</button>
                <Modal isOpen={modalIsOpen} id="create-modal">
                    <form onSubmit={handleSubmit}> 
                            <label htmlFor="imageUrl">Url da imagem</label>
                            <input 
                                id="imageUrl" 
                                value={imageUrl} 
                                onChange={event => setImageUrl(event.target.value)}
                                
                            />

                            <label htmlFor="title">Título</label>
                            <input 
                                id="title" 
                                value={title} 
                                onChange={event => setTitle(event.target.value)}
                            />

                            <label htmlFor="description">Descrição</label>
                            <input 
                                id="description" 
                                value={description} 
                                onChange={event => setDescription(event.target.value)}
                            />


                            <label htmlFor="theme">Tema</label>
                            
                            <select 
                                id="theme" 
                                selected="Esportes"
                                value={theme} 
                                onChange={event => setTheme(event.target.value)}>
                                    <option value="" selected disabled hidden>Escolha um tema</option>
                                    <option value="Esportes">Esportes</option>
                                    <option value="Entretenimento">Entretenimento</option>
                                    <option value="Famosos">Famosos</option>
                                    <option value="Política">Política</option>
                            </select>

                            <label htmlFor="link">Link para notícia</label>
                            <input 
                                id="link" 
                                value={link} 
                                onChange={event => setLink(event.target.value)}
                            />
                        <div>
                            
                            <button className="yellow-button" type="submit" >Cadastrar</button>
                        
                            <button className="yellow-button" id="close-button" onClick={() => setModalIsOpen (false)}>Fechar</button>
                            
                        </div>  
                    </form>         
                                 
                </Modal>
            </div>
    );
}
export default Dashboard;