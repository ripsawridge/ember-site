/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var fs = require('fs');
var glob = require('glob');
var marked = require('marked');
var yaml = require('js-yaml');
var xml2json = require('xml2json');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
        SRI: {
            enabled: false
        },
        fingerprint: {
            enabled: false
        },
        minifyJS: {
            enabled: true
        },
        minifyCSS: {
            enabled: true
        },
        // Add options here
         lessOptions: {
            paths: [
            'bower_components/bootstrap/less'
          ],
        }
  });

  // Convert markdown files.

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var loadFile = function (ymlName) {
    var data = fs.readFileSync(ymlName, "utf8");
    var blogPost = {};

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
    blogPost.location = doc.location;

    if (!doc.location) {
      console.log(ymlName + " doesn't have a location");
    }
    // identify the content after the divider character as
    // the blogPost.description written in Markdown
    blogPost.description = marked(data.substr(dividerPos + 4));
    return blogPost;
  };

  var convertProjectsFiles = function(root_folder) {
    var index = [];
    var ymls = glob(root_folder + '/**/*.md', {sync: true});

    console.log("Converting " + ymls.length + " files");

    ymls.forEach(function (ymlName) {
        // Load
        var project = loadFile(ymlName);
        var fileName = ymlName.replace(root_folder + '/', '')
            .replace('/','_')
            .replace('.md', '');
        fs.writeFileSync('public/' + root_folder + '/' + fileName + '.json',
                         JSON.stringify(project));
        // Store summary for index
        index.push(
            {
              title: project.title,
              date : project.date,
              blurb: project.blurb,
	      location: project.location,
              slug: fileName
            });
    });

    // sort index file by date.
    index.sort((a, b) =>
        {
            var date_a = new Date(a.date);
            var date_b = new Date(b.date);
            if (date_a < date_b) return 1;
            else if (date_a === date_b) return 0;
            else return -1;
        });
    fs.writeFileSync('public/' + root_folder + '/index.json', JSON.stringify(index));
    return index;
  };

  function transformGeoLocations(input_kml, output_json, trip_index) {
    var kml = fs.readFileSync(input_kml);
    var json = xml2json.toJson(kml, { object: true });
    var maps = json.kml.Document.Folder.Folder; // the locations folder.
    // There should be several map folders.
    let data = [];
    maps.forEach((map) => {
      map.Placemark.forEach((placemark) => {
        let obj = {
          name: placemark.name,
	  location: [parseFloat(placemark.LookAt.latitude),
                     parseFloat(placemark.LookAt.longitude)],
          map_name: map.name
        };
        // Associate the trips made at this location.
        let trips = trip_index.filter((trip) => {
          if (Array.isArray(trip.location)) {
            // A trip may contain multiple locations.
            return trip.location.includes(obj.name);
          }
          return trip.location == obj.name;
        });
        if (trips.length > 0) {
          // Why put a location on the map if there are no associated trips?
          obj.trips = trips;
          data.push(obj);
        }
      });
    });
    fs.writeFileSync(output_json, JSON.stringify(data, null, 1));
  }

  var trip_index = convertProjectsFiles("articles/trips");
  convertProjectsFiles("articles/philosophy");

  // Load geolocations, for map display.
  transformGeoLocations("articles/trips/locations.kml",
    "public/articles/trips/locations.json", trip_index);

  // app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  // app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {
  //     destDir: 'assets'
  // });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',   { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',   { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',   { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',  { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', { destDir: 'fonts' });

  app.import('bower_components/bootstrap/dist/js/bootstrap.js');

  return app.toTree();
};
