'use-strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      },
      all: {
        src: [
          'Gruntfile.js',
          'js/*.js',
          'js/class/*.js',
        ]
      },
      ignores: [
          'js/JQuery.js',
          'js/helper.js'
      ]
    },


    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    cssbeautifier : {
      files : ['./css/*.css']
    },
    jsbeautifier : {
      files : ['./js/*.js', './js/class/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cssbeautifier');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Default task(s).
    grunt.registerTask('default', [
    'jshint:all',
    'cssbeautifier',
    'jsbeautifier'
  ]);

};