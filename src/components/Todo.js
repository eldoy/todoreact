import React from 'react';
import TodoList from './TodoList'
import Util from '../lib/util';

export default class Todo extends React.Component {

  constructor() {
    super();
    this.state = {
      add: '',
      todos: [
        {id: Util.fakeId(), desc: 'Hello world', date: new Date(), completed: false}
      ]
    }
  }

  addItem() {
    let desc = this.state.add.trim();
    if(desc === '') {
      this.input.focus();
    } else {
      let item = {id: Util.fakeId(), desc: desc, date: new Date(), completed: false};
      this.setState({todos: [item].concat(this.state.todos), add: ''});
    }
  }

  removeItem(el) {
    // Remove the item which has the same id as the one we are deleting
    let todos = this.state.todos.filter(function(item) {
      return item.id !== el.props.id;
    });

    // Update state
    this.setState({todos: todos});
  }

  saveItem(el) {
    // Make a copy of todos
    let todos = this.state.todos.slice();

    // Find the index (position) of item in array
    let index = todos.findIndex(x => x.id === el.props.id);

    // Find the item and update it
    todos[index] = Object.assign(todos[index], {desc: el.state.desc});

    // Update state
    this.setState({todos: todos});
  }

  handleAddChange(event) {
    this.setState({add: event.target.value});
  }

  render() {
    return(
      <div className="todo">
        <h1>TODO list</h1>
        <input type="text" ref={(el) => {this.input = el}} value={this.state.add} onChange={this.handleAddChange.bind(this)} />
        <button onClick={this.addItem.bind(this)}>Add</button>
        <TodoList todos={this.state.todos} todo={this} />
      </div>
    )
  }
}
