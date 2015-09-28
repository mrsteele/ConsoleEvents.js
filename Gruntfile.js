module.exports = function (grunt) {
	"use strict";
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        /**
         * Watch
         */
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jsbeautifier', 'uglify']
            }
        },
        
        /**
         * jsbeautifier
         */
        jsbeautifier: {
            files: ['src/**/*.js'],
            options: {
                config: '.jsbeautifyrc'
            }
        },
        
        /**
         * Uglify
         */
        uglify: {
            dist: {
                files: {
                    'dist/observe.min.js': ['src/observe.js']
                }
            }
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Developer
    grunt.registerTask('default', ['jsbeautifier', 'uglify']);
    
};