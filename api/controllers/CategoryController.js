/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
	category_list: function(req,res){
		Category.find().exec(function(err,categories){
	    if(err){
				req.flash('message','<p class="alert alert-danger text-center"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+err+'</p>');
	      return res.redirect('/dashboard');
	    }
	    else{
	      data = { categories: categories }
	      return res.view('backend/protected/category/list',{layout : 'backend_layout',data:data,moment:moment });
	    }
	  })
	},
	category_create: function(req,res){
		// res.send(req.body);
		if(req.body.image == ''){
			data = {
				title:req.body.title,
				status:req.body.status
			}
			Category.create(data).exec(function(err, data) {
				if(err) {
					return res.serverError(err);
				} else{
					req.flash('message','<p class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Category added successfully..</p>');
					res.redirect('/category_list');
				}
			});
		}
		else{
			var filename_val = '';
			req.file('image').upload({
				dirname: '../../assets/uploads/categories/',
				maxBytes: 1000000,
				saveAs: function(file, cb) {
					filename_val = file.filename,
	    			cb(null, file.filename);
	  			}
			},
			function whenDone(err, uploadedFiles) {
				if (err) return res.serverError(err);
		      	else {
							data = {
								title:req.body.title,
								image:filename_val,
								status:req.body.status
							}
		      		Category.create(data).exec(function(err, data) {
		      			if(err) {
		      				return res.serverError(err);
		      			} else{
									req.flash('message','<p class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Category added successfully..</p>');
		      				res.redirect('/category_list');
		      			}
		      		});
		      }
			});
		}
	},
	category_show: function(req,res){
		Category.findOne({id:req.param('id')}).exec(function(err,categories){
	    if(err){
	      return res.redirect('back');
	    }
	    else{
	      data = categories;
	      return res.view('backend/protected/category/single',{layout : 'backend_layout',data:data,moment:moment });
	    }
	  })
	},
	category_update: function(req,res){
		if(req.body.image == ''){
			data = {
				title : req.body.title,
				status : req.body.status,
			}
			Category.update({id:req.param('id')},data).exec(function(err, updated){
			  if (err) {
			    return res.negotiate(err);
			  } else {
					// console.log(updated)
					req.flash('message','<p class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Category updated successfully..</p>');
			  	res.redirect('/category_list');
			  }
			});
		} else {
			// res.send(req.body.image);
			var filename_val = '';
			req.file('image').upload({
				dirname: '../../assets/uploads/categories/',
				maxBytes: 1000000,
				saveAs: function(file, cb) {
					filename_val = file.filename,
	    			cb(null, file.filename);
	  			}
			},
			function whenDone(err, uploadedFiles) {
					if (err) return res.serverError(err);
	      	else {
						console.log(filename_val)
						data = {
							title : req.body.title,
							image	: filename_val,
							status : req.body.status
						}
						console.log(data)
	      		Category.update({id:req.param('id')},data).exec(function(err, data) {
	      			if(err) {
	      				return res.serverError(err);
	      			} else{
								req.flash('message','<p class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Category updated successfully..</p>');
	      				res.redirect('/category_list');
	      			}
	      		});
	      }
		});
		}
	},
};
