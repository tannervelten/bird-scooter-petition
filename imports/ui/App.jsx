import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Users } from '../api/users.js';
import User from './User.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: ''
    }
  }

  renderUsers() {
    return this.props.users.map((user) => (
      <User key={user._id} user={user} />
    ));
  }

  handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleInputSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === '' || email === '' || phone === '') {
      alert('Fill out all fields to sign the petition.');
      return;
    }
    Meteor.call('users.insert', name, email, phone);
    alert('Your name has been added to the petition, thank you for your support!');
    this.setState({
      name: '',
      email: '',
      phone: ''
    });
  }

  render() {
    const { handleInputChange, handleInputSubmit } = this;
    const { name, email, phone } = this.state;

    return (
      <div>
        <header className="jumbotron text-center">
          <h1>Petition Form</h1>
          <p>Join the fight against bird scooters across UCLA campus today!</p>
        </header>

        <div className="container">
          <form className="petitionInfoForm form-group" onSubmit={handleInputSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <label>
                  Full name:
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}/><br/>
                </label>
              </div>
              <div className="col-sm-4">
                <label>
                  Email address:
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleInputChange}/><br/>
                </label>
              </div>
              <div className="col-sm-4">
                <label>
                  Phone number:
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}/>
                </label>
              </div>
            </div>
            <div className="submit-btn-div">
            <button className="submit-btn btn btn-primary" onClick={handleInputSubmit}>
              Submit
            </button>
          </div>
          </form>

          <div>
            <h4>See who else has signed:</h4>
            <ul className="list-group">
              {this.renderUsers()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    users: Users.find({}).fetch(),
  };
})(App);
