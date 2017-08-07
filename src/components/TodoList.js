import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component{
  render() {
    let list = this.props.todos.map((item) => {
      return <TodoItem item={item} key={item.id} todo={this.props.todo} />
    })

    return(
      <ul className="todo-list">{list}</ul>
    )
  }
}
