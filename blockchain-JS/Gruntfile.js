const grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.initConfig({
    eslint: {
       
        target: ['*.js']
    }
});
grunt.registerTask('default', ['eslint']);