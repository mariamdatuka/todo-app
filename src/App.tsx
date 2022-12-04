import React from 'react'
import AddItem from './components/AddItem/AddItem'
import { useState } from 'react'
import Todo from './components/ToDoItem/Todo'
import { ToDoBox } from './interfaces/Interface'
import {DragDropContext, DropResult} from  'react-beautiful-dnd'


const App = () => {

  const [item, setItem] = useState<string>('')
  const [todos, setToDos] = useState<ToDoBox[]>([])

  const date=new Date();
  const time=date.getHours() + ":" + date.getMinutes() ;

  const addItem=(e:React.FormEvent)=>{
    e.preventDefault();

    if(item){
    setToDos([...todos,{id:Date.now(), todo:item, isDone:false, date:time}])
    setItem('');
    }
  }

  const onDragEnd = (result:DropResult)=>{
  const {source, destination} = result;
  if(!destination) return;

      let add:any;
      let active=todos;

      if(source.droppableId==='container'){
        add=active[source.index];
        active.splice(source.index,1)
      }

      if(destination.droppableId==='container'){
        active.splice(destination.index,0,add)
      } 
    
      setToDos(active);
  }

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
       <AddItem item={item} setItem={setItem} addItem={addItem} time={time}/>
       <Todo todos={todos} setToDos={setToDos}/>
    </DragDropContext>
    </>
  )
}

export default App
