/*create the base maps using mapbox map source data*/
var basemap_street = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYmVzdGVuemUiLCJhIjoiY2o1enZoamtqMGVvOTMycTd1NHFrcWJzNiJ9.aSdNrFlFuffJYx0-kVpCoQ'
});

var basemap_outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.outdoors',
	accessToken: 'pk.eyJ1IjoiYmVzdGVuemUiLCJhIjoiY2o1enZoamtqMGVvOTMycTd1NHFrcWJzNiJ9.aSdNrFlFuffJYx0-kVpCoQ'
});

var basemap_light = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.light',
	accessToken: 'pk.eyJ1IjoiYmVzdGVuemUiLCJhIjoiY2o1enZoamtqMGVvOTMycTd1NHFrcWJzNiJ9.aSdNrFlFuffJYx0-kVpCoQ'
});
var basemap_dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.dark',
	accessToken: 'pk.eyJ1IjoiYmVzdGVuemUiLCJhIjoiY2o1enZoamtqMGVvOTMycTd1NHFrcWJzNiJ9.aSdNrFlFuffJYx0-kVpCoQ'
});
var basemap_satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.satellite',
	accessToken: 'pk.eyJ1IjoiYmVzdGVuemUiLCJhIjoiY2o1enZoamtqMGVvOTMycTd1NHFrcWJzNiJ9.aSdNrFlFuffJYx0-kVpCoQ'
});
/*end*/

/*Add layers to map*/
var mymap = L.map('mapid',{
	center:[43.2994,-74.2179],
	zoom:7,
	layers: [basemap_street]
});
/*end*/

/*create clustered markers for and popup content*/
function onClick(e) {
	mymap.setView(this.getLatLng());
}

//site 
var sitemarkers = L.markerClusterGroup();
for (var i = 0; i < Sites.features.length; i++) {
	var point = Sites.features[i];
	var title = point.properties.NAME;
	if(point.geometry!=null){
		var marker = L.marker(L.latLng(point.geometry.coordinates[1], point.geometry.coordinates[0]),{ title: title }).on("click",onClick);
		var popupContent ='<div><img style="width:90%" src="data/b.png" alt="image"></div> </br>'+'<b>'+title+'</b> </br><b>Facility: '+ (point.properties.FACILITY? point.properties.FACILITY: "Not Provided")+'</b> </br><b>Direction: '+
		(point.properties.DIRECTIONS? point.properties.DIRECTIONS: "Not Provided") + '</b> </br>'+'<div><img style="width:100%" src="data/a.png" alt="image"></div> </br>'+ 
		'<center style="font-size:18px"><a href='+point.properties.URL+'>Learn more</a></center>' 
		marker.bindPopup(L.popup({maxWidth:200,minWidth:200}).setContent(popupContent));
		sitemarkers.addLayer(marker);
	}
}

var poimarkers = L.markerClusterGroup();
for (var j = 0; j < POI.features.length; j++) {
	var point = POI.features[j];
	var title = point.properties.NAME;
	if(point.geometry!=null){
		var marker = L.marker(L.latLng(point.geometry.coordinates[1], point.geometry.coordinates[0]),{title: title}).on('click',onClick);
		var popupContent ='<div><img style="width:90%" src="data/b.png" alt="image"></div> </br>'+'<b>'+title+'</b> </br><b>Area: '+ point.properties.OFFICE+'</b> </br><b>Type: '+
		point.properties.ASSET+'</b> </br>'+'<div><img style="width:100%" src="data/a.png" alt="image"></div> </br>'+ 
		'<center style="font-size:18px"><a href="http://www.dec.ny.gov/62.html">Learn more</a></center>' 
		marker.bindPopup(L.popup({maxWidth:200,minWidth:200}).setContent(popupContent));
		poimarkers.addLayer(marker);
	}
}
/*end*/

/*Define the stye of Choropleth map*/
function getColor(pop){
    return pop > 1000000 ? '#800026' :
           pop > 500000  ? '#BD0026' :
           pop > 200000  ? '#E31A1C' :
           pop > 100000  ? '#FC4E2A' :
           pop > 50000   ? '#FD8D3C' :
           pop > 20000   ? '#FEB24C' :
           pop > 10000   ? '#FED976' :
                      '#FFEDA0';
}

function countyStyle(feature){
	return {
		fillColor:getColor(feature.properties.DP0010001),
		weight:2,
		opacity:1,
		color:'white',
		dashArray:3,
		fillOpacity:0.5
	}
}
/*end*/

/*create inforwindow showing the population and area of land*/
var infowindow = L.control();

infowindow.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'infowindow');
	this.update();
	return this._div;
};

infowindow.update = function (props) {
	this._div.innerHTML = '<h4>New York State Census</h4>' +  (props ?
		'<b>' + props.NAMELSAD + '</b><br />' + props.DP0010001 + ' people <br />'+
		props.ALAND+'meters<sup>2</sup>'
		: '<center> Please hover over a county </center>');
};

infowindow.addTo(mymap);
/*end*/

/*create lagend according to the population of each county*/
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'infowindow legend');
	var grades = [0,10000,20000,50000,100000,200000,500000,1000000];
	var labels = [];
	var start, end;

	for (var i = 0; i < grades.length; i++) {
		start = grades[i];
		end = grades[i + 1];
		labels.push(
			'<i style="background:' + getColor(start + 1) + '"></i> ' +
			start + (end ? '&ndash;' + end : '+'));
	}
    div.innerHTML='<div><b>Population Legend</b></div>';
	div.innerHTML += labels.join('<br>');
	return div;
};

legend.addTo(mymap);
/*end*/

/*Define polygon map interactive operations/highlight clicked feature*/
var NYJson;

function zoomToFeature(e) {
	mymap.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
	NYJson.resetStyle(e.target);
	infowindow.update();
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'gray',
        dashArray: '',
        fillOpacity: 0.5
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    infowindow.update(layer.feature.properties);
}

function onEachFeatureNY(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}
/*end*/

/*Loading new york state counties census data to create Choropleth map*/
var nyLayer = L.layerGroup();
NYJson = L.geoJson(NYCensus,
	{
		style:countyStyle,
		onEachFeature: onEachFeatureNY
	}).addTo(nyLayer);
mymap.addLayer(nyLayer);


/* Add layer groups contol */
var baseMap={
	"Street Map":basemap_street,
	"Light Map":basemap_light,
	"Satellite Map":basemap_satellite,
	"Outdoors Map":basemap_outdoors,
	"Dark Map": basemap_dark,
}

var overlays = {
	"Counties in New York State": nyLayer,
	"Accessible Outdoor Recreation": sitemarkers,
	"Points of Interest":poimarkers,
};

L.control.layers(baseMap,overlays).addTo(mymap);
/*end*/

/* Seach fucntion*/
$(document).ready(function(){
    $(".btn.btn-info.search").hover(function(){
        $(".form-control.search").css("display", "block");
    });
    $(".form-control.search").focusout(function(){
    	$(".form-control.search").css("display", "none");
    });
});

/*To be continued...*/