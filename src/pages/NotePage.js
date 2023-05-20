import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
// import notes from '../assets/data'  //search through to find，用id定位到需要哪一条
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = () => {
    const navigate = useNavigate();
    const noteId = useParams().id;  //use 'react-router-dom' get URL params.id,不在props里了
    // console.log("noteId:", noteId);
    // let note = notes.find(note => note.id === Number(noteId)) //note.id compare with URL id
    let [note, setNote] = useState(null) //before we start adding thins, note is set to null

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if (noteId === 'new') return
        let response = await fetch(`http://localhost:8000/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    //create data when we create or update note
    let createNote = async() => {
        await fetch(`http://localhost:8000/notes/`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let updateNote = async() => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async() => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
        })
        navigate('/')
    }

    let handleSubmit = () => {
        
        // if it's not a new note and there is no note body 
        if (noteId !== 'new' && !note.body){
            deleteNote()
        }else if (noteId !== 'new'){
            updateNote()
        }else if(noteId === 'new' && note!== null){
            createNote()
        }
        navigate('/')
    }

    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to='/'>
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
            </h3>
            
            {/* <button onClick={deleteNote}>Delete</button> */}
            {/* if it is updating a note, else */}
            {noteId !== 'new' ?(
                <button onClick={deleteNote}>Delete</button>
            ):(
                <button onClick={handleSubmit}>Done</button>
            )}
            
        </div>
        <textarea onChange={(e) => {setNote({ ...note, 'body': e.target.value })}} value={note?.body}>

        </textarea>  
        {/* ? to make sure the body exists */}
    </div>
  )
}

export default NotePage