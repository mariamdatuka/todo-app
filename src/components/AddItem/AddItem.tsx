import React from 'react'
import styles from './AddItem.module.css';

interface Props{
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  addItem:(e:React.FormEvent)=>void;
  time:string;
}


const AddItem  = ({item,setItem, addItem, time}:Props) => {

  const changeHandler=(e:any)=>{
    setItem(e.target.value);
  }

  return (
    <>
  <div className={styles.background}>
    <div className={styles.titleBox}>
      <h1>T O D O</h1>
     <div className={styles.timeBox}>{time}</div>
    </div>
    <form className={styles.inputBox} onSubmit={addItem}>
      <input 
        type='text' 
        className={styles.mainInput}        
        placeholder='create a new todo...'
        value={item}
        onChange={changeHandler}/>
      <button type='submit'>+</button>
    </form>
  </div>
</>
  )
}

export default AddItem