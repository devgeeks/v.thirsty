/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>' + '\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage : "" %>' + '\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' + '\n' +
        ' * License: <%= _.pluck(pkg.licenses, "type").join(", ") %> (<%= _.pluck(pkg.licenses, "url").join(", ") %>)' + '\n' +
        ' */\n\n'
    },
    concat: {
      options: {
        banner:  '<%= meta.banner %>' + '// GENERATED FILE - DO NOT EDIT\n'
      },
      dist: {
        src: ['src/collections/*.js', 'src/views/*.js', 'src/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: [
          '<%= concat.dist.dest %>'
        ],
        dest: 'www/js/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/ionicons/css/*'], dest: 'www/components/ionicons/css/'},
          {expand: true, flatten: true, src: ['bower_components/ionicons/fonts/*'], dest: 'www/components/ionicons/fonts/'},
          {expand: true, flatten: true, src: ['bower_components/moment/moment.js'], dest: 'www/components/moment/'},
          {expand: true, flatten: true, src: ['bower_components/handlebars/handlebars.runtime.js'], dest: 'www/components/handlebars/'},
          {expand: true, flatten: true, src: ['bower_components/underscore/underscore*.js'], dest: 'www/components/underscore/'},
          {expand: true, flatten: true, src: ['bower_components/backstack/backstack*.js'], dest: 'www/components/backstack/'},
          {expand: true, flatten: true, src: ['bower_components/backbone/backbone*.js'], dest: 'www/components/backbone/'},
          {expand: true, flatten: true, src: ['bower_components/fastclick/lib/fastclick.js'], dest: 'www/components/fastclick/'}
        ]
      }
    },
    watch: {
      files: [
        '<%= jshint.files %>'
      ],
      tasks: ['jshint','copy','concat','handlebars','min']
    },
    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },
        files: {
          "www/js/templates.js": ["tpl/*.hbs"]
        }
      }
    },
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      debug_ios: {
        command: 'cordova emulate ios'
      },
      debug_android: {
        command: 'cordova run android'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        devel: true,
        eqnull: true,
        browser: true,
        globals: {
          cordova: true,
          jQuery: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Custom tasks
  grunt.registerTask('min', ['uglify']); // polyfil for uglify
  grunt.registerTask('debug','Create a debug build', function(platform) {
    grunt.task.run('jshint','copy','concat','handlebars','min');
    grunt.task.run('shell:debug_' + platform);
  });

  // Default task
  grunt.registerTask('default', ['jshint','copy','concat','handlebars','min']);

};
