import React,{useState} from 'react';
import {connect} from 'react-redux';
import { addTodoRequest } from './thunks';
import {getTodos} from './selector'
import styled from 'styled-components';

const TodoFormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

function NewTodoForm( {todos, onCreatePressed} ) {
    const[inputValue, setInputValue]=useState('');
  return (
    <TodoFormContainer>

        <NewTodoInput 
        type='text'
        value={inputValue}
        onChange={ (e)=> setInputValue(e.target.value) }
        placeholder='Type your new todo here' 
        />

        <NewTodoButton
            onClick={ ()=> {
                const isDuplicateText = todos.some( todo => todo.text === inputValue);
                if( !isDuplicateText){
                    onCreatePressed(inputValue);
                    setInputValue(' ');
                }else{
                    alert(`You have entered duplicate text : ${inputValue}`)
                }

            } } 
            className='new-todo-button'>
            Create Todo
        </NewTodoButton>
    </TodoFormContainer>
  )
}

const mapStateToProps = state => ( {
    todos : getTodos(state),
} );

const mapDispatchToProps = dispatch => ( {
    onCreatePressed : (text) => dispatch(addTodoRequest(text)),
} );
export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm)