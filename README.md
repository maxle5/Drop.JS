# drop.js
Drag/Drop custom images/markers on a google.maps.map
## JSFiddle Example:
https://jsfiddle.net/maxle5/3h0w3epn/

## Prerequisites:
- jQuery (https://jquery.com/)
- Google Maps Javascript API (https://developers.google.com/maps/documentation/javascript/)


## Usage:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
  </head>
  <body>
  
    <div>
      <div class='icon' data-img-url='/images/customMarker1.png'></div>
      <div class='icon' data-img-url='/images/customMarker2.png'></div>
      <div class='icon' data-img-url='/images/customMarker3.png'></div>
    </div>
    <div id="map" style="height: 100%;"></div>
    
    <script>
      // Standard Google maps setup
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
        
        // Drop.js setup
        $('.icon').drop(map, function(marker){
          // do something with the marker
        });
      }      
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
    <script src="drop.js"></script>
    
  </body>
</html>
```
