import React from 'react';
import TodoItem from './TodoItem';
import Util from '../lib/util';

export default class TodoList extends React.Component{
  render() {
    let list = this.props.todos.map((item) => {
      return <TodoItem id={item.id} desc={item.desc} key={item.id} date={Util.string(item.date)} completed={item.completed} todo={this.props.todo} />
    })

    return(
      <ul className="todo-list">{list}</ul>
    )
  }
}
