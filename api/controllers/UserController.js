/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcryptjs');
 var salt = '$2a$10$0x/vXvP8xiGOuFIywC/ZWu';
 var moment = require('moment');
 // sails.config[404](req, res);
 //  // else
 //  res.send('Some content');
 module.exports = {
  userlist: function(req,res){
    User.find().exec(function(err,users){
      if(err){
        return res.redirect('/dashboard');
      }
      else{
        data = { users: users };
        return res.view('backend/protected/user/list',{layout : 'backend_layout',data:data,moment:moment });
      }
    })
  },
  user_create: function(req,res){
    // if(req.body.password == req.body.confirm_password){
      bcrypt.hash(req.body.password, salt, function(err, hash) {
          data = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            mobile : req.body.mobile,
            username : req.body.username,
            role : req.body.role,
            location : req.body.location,
            password : hash,
            status : req.body.status,
          }
          User.create(data).exec(function(err,data){
            if(err){
               req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
               res.redirect('/userlist');
             } else {
            req.flash('message','<p class="alert alert-success text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>user with password updated successfully..</p>');
            res.redirect('/userlist');
          }
        });
      });
    // }
  },
  userprofile : function(req,res){
   User.findOne({id:req.param('id')}).exec(function(err,user){
     data = user
     return res.view('backend/protected/user/single',{layout : 'backend_layout',data:data,moment:moment });
   });
 },
  updateprofile : function(req,res){
   User.findOne({id:req.param('id')}).exec(function(err,user){
     if(req.body.password == ''){
       User.update({id:req.param('id')}, {
         first_name : req.body.first_name,
         last_name : req.body.last_name,
        //  email : req.body.email,
         mobile : req.body.mobile,
         username : req.body.username,
         role : req.body.role,
         facebookId : req.body.facebookId,
         googleId : req.body.googleId,
         location : req.body.location,
        //  password : hash, //req.body.password,
         status : req.body.status,
       }).exec(function(err,data){
         if(err){
            req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
            res.redirect('/userlist');
          } else {
         req.flash('message','<p class="alert alert-success text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>user updated successfully..</p>');
         res.redirect('/userlist');
       }
     });
     } else {
       if(req.body.password == req.body.confirm_password){
         password = '';
         bcrypt.hash(req.body.password, salt, function(err, hash) {
             User.update({id:req.param('id')}, {
               first_name : req.body.first_name,
               last_name : req.body.last_name,
              //  email : req.body.email,
               mobile : req.body.mobile,
               username : req.body.username,
               role : req.body.role,
               facebookId : req.body.facebookId,
               googleId : req.body.googleId,
               location : req.body.location,
               password : hash,
               status : req.body.status,
             }).exec(function(err,data){
               if(err){
                  req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
                  res.redirect('/userlist');
                } else {
               req.flash('message','<p class="alert alert-success text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>user with password updated successfully..</p>');
               res.redirect('/userlist');
             }
           });
         });
       }
     }
   });
 },
  loginform : function(req,res){
     	User.findOne({
        or: [{email:req.body.email},
              {username:req.body.email}
            ]}).exec(function(err,user){
           			if(err){
           				req.session.authenticated = false;
           				return res.redirect('/');
         			  }
           			if(!user){
           				req.session.authenticated = false;
                  req.flash('message', _.isNull(err) ? '<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please check your emaill or username..</p>' : '<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
           				return res.redirect('/');
           			}
                else{
                  bcrypt.hash(req.body.password, salt, function(err, hash) {
                      if (err) {
                      	req.session.authenticated = false;
                          return res.redirect('/');
                      } else {
          				          if(user.password == hash && user.role == 'admin'){
                          		req.session.authenticated = true;
                          		temp_user = user;
                          		delete temp_user.password;
              					      req.session.user = temp_user;
                          		return res.redirect('/dashboard');
                          	}else{
                          		req.session.authenticated = false;
                              req.flash('message', _.isNull(err) ? '<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please check your password..</p>' : '<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
                          		// return res.send(user);
                              console.log(user)
                          		return res.redirect('/');
                          	}
                      }
                  });
           			}
   		     })},
  forgotpassword : function(req,res){
     res.view('backend/forgotpassword',{layout : 'backend_auth_layout'});
  },
 	resetpassword: function(req,res) {
 		if(req.body.password == req.body.confirm_password) {
 			User.findOne({email:req.body.email}).exec(function(err,user){
 				if(err || user == undefined){
 					res.send('no user found');
 				} else {
 					temp = user;
 					bcrypt.hash(req.body.password, salt, function(err, hash) {
 						User.update({id:temp.id}, {password:hash}).exec(function(err,data){
 							if(err){
 								res.send(err)
 							} else {
 								res.send('password updated successfully');
 							}
 						});
 					});
 				}
 			});
 		} else {
 			return res.send('Invalid password and confirm password..');
 		}
 	},
 	logout: function(req,res) {
 		req.session.user = undefined;
 		req.session.authenticated = false;
 		return res.redirect('/');
 	},
 };
