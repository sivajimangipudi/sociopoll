/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minify the intermediate concatenated CSS stylesheet which was
 * prepared by the `concat` task at `.tmp/public/concat/production.css`.
 *
 * Together with the `concat` task, this is the final step that minifies
 * all CSS files from `assets/styles/` (and potentially your LESS importer
 * file from `assets/styles/importer.less`)
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-cssmin
 *
 */
module.exports = function(grunt) {

  grunt.config.set('cssmin', {
    dist: {
      src: ['.tmp/public/concat/production.css'],
      dest: '.tmp/public/min/production.min.css'
    },
    distb: {
      src: ['.tmp/public/concat/backendproduction.css'],
      dest: '.tmp/public/min/backendproduction.min.css'
    },
    dista: {
      src: ['.tmp/public/concat/authproduction.css'],
      dest: '.tmp/public/min/authproduction.min.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
