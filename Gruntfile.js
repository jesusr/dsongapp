module.exports = function(grunt){
  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    compass: {
        dist: {
            files: {
                'app/public/assets/css/*': 'sass/*'
            }
        } 
    },
    watch: {
        css: {
            files: ['app/sass/*/*'],
            tasks: ['compass'],
            options: {
                spawn: false
            }
        }
    },
  });
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('compile', ['compass']);  
  grunt.registerTask('server', ['compass', 'concurrent:dev']);
  grunt.registerTask('default', ['server']);
}