(function(window) {
    function definition() {
        var lib = {};
        lib.init = function(map, itemsSelector) {
            lib.map = map;
            $(itemsSelector).draggable({
                helper: clone,
                stop: function(e, ui) {
                    MarkerDragHandler(e, ui);
                }
            })
            console.log('successfully initialized pindrop');
        };

        function MarkerDragHandler(e, ui) {
            var wrapper = $().offset();
            var x = ui.helper.offset().left - wrapper.left + parseInt("20px", 10);
            var y = ui.helper.offset().top - wrapper.top + parseInt("40px", 10);
            var url = $(ui.helper).find('img')[0].src;
            var icon = new window.google.maps.MarkerImage(url, null, null, null, new window.google.maps.Size(40, 40));

            return new window.google.maps.Marker({
                map: lib.map,
                position: screenPointToLatLng({ x: x, y: y }, lib.map),
                draggable: true
            });

            // convert screen position to lat/lng
            function screenPointToLatLng(point, map) {
                var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
                var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
                var scale = Math.pow(2, map.getZoom());
                var worldPoint = new window.google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
                return map.getProjection().fromPointToLatLng(worldPoint);
            }
        }

        return lib;
    }

    // check if $ is defined
    if (typeof(jQuery) === 'undefined') {
        console.error('pindrop requires jQuery. https://jquery.com/')
        return;
    }
    // check if google.maps is defined
    if (typeof(google.maps) === 'undefined') {
        console.error('pindrop requires the google maps API. https://developers.google.com/maps/')
        return;
    }

    // define library globally
    if (typeof(pindrop) === 'undefined') {
        window.pindrop = definition();
    }
})(window);