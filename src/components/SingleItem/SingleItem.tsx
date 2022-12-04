import React from 'react'
import { ToDoBox } from '../../interfaces/Interface'
import styles from './SingleItem.module.css'
import {CiEdit} from 'react-icons/ci';
import {BsTrash} from 'react-icons/bs';
import {MdOutlineDoneOutline} from 'react-icons/md';
import { useState, useRef, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd';


interface Props{
    toDo:ToDoBox;
    todos:ToDoBox[];
    setToDos:React.Dispatch<React.SetStateAction<ToDoBox[]>>;
    index:number;
}

const SingleItem = ({todos, setToDos, toDo, index}:Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editToDo, setEditToDo] = useState<string>(toDo.todo);

const handleDone=(id:number)=>{
  setToDos(todos.map((item)=>(
     item.id===id?{...item, isDone:!item.isDone}:item
  )))
}

const handleDelete = (id:number)=>{
  setToDos(todos.filter((item)=>(
    item.id!==id
  )))
}


const handleEdit=(e:React.FormEvent, id:number)=>{
  e.preventDefault();

  setToDos(
    todos.map((item)=>(item.id===id?{...item, item:editToDo}:item))
  )

  setEdit(false);
}

const inputRef=useRef<HTMLInputElement>(null)

useEffect(()=>{
  inputRef.current?.focus();
}, [edit]);

console.log(todos);
  return (
    <>
    <Draggable draggableId={toDo.id.toString()} index={index}>
      {
        (provided)=>(
          <form 
            className={styles.form}
            onSubmit={(e)=>handleEdit(e, toDo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
          <div className={styles.mainBox}>
          <div  className={`${styles.toDoBox} ${toDo.isDone?`${styles.done}`:''} `}>
            <div>
          { edit?(
            <input 
               ref={inputRef}
               className={styles.newInput}
               value={editToDo}
               onChange={(e)=>setEditToDo(e.target.value)}/>
                ) : (editToDo)}
               </div>
            <div className={styles.iconsBox}>
              <div className={styles.edit} onClick={()=>{
               if(!toDo.isDone){
                setEdit(!edit)
               }
              }
             }>
             <CiEdit/>
           </div>
             <div className={styles.remove}
                 onClick={()=>handleDelete(toDo.id)}>
             <BsTrash/>
            </div>
            <div className={styles.done}
              onClick={()=>handleDone(toDo.id)}>
              <MdOutlineDoneOutline />
            </div>
            </div>
           
            </div>
            <div className={styles.time}>
                  {toDo.date}
                </div> 
            </div>
             
            </form>
        )
      }
    
    </Draggable>
  
  
    </>
  )
}

export default SingleItem