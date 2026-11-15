import { useState } from "react"
import {useSearchParams} from 'react-router-dom';



function App() {
  const[title, setTitle]= useState('');
  const[body, setBody]= useState('');
  const[actualLink, setActualLink]=useSearchParams();
  const pasteId=actualLink.get('pasteId');


  function handleSubmit(){
    if(pasteId){
      
    }
    else(){

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

export default App
