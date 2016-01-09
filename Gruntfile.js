module.exports = function(grunt) {

    var banner = '/**\n    @name: <%= pkg.name %> \n    @version: <%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) \n    @author: <%= pkg.author %> \n    @url: <%= pkg.homepage %> \n    @license: <%= pkg.license %>\n*/\n';

    var files = [
                    'src/aping-bandsintown-directive.js',
                    'src/aping-bandsintown-helper.js',
                    'node_modules/angular-bandsintown-api-factory/src/angular-bandsintown-api-factory.js'
                ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-plugin-bandsintown.min.js' : files
                }
            },
            options: {
                banner: banner,
            }
        },
        concat: {
            options: {
                separator: ';',
                banner: banner,
            },
            dist: {
                files : {
                    'dist/aping-plugin-bandsintown.js' : files
                }
            },
        },
        watch: {
            minifiyJs: {
                files: files,
                tasks: ['uglify', 'concat'],
                options: {
                    spawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};

