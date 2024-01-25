import Button from './Button'
import { useEffect, useState } from 'react';
import Modal from './Modal';



export default function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");
    const[error,setError] = useState(false)
  
    function handleSubmit(e) {
        setError(false)
      e.preventDefault();
  
      if (!name || !image) {
        setError(true)
        return
      } ;
  
      const id = crypto.randomUUID();
      const newFriend = {
        id,
        name,
        image: `${image}?=${id}`,
        balance: 0,
      };
  
      onAddFriend(newFriend);
      setName("");
      setImage("https://i.pravatar.cc/48");
    }
    useEffect(()=>{
        if(error){
            setTimeout(()=>{ setError(false)},2000)
        }
    },[error])
  
    return (
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👫 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
  
        <label>🌄 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
  
        <Button>Add</Button>
        {error &&<Modal>Please enter the name</Modal>}
      </form>
    );
  }