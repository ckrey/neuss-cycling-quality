# Data-Analysis

This is using the original script from https://github.com/SupaplexOSM/OSM-Cycling-Quality-Index

I slighlty adapted the overpass query so that it is not using a bounding box, but the actual city borders. 
In overpass turbo we can use
```overpass
{{geocodeArea:Vienna}}->.searchArea;
```
for this and 
```overpass
area(id:3600109166)->.searchArea;
```
in the API. 

As the geoJSON export in the browser was stuck for me, I removed the `[out:json]` to get the API response as OSM XML, download this and then use [osmtogeojson](https://github.com/tyrasd/osmtogeojson) directly from the commandline.
```bash
osmtogeojson out.xml > out.geojson
```

In Qgis I exported the layer as a EPSG:4326 geojson file and then used
```bash
tippecanoe --output out.pmtiles --smallest-maximum-zoom-guess=18 -rg --drop-densest-as-needed --extend-zooms-if-still-dropping --force --layer=default output.geojson
```
to create the pmtiles for the website.
