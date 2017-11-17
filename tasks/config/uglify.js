/**
 * `uglify`
 *
 * ---------------------------------------------------------------
 *
 * Minify client-side JavaScript files using UglifyJS.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    dist: {
      src: ['.tmp/public/concat/production.js'],
      dest: '.tmp/public/min/production.min.js'
    },
    distb: {
      src: ['.tmp/public/concat/backendproduction.js'],
      dest: '.tmp/public/min/backendproduction.min.js'
    },
    dista: {
      src: ['.tmp/public/concat/authproduction.js'],
      dest: '.tmp/public/min/authproduction.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
