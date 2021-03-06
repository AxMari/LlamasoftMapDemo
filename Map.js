var globalMap;

$(function() {

var MapFcns = {
    loadSiteList: function () {
        var airportList = $('#airport-list');
            airportList.html('');
            airportList.append('<option value=""></option>');
        for (var i in sites) {
            var newOption = $('<option value="' + sites[i].Code + '">' + '(' + sites[i].Code + ") " + sites[i].City + ", " + sites[i].State  + '</option>');
            airportList.append(newOption);
        }
    },
    
    siteListChange: function() {
        var ctl = $(this),
            airportCode = ctl.val();
            if(airportCode) {
                var currAirport = _.findWhere(sites, {Code: airportCode});
                $('#setting-city').text(currAirport.City + ", " + currAirport.State);
                $('#setting-code').text('(' + currAirport.Code + ') ' + currAirport.PlainName);
                $('#setting-longlat').text("(" + currAirport.Longitude + ", " + currAirport.Latitude + ")");
                
                var marker = new google.maps.Marker({
                    position: {lat: currAirport.Latitude, lng: currAirport.Longitude},
                    map: globalMap,
                    title: "(" + currAirport.Code + ") double click to remove" 
                });
                globalMap.setZoom(6);
                globalMap.panTo(marker.position);
                google.maps.event.addListener(marker, 'dblclick', function() {
                marker.setVisible(false);
                });

            }

    }

};





MapFcns.loadSiteList();
$('#airport-list').change(MapFcns.siteListChange);
$('#exercise-toggle').click(function() {
    var  toggleCtl = $(this),
         toggleVal = toggleCtl.text();
    if (toggleVal == '-') {
        toggleCtl.text('+');
        $('#exercise-instructions').hide();
    } else {
        toggleCtl.text('-');
        $('#exercise-instructions').show();
    }
});

});







    
function  initMap() {
  // Callback function to create a map object and specify the DOM element for display.
  globalMap = new google.maps.Map(document.getElementById('airport-map'), {
    center: {lat: 42.2814, lng: -83.7483},
    scrollwheel: true,
    zoom: 4

  });
  
};