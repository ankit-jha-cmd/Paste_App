import React from 'react'
import { useState } from "react"
import {useSearchParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNewPaste, updatePaste, viewPaste, deletePaste, deleteAllPastes } from '../redux/pasteSlice';

function Home() {
  const[title, setTitle]= useState('');
  const[body, setBody]= useState('');
  const[actualLink, setActualLink]=useSearchParams();
  const pasteId=actualLink.get('pasteId');

  const dispatch = useDispatch()

  function handleSubmit(){
// add a check to save from duplication of paste.
    if(pasteId){
      //if pasteId already exists, then update the paste with that pasteId
      dispatch(updatePaste())
    }
    else{
      // else create a new paste  
      const paste={
        title : title,
        body : body,
        pasteId : Date.now(),
        createdAt : new Date().toLocaleString()   // know about date formatting
      }
    
      dispatch(createNewPaste(paste))
    }
    setActualLink({});
    setTitle('');
    setBody('');
  }

  return (
     <>
      <div>
        <input 
          type="text"
          value={title}
          placeholder="Add your title"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <button
          onClick={handleSubmit}
        >{pasteId? 'Update Your Paste' : 'Create Your Paste'}</button>
      </div>

      <div>
        <textarea 
          placeholder="Add your code"
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        />
      </div>
    </>
  )
}

export default Home