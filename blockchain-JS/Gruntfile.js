const grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.initConfig({
    eslint: {
        target: ['./source/**/*.js'],
    },
});
grunt.registerTask('default', ['eslint']);