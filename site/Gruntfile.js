module.exports = function(grunt) {
    var glob = require('glob'),
        marked = require('marked'),
        yaml = require('js-yaml');

    var loadBlogPost = function (ymlName) {
        var data = grunt.file.read(ymlName);
        var blogPost = {};

        grunt.log.write("Processing " + ymlName + "\n");
        
        //safeLoad the first part of the document which contains the metadata
        var startPos = data.indexOf("---");
        if (startPos < 0) {
            startPos = 0;
        } else {
            startPos += 4;
        }

        // locate the divider character (---)
        var dividerPos = data.indexOf("---", startPos + 4);
        var innerData = data.substring(startPos, dividerPos);
        var doc = yaml.safeLoad(innerData);
        blogPost.date = doc.date;
        blogPost.title = doc.title;
        blogPost.blurb = doc.blurb;

        // identify the content after the divider character as
        // the blogPost.description written in Markdown
        blogPost.description = marked(data.substr(dividerPos + 4));

        return blogPost;
    };

    grunt.registerTask('convertTrips', function () {
        // Find blog posts files
        var ymls = glob('articles/trips/**/*.md', {sync: true});
        // Define array to store info to blogs/index
        var indexTrips = [];
        ymls.forEach(function (ymlName) {
            // Load the blog posts and save its data in a javascript object
            var report = loadBlogPost(ymlName);
            // Identify the file name
            var fileName = ymlName.replace('articles/trips/', '').replace('.md', '');
            // Stringify the javascript object and write it in json file
            grunt.file.write('public/articles/trips/' + fileName + '.json', JSON.stringify(report, null, '\t'));
            // Store summary for blogs/index
            indexTrips.push(
                {
                    title: report.title,
                    date: report.date,
                    blurb: report.blurb,
                    slug: fileName
                });
            // Write index json file
            grunt.file.write('public/articles/trips/index.json', JSON.stringify(indexTrips, null, '\t'));
        });
    });
}

