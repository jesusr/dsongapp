module.exports = function(grunt){
  grunt.initConfig({
    shell: {
      drush: {
        cmd: 'drush cc all',
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    compass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'app/public/assets/css/*': 'sass/*'
            }
        } 
    },
    watch: {
        css: {
            files: ['sass/*'],
            tasks: ['compass'],
            options: {
                spawn: false
            }
        }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('compile', ['compass']);  
  grunt.registerTask('server', ['shell', 'nodemon', 'compass', 'watch']);
  grunt.registerTask('default', ['server']);
}