/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var bcrypt = require('bcryptjs');
 var salt = '$2a$10$0x/vXvP8xiGOuFIywC/ZWu';
 module.exports = {

   attributes: {
 	// id: {
  //  		type: 'integer',
  //  		autoIncrement: true,
  //  		primaryKey: true
  //  	},
 	first_name: {
 		type: 'string',
 		required: true
 	},
 	last_name: {
 		type: 'string',
 		required: true
 	},
 	email: {
 		type: 'string',
 		unique: true,
 		required: true
 	},
 	username: {
 		type: 'string',
 		unique: true,
 		required: true
 	},
 	mobile: {
 		type: 'string',
 		size: 10
 	},
 	password: {
  	type: 'string',
  	required: false
 	},
 	profile_pic_url: {
 		type: 'string',
 		required: false
 	},
 	facebookId: {
 		type: 'string',
 		required: false
 	},
 	googleId: {
 		type: 'string',
 		required: false
 	},
 	location: {
 		type: 'string',
 		required: false
 	},
 	role: {
 		type: 'string',
 		required: false
 	},
 	last_login: {
 		type: 'datetime'
 	},
 	status: {
 		type: 'string'
 	},
  polls : {
    collection : 'poll',
    via : 'created_by'
  },
 	toJSON :function() {
 		var obj = this.toObject();
 		delete obj.password;
 		return obj;
 	}
   },
 	beforeCreate: function(user, cb){
 		if (_.isEmpty(user.username)) {
       		user.username = user.email;
     	}
 		bcrypt.hash(user.password,salt,function(error, hash){
 			if(error){
 				cb(error)
 			} else{
 				user.password = hash;
 				cb();
 			}
 		})
 	}
 };
