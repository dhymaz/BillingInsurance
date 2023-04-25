import React from "react";
import { connect } from "react-redux";
const TodoApp= ({ todos }) => {
  return(
    <div>
      <h1>todo app</h1>
      {todos.map(todo =>
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = state => ({
  todos: state.todoReducer.todos
})
export default connect(mapStateToProps)(TodoApp);