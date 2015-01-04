module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      styles: {
        files: ['style/main.scss'],
        tasks: ['sass']
      },
      scripts : {
        files: ['src/**'],
        tasks: ['react', 'concat']
      }
    },
    react: {
      dist: {
        files: [{expand: true, cwd: 'src/', src: ['*.jsx'], dest: 'tmp/jsx', ext: 'js' }]
      }
    },
    concat : {
      dist: {
        src: ['tmp/jsx/*'],
        dest: 'public/js/fbindex.js'
      }
    },
    clean: ['tmp/jsx/'],
    sass: {
      dist: {
        files: {
          'public/css/main.css': 'style/main.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'bower_components/materialize/dist',  src: ['js/*', 'font/**'], dest: 'public/' },
          { expand: true, cwd: 'bower_components/react/', src: ['react.*', 'JSXTransformer.js'], dest: 'public/js/' },
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'react', 'concat', 'copy', 'clean']);

};