/**
 * StaticController
 *
 * @description :: Server-side logic for managing Statics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function(req,res){
    res.view('backend/index',{layout : 'backend_auth_layout'});
  },
	blank : function(req,res){
    res.view('backend/protected/blank',{layout : 'backend_layout'});
  },
	dashboard : function(req,res){
		let user_count = [];
		User.find().exec(function(err,users){
			if(!err){
				Category.find().exec(function(err,categories){
					if(!err){
						Poll.find().exec(function(err,polls){
							if(!err){
								trending = polls.filter(function(item){
									return item.trending == true
								});
								popular = polls.filter(function(item){
									return item.popular == true
								});
								data = { user_count: users, category_count: categories, poll_count: polls, trending_count:trending, popular_count:popular}
								res.view('backend/protected/dashboard',{layout : 'backend_layout', data:data});
							}
							else {
								data = { user_count: users, category_count: 0, poll_count: 0, trending_count:0, popular_count:0 }
								res.view('backend/protected/dashboard',{layout : 'backend_layout', data:data});
							}
						})
					}
					else {
						data = { user_count: users, category_count: 0, poll_count: 0, trending_count:0, popular_count:0 }
						res.view('backend/protected/dashboard',{layout : 'backend_layout', data:data});
					}
				})
			}
			else {
				data = { user_count: 0, category_count: 0, poll_count: 0, trending_count:0, popular_count:0 }
				res.view('backend/protected/dashboard',{layout : 'backend_layout', data:data});
			}
		})
		//res.view('backend/protected/dashboard',{layout : 'backend_layout', user_count:user_count});

		// res.view('backend/protected/dashboard',{layout : 'backend_layout', user_count: 0});
		// console.log('out:'+user_count)


  },
};
