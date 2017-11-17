/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title : {
  		type: 'string',
  		required : true
  	},
    slug : {
      type: 'string'
    },
    image : {
      type: 'string'
    },
    status: {
      type: 'boolean',
      defaultsTo: 0
    },
    poll : {
      collection : 'poll',
      via : 'category_id'
    }
  },
  beforeCreate: function (category, cb) {
    if(_.isEmpty(category.slug)) {
        let  convertToSlug = (Text) => {
              return Text
              .toLowerCase()
              .replace(/ /g,'-')
              .replace(/[^\w-]+/g,'');
        }
        var slug = convertToSlug(category.title);

        Category.find({ slug: { 'contains': slug }}).exec(function(err,data){
            if(_.size(data)==0){
                category.slug = slug;
                // console.log('---data if cr---');
                // console.log(data);
                cb();
            }else{
                //console.log('---data else cr---');
                category.slug = slug+'-'+(_.size(data)+1);
                cb();
            }
        })
    }
  },
  beforeUpdate: function (category, cb) {
    // console.log('category=');
    // console.log(category);
    if(_.isEmpty(category.slug)) {
        let  convertToSlug = (Text) => {
              return Text
              .toLowerCase()
              .replace(/ /g,'-')
              .replace(/[^\w-]+/g,'');
        }
        var slug = convertToSlug(category.title);
        // console.log('slug=');
        // console.log(slug);
        Category.find({ slug: { 'contains': slug }}).exec(function(err,data){
          // console.log('data=');
          // console.log(data);
            if(_.size(data)==1){
                category.slug = slug;
                // console.log('---data if up---');
                // console.log(data);
                cb();
            }else{
                category.slug = slug+'-'+(_.size(data)+1);
                //category.slug = category.slug;//+'-'+(_.size(data)+1);
                // console.log('---data else up ---');
                // console.log(category.slug);
                cb();
            }
        })
    }
  },
};
