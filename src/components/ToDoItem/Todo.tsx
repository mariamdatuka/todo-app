import React from 'react'
import { ToDoBox } from '../../interfaces/Interface';
import styles from './Todo.module.css';
import SingleItem from '../SingleItem/SingleItem';
import { Droppable } from 'react-beautiful-dnd';


interface Props{
  todos:ToDoBox[];
  setToDos:React.Dispatch<React.SetStateAction<ToDoBox[]>>;
}

const Todo = ({todos, setToDos}: Props) => {
  return (
    <>
    <div>
    <Droppable droppableId='container'>
      {
        (provided)=>(
          <div 
          className={styles.container} 
          ref={provided.innerRef}
          {...provided.droppableProps}>
         {todos.map((toDo, index)=>(
         <SingleItem
         index={index}
         toDo={toDo}
         key={toDo.id}
         todos={todos}
         setToDos={setToDos}/>
     ))}
     {provided.placeholder}
     </div>
        )
      }
     </Droppable>
     </div>
    </>
  )
}

export default Todo