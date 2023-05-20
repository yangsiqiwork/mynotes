import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'
import ListItem from '../components/Listitem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {
    let [notes, setNotes] = useState([])

    //trigger getNotes() when the component first loads
    useEffect(() => {
        getNotes()
    }, [])

    //get data: fetch use async await
    let getNotes = async ()=> {
        let response = await fetch('http://localhost:8000/notes/')
        let data = await response.json()
        // console.log("data:", data)
        setNotes(data)
    }
  
    return (
    <div className = "notes">
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes List</h2>
            <p className='notes-count'>{notes.length}</p>
        </div>
        <div className='notes-list'>
            {notes.map((note, index) => (
                <ListItem key={index} note={note}/>
            ))}
        </div>
        <AddButton />
    </div>
  );
};

export default NotesListPage

