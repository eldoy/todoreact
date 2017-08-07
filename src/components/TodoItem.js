import React from 'react';

export default class TodoItem extends React.Component{

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
