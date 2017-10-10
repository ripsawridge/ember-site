module.exports = function(grunt) {
  grunt.initConfig({
    rsync: {
      options: {
        recursive: true
      },
      production: {
        options: {
          src: "./dist/",
          dest: "~/public_html",
          host: "mountai8@mountainwerks.org"
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('deploy', [
    'rsync:production'
  ]);

};

