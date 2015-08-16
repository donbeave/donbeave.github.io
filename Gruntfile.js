module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    // jQuery
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/jquery/dist/jquery.min.js'],
                        dest: 'js/'
                    },
                    // @end jQuery

                    // Bootstrap
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
                        dest: 'css/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/dist/fonts/*'],
                        dest: 'fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
                        dest: 'js/'
                    },
                    // @end Bootstrap

                    // animate.css
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/animate.css/animate.min.css'],
                        dest: 'css/'
                    },
                    // @end animate.css

                    // WOW
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/wow/dist/wow.min.js'],
                        dest: 'js/'
                    }
                    // @end WOW
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true
                },
                files: {
                    'index.html': 'src/index.html',
                    'portfolio.html': 'src/portfolio.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['copy', 'htmlmin']);
};