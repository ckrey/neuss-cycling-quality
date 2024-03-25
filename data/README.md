# Data-Analysis

This is using the original script from https://github.com/SupaplexOSM/OSM-Cycling-Quality-Index


In Qgis I exported the layer as a EPSG:4326 geojson file and then used
```bash
tippecanoe --output out.pmtiles --smallest-maximum-zoom-guess=18 -rg --drop-densest-as-needed --extend-zooms-if-still-dropping --force --layer=default output.geojson
```
to create the pmtiles for the website.
