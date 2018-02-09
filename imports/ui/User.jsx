import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
      <li className="list-group-item">
        <span className="li-name">{this.props.user.name}</span>
        <span className="li-email">{this.props.user.email}</span>
        <span className="li-phone">{this.props.user.phone}</span>
      </li>
    );
  }
}
