import { useState } from "react";
import FriendsList from "./components/FriendsList";
import Button from "./components/Button";
import initialFriends from "./data";
import FormSplitBill from "./components/FormSplitBill";
import FormAddFriend from "./components/FormAdd";





export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }


  const handleAddFriend =(newFriend)=>{
    setFriends(friends=>[...friends,newFriend])
    setShowAddFriend(false)
  }

const handleSelection = (friend)=>{
  setSelectedFriend(current => friend.id==current?.id ? null : friend)
  
}
  const  handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }



  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}








