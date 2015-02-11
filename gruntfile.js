/* global module:true 
 *
 * Gruntfile.js
 * npm install -g grunt-cli
 * npm install grunt-contrib-less grunt-contrib-watch grunt-contrib-connect --save-dev
 */
module.exports = function(grunt) {
    'use strict';
    // Default port
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 8000,
                    base: 'src/',
                    open: true,
                    hostname: 'localhost'
                }
            }
        },
        compass: { // Task
            dist: { // Target
                options: { // Target options
                    sassDir: 'src/sass',
                    cssDir: 'src/css',
                    environment: 'production'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            taskName: { // You need a task, can be any string
                files: [ // Files to livereload on
                    "src/css/main.css",
                    "src/index.html"
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', ['connect:server']);
    grunt.registerTask('default', ['compass', 'connect:server', 'watch']);

};
// module.exports = function(grunt) {
//     // Project configuration.
//     grunt.initConfig({
//         pkg: grunt.file.readJSON('package.json'),
//         uglify: {
//             options: {
//                 banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//             },
//             build: {
//                 src: 'src/<%= pkg.name %>.js',
//                 dest: 'build/<%= pkg.name %>.min.js'
//             }
//         },
//         uncss: {
//             dist: {
//                 files: [{
//                     src: 'src/index.html',
//                     dest: 'src/tidy.css'
//                 }]
//             }
//         },
//         cssmin: {
//             dist: {
//                 files: [{
//                     src: 'src/tidy.css',
//                     dest: 'src/tidy-min.css'
//                 }]
//             }
//         },
//         connect: {
//             uses_defaults: {}
//         }
//     });
//     // Load the plugin that provides the "uglify" task.
//     grunt.loadNpmTasks('grunt-contrib-uglify');
//     grunt.loadNpmTasks('grunt-contrib-connect');
//     //grunt.registerTask('default', 'connect');
//     // grunt.loadNpmTasks('grunt-uncss');
//     // grunt.loadNpmTasks('grunt-contrib-cssmin');
//     // grunt.loadNpmTasks('grunt-contrib-watch');
//     // grunt.loadNpmTasks('grunt-contrib-connect');
//     // grunt.loadNpmTasks('grunt-connect-proxy');
//     // // Default task(s).
//     // //grunt.registerTask('default', ['uglify', 'uncss']);
//     // grunt.registerTask('default', ['uglify', 'uncss', 'cssmin']);
//     // grunt.registerTask('server', ['connect:static', 'configureProxies:server', 'connect:server', 'watch']);
//     // grunt.registerTask('fakeServer', ['connect:static', 'configureProxies:fakeServer', 'connect:fakeServer', 'watch']);
//     // After running "npm install connect --save-dev" to add connect as a dev
//     // dependency of your project, you can require it in your gruntfile with:
//     var connect = require('connect');
//     // Now you can define a "connect" task that starts a webserver, using the
//     // connect lib, with whatever options and configuration you need:
//     grunt.registerTask('connect', 'Start a custom static web server.', function() {
//         grunt.log.writeln('Starting static web server in "www-root" on port 9001.');
//         connect(connect.static('www-root')).listen(9001);
//     });
// };
