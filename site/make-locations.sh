
cd ./articles/trips
cat locations.json | json -a 'kml.Document.Folder.Placemark' | json -e "delete this.styleUrl; delete this.Point; this.latitude = this.LookAt.latitude; this.longitude = this.LookAt.longitude; delete this.LookAt;" > locations-stripped.json

