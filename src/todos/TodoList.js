import React,{useEffect} from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import {connect} from 'react-redux';
import {loadTodos, removeTodoRequest, completeTodoRequest} from "./thunks";
import { getTodosLoading, getCompleteTodo, getIncompleteTodos} from './selector';
import styled from 'styled-components';

const  ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

function TodoList( { completedTodos, incompletedTodos, isLoading, onRemovePressed, onCompletedPressed, startLoadingTodos} ) {

  useEffect(
    ()=>{
      startLoadingTodos()
    },[]
  )

  const loadingMessage = <div>Loading Todos ...</div>
  const content = (
      <ListWrapper>
        <NewTodoForm />
        <h3>Incomplete: </h3>
        {incompletedTodos.map(todo=> <TodoListItem  
                    todo={todo}
                    onRemovePressed = {onRemovePressed}
                    onCompletedPressed = {onCompletedPressed} 
                    /> 
        )}

        <h3>Complete: </h3>
        {completedTodos.map(todo=> <TodoListItem  
                    todo={todo}
                    onRemovePressed = {onRemovePressed}
                    onCompletedPressed = {onCompletedPressed} 
                    /> 
        )}
      </ListWrapper>
  );

  return isLoading ? loadingMessage
                   : content ;

}

const mapStateToProps = (state) => ({
    isLoading : getTodosLoading(state),
    completedTodos : getCompleteTodo(state) ,
    incompletedTodos : getIncompleteTodos(state) ,
});

const mapDispatchToProps = dispatch =>({
    onRemovePressed : id => dispatch(removeTodoRequest(id)),
    onCompletedPressed : id => dispatch(completeTodoRequest(id)),
    startLoadingTodos : () => dispatch(loadTodos())
});
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);