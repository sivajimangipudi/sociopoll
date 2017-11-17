/**
 * Poll.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required : true
    },
    slug: {
      type: 'string',
    },
    duration: {
      type: 'string',
    },
    option_a: {
      type: 'text',
    },
    option_b: {
      type: 'text',
    },
    option_c: {
      type: 'text',
    },
    option_d: {
      type: 'text',
    },
    option_e: {
      type: 'text',
    },
    correct_option: {
      type: 'text',
    },
    trending: {
      type: 'boolean',
    },
    popular: {
      type: 'boolean',
    },
    visibility: {
      type: 'boolean',
    },
    identify: {
      type: 'boolean',
    },
    status: {
      type: 'boolean',
    },
    category_id: {
    	model: 'category',
    	required: true
    },
    created_by:{
    	model: 'user',
    	required : true
    },
  },
  beforeCreate: function (poll, cb) {
    if(_.isEmpty(poll.slug)) {
        let  convertToSlug = (Text) => {
              return Text
              .toLowerCase()
              .replace(/ /g,'-')
              .replace(/[^\w-]+/g,'');
        }
        var slug = convertToSlug(poll.title);

        Poll.find({ slug: { 'contains': slug }}).exec(function(err,data){
            if(_.size(data)==0){
                poll.slug = slug;
                // console.log('---data if cr---');
                // console.log(data);
                cb();
            }else{
                // console.log('---data else cr---');
                poll.slug = slug+'-'+(_.size(data)+1);
                cb();
            }
        })
    }
  },
  beforeUpdate: function (poll, cb) {
    // console.log('poll=');
    // console.log(poll);
    if(_.isEmpty(poll.slug)) {
        let  convertToSlug = (Text) => {
              return Text
              .toLowerCase()
              .replace(/ /g,'-')
              .replace(/[^\w-]+/g,'');
        }
        var slug = convertToSlug(poll.title);
        // console.log('slug=');
        // console.log(slug);
        Poll.find({ slug: { 'contains': slug }}).exec(function(err,data){
          // console.log('data=');
          // console.log(data);
            if(_.size(data)==1){
                poll.slug = slug;
                // console.log('---data if up---');
                // console.log(data);
                cb();
            }else{
                poll.slug = slug+'-'+(_.size(data)+1);
                //poll.slug = poll.slug;//+'-'+(_.size(data)+1);
                // console.log('---data else up ---');
                // console.log(poll.slug);
                cb();
            }
        })
    }
  },
};
