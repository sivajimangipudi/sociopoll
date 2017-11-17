/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    controller : 'static',
    action : 'index'
  },
  '/blank': {
    controller : 'static',
    action : 'blank'
  },
  '/dashboard': {
    controller : 'static',
    action : 'dashboard'
  },
  '/home': {
    view: 'homepage'
  },
  //Users
  'POST /loginform': {
    controller : 'user',
    action : 'loginform'
  },
  'POST /user_create': {
    controller : 'user',
    action : 'user_create'
  },
  '/forgotpassword': {
    controller : 'user',
    action : 'forgotpassword'
  },
  '/userlist': {
    controller : 'user',
    action : 'userlist'
  },
  '/profile/:id': {
    controller : 'user',
    action : 'userprofile'
  },
  'POST /updateprofile/:id': {
    controller : 'user',
    action : 'updateprofile'
  },
  'POST  /resetpassword': {
    controller : 'user',
    action : 'resetpassword'
  },
  '/logout': {
    controller : 'user',
    action : 'logout'
  },
//category category_list category_create category_show category_update
  '/category_list' :{
    controller : 'category',
    action : 'category_list'
  },
  'POST /category_create' :{
    controller : 'category',
    action : 'category_create'
  },
  '/category_show/:id': {
    controller : 'category',
    action : 'category_show'
  },
  'POST /category_update/:id': {
    controller : 'category',
    action : 'category_update'
  },
//poll poll_list poll_create poll_show poll_update
  '/poll_list' :{
    controller : 'poll',
    action : 'poll_list'
  },
  'POST /poll_create' :{
    controller : 'poll',
    action : 'poll_create'
  },
  '/poll_show/:id': {
    controller : 'poll',
    action : 'poll_show'
  },
  'POST /poll_update/:id': {
    controller : 'poll',
    action : 'poll_update'
  },
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
