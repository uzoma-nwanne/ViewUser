import { ReactElement, ReactEventHandler, useEffect, useState } from "react";
import "./App.css";

interface Name{
  first:string,
  last:string
}
interface Picture{
  thumbnail:string
}
interface User{
  name: Name,
  picture:Picture
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState(5)

  const API_URL = `https://randomuser.me/api/?results=${num}`;

  const fetchData = async () => {
    const res = await window.fetch(API_URL);
    const json = await res.json();
    setUsers(json.results);
    console.log(users)
  };

  useEffect(() => {
    fetchData();
  }, [num]);


  const handleSelect = (e: any)=>{
    setNum(e.target.value)
  }

  const handleClick = (e:any)=>{
    const val  = e.target.getAttribute('data-id')
    alert(val)
  }


  return (
    <> 
      <form>
        <label htmlFor="number">Select number of user</label>
        <select name="number" id="number" onChange={handleSelect}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </form>
      <h1>Users</h1>
      {users.map((user:User) => (
        <div key={user.name.first} id={user.name.first} data-id={user.name.first} onClick={handleClick}>
          <img src={user.picture.thumbnail} alt="user pic"/>
          <h2>{user.name.first}</h2>
        </div>
      ))}
    </>
  );
}
