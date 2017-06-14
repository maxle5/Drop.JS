(function (window) {
    jQuery.fn.extend({
        drop: function (map, callback) {
            // make element draggable
            this.draggable({
                helper: 'clone',
                start: function (e, ui) {
                    $(ui.helper).css({ 
                        "width": "50px", 
                        "height": "50px",
                        "margin-left": e.clientX - $(e.target).offset().left - 25,
                        "margin-top": e.clientY - $(e.target).offset().top - 25,
                        "z-index": 1051
                    });
                },
                stop: function (e, ui) {
                    var marker = DropMarker(e, ui);
                    if (callback) {
                        callback(marker);
                    }
                }
            })

            // handle dropped marker
            function DropMarker(e, ui) {
                var wrapper = $(map.getDiv()).offset();
                var x = ui.helper.offset().left - wrapper.left + $(ui.helper).width() / 2;
                var y = ui.helper.offset().top - wrapper.top + $(ui.helper).height();
                var url = $(ui.helper).data('img-url');
                var icon = new window.google.maps.MarkerImage(url, null, null, null, new window.google.maps.Size(40, 40));
                return new window.google.maps.Marker({
                    map: map,
                    position: screenPointToLatLng({ x: x, y: y }),
                    draggable: true,
                    icon: icon
                });
            }

            // convert x,y screen position to lat,lng
            function screenPointToLatLng(point) {
                var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
                var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
                var scale = Math.pow(2, map.getZoom());
                var worldPoint = new window.google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
                return map.getProjection().fromPointToLatLng(worldPoint);
            }
        }
    });
})(window);
