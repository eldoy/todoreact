import React from 'react';
import Util from '../lib/util';

export default class TodoItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      mode: 'default',
      completed: this.props.item.completed,
      desc: this.props.item.desc
    }
  }

  handleDelete() {
    this.setState({mode: 'delete'});
  }

  handleConfirm() {
    this.setState({mode: 'default'});

    // Remove the item which has the same id as the one we are deleting
    let todos = this.props.todo.state.todos.filter((item) => {
      return item.id !== this.props.item.id;
    });

    // Update state
    this.props.todo.setState({todos: todos});
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

    // Make a copy of todos
    let todos = this.props.todo.state.todos.slice();

    // Find the index (position) of item in array
    let index = todos.findIndex(x => x.id === this.props.item.id);

    // Find the item and update it
    todos[index] = Object.assign(todos[index], {desc: this.state.desc});

    // Update state
    this.setState({todos: todos});
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
            Delete {this.props.item.desc}?
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
            <span style={cs}>{this.props.item.desc}</span>
            <span className="item-date">{Util.string(this.props.item.date)}</span>
            <button onClick={this.handleEdit.bind(this)}>Edit</button>
            <button onClick={this.handleDelete.bind(this)}>Delete</button>
          </li>
        )
    }
  }
}
