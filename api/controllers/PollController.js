/**
 * PollController
 *
 * @description :: Server-side logic for managing polls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
	poll_list: function(req,res){
		Poll.find().populate('created_by').populate('category_id').exec(function(err,polls){
	    if(err){
				req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
	      return res.redirect('/dashboard');
	    }
	    else{
				User.find().exec(function(err,user){
					if(err){
						req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
			      return res.redirect('/dashboard');
					}
					else {
						Category.find().exec(function(err,categories){
							if(err){
								req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
					      return res.redirect('/dashboard');
							} else {
								data = { polls: polls, user:user,categories:categories}
					      return res.view('backend/protected/poll/list',{layout : 'backend_layout',data:data,moment:moment });
							}
						})
					}
	    })
	  }
	})
	},
	poll_create: function(req,res){
		// res.send(req.body);
		data = {
			title: req.body.title,
			duration: req.body.duration,
			option_a: req.body.option_a,
			option_b: req.body.option_b,
			option_c: req.body.option_c,
			option_d: req.body.option_d,
			option_e: req.body.option_e,
			correct_option: req.body.correct_option,
			created_by: req.body.created_by,
			category_id: req.body.category_id,
			trending: req.body.trending,
			popular: req.body.popular,
			visibility: req.body.visibility,
			status: req.body.status
		}
			Poll.create(data).exec(function(err, data) {
				if(err) {
					return res.serverError(err);
				} else{
					req.flash('message','<p class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Poll added successfully..</p>');
					res.redirect('/poll_list');
				}
			});
	},
	poll_show: function(req,res){
		Poll.findOne({id:req.param('id')}).exec(function(err,polls){
	    if(err){
	      return res.redirect('back');
	    }
	    else {
					User.find().exec(function(err,user){
						if(err){
							req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
				      return res.redirect('/dashboard');
						}
						else {
							Category.find().exec(function(err,categories){
								if(err){
									req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
						      return res.redirect('/dashboard');
								} else {
									data = { polls, user:user,categories:categories}
						      return res.view('backend/protected/poll/single',{layout : 'backend_layout',data:data,moment:moment });
								}
							})
						}
		    })
	    }
	  })
	},
	poll_update: function(req,res){
			data = {
				title: req.body.title,
				duration: req.body.duration,
			  option_a: req.body.option_a,
			  option_b: req.body.option_b,
			  option_c: req.body.option_c,
			  option_d: req.body.option_d,
			  option_e: req.body.option_e,
			  correct_option: req.body.correct_option,
			  trending: req.body.trending,
				popular: req.body.popular,
				visibility: req.body.visibility,
				created_by: req.body.created_by,
			  category_id: req.body.category_id,
			  status: req.body.status,
			}
			Poll.update({id:req.param('id')},data).exec(function(err, updated){
			  if (err) {
			    return res.negotiate(err);
			  } else {
					req.flash('message','<p class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Poll updated successfully..</p>');
			  	res.redirect('/poll_list');
			  }
			});
	},
};
