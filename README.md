#This is an application interactively mapping the outdoor activity sites and points of interest in New York Stats using leaflet.js


##Data
The datasets used in this application consists of two point GeoJson data and one polygon GeoJson data.

* Accessible Outdoor Recreation Destinations data. It was collected from NYS clearing house, containing accessible recreation sites throughout New York State that are owned, maintained or jointly managed by provide by NYS Dept. of Environmental Conservation (DEC).


* Point of Interest data. It was collected from NYS clearing house also provided by DEC. It consist of Point data locating and differentiating assets on state lands. Assets represented as point features are man-made items, which require periodic maintenance or inspection. Examples include: custodial, asset, lean-to, parking lot, leanto, pit privy, campsite, trail structure, parking, primitive site, fire tower, scenic vista, picnic site, day use area, and others.


* NY County-level Census data: collected from US Census buaru,



##Structure & usage

The application is built based on layers and all layers
are controlled by the layer control in the top right corner.

There are five different style base maps, using the mapbox service (internet access is needed for loading the base map) and three overlays(two point layers and one polygon layer), all the layers are interactive. (The search function is still under construction righr now)

The points are marked on the map as clustered markers using a leaflet plugin called [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) and it will zoom in when clicked on the cluster. When the original marker is clicked, the infowindow will show a detail information about the site.

The New York county is also an interactive Choropleth Map (legend in the bottom right corner). When hover on the feature, the infro window on the top right corner will display the census information of the county being hovered and when it is clicked, the map will zoom into the county.

##
This application is a good practice to learn how to display GIS data using leaflet.js