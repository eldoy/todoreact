import React from 'react';
import Util from '../lib/util';

class TodoItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      mode: 'default',
      completed: this.props.completed,
      desc: this.props.desc
    }
  }

  handleDelete() {
    this.setState({mode: 'delete'});
  }

  handleConfirm() {
    this.setState({mode: 'default'});
    this.props.todo.removeItem(this);
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

  handleCancel() {
    this.setState({mode: 'default'});
  }

  handleChange(event) {
    this.setState({desc: event.target.value});
  }

  handleSave() {
    this.setState({mode: 'default'});
    this.props.todo.saveItem(this);
  }

  handleCompleted() {
    this.setState({completed: !this.state.completed});
  }

  render() {
    switch(this.state.mode) {
      case 'edit':
        return(
          <li>
            <input type="text" value={this.state.desc} onChange={this.handleChange.bind(this)} />
            <button onClick={this.handleSave.bind(this)}>Save</button>
          </li>
        )
      case 'delete':
        return(
          <li>
            Delete {this.props.desc}?
            <button onClick={this.handleConfirm.bind(this)}>Yes</button>
            <button onClick={this.handleCancel.bind(this)}>No</button>
          </li>
        )
      default:
        let cs = {};
        if(this.state.completed) {
          cs = {textDecoration: 'line-through'};
        }
        return(
          <li>
            <input type="checkbox" checked={this.state.completed} onChange={this.handleCompleted.bind(this)} />
            <span style={cs}>{this.props.desc}</span>
            <span className="item-date">{this.props.date}</span>
            <button onClick={this.handleEdit.bind(this)}>Edit</button>
            <button onClick={this.handleDelete.bind(this)}>Delete</button>
          </li>
        )
    }
  }
}

class TodoList extends React.Component{
  render() {
    let list = this.props.todos.map((item) => {
      return <TodoItem id={item.id} desc={item.desc} key={item.id} date={Util.string(item.date)} completed={item.completed} todo={this.props.todo} />
    })

    return(
      <ul className="todo-list">{list}</ul>
    )
  }
}

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
