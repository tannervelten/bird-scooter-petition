import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('users');

Meteor.methods({
  'users.insert'(name, email, phone) {
    check(name, String);
    check(email, String);
    check(phone, String);

    Users.insert({
      name,
      email,
      phone,
      createdAt: new Date(),
    });
  },
})
