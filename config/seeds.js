/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
	user: {
		data: [{
				first_name : "Sivaji",
		    last_name : "Mangipudi",
		   	email : "a@igenero.com",
		    mobile : "8008007796",
		    password : "1231231",
		    profile_pic_url: "profile_pic_url",
		    facebookId: 'fbid_admin',
		    location: 'Hyderabad',
		    role : "admin",
		    username : "a@igenero.com"
		},
		{
				first_name : "Sivaji",
		    last_name : "Mangipudi",
		   	email : "s@igenero.com",
		    mobile : "8008007796",
		    password : "1231231",
		    profile_pic_url: "profile_pic_url",
		    facebookId: 'fbid_user',
		    location: 'Hyderabad',
		    role : "user",
		    username : "s@igenero.com"
		}],
		unique: ['email'],
    	overwrite: false
	}
	// ,
	// category:{
	// 	data :[{
	// 		title: "Test Category 1"
	// 	}],
	// 	overwrite: false
	// }
	// poll: {
	// 	data: [{
	// 			title: "Test Poll 1",
	// 			created_by	: "5a02855297b24db2b9c9b160"
	// 	},
	// 	{
	// 			title: "Test Poll 2",
	// 			created_by	: "5a02855297b24db2b9c9b160"
	// 	}],
  //   	overwrite: false
	// }
}
