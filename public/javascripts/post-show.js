mapboxgl.accessToken = mapBoxToken;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: post.coordinates,
    zoom: 3
});

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
    .setLngLat(post.coordinates)
    .setPopup(new mapboxgl.Popup({
            offset: 25
        }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
    .addTo(map);

// toggle review edit form
 $('.toggle-edit-form').on('click', function () {
     $(this).text() === "Edit" ? $(this).text('Cancel') : $(this).text('Edit');
     $(this).siblings('.edit-review-form').toggle();
 });

 //clear rating event listener
 $('.clear-rating').on('click', function(){
     $(this).siblings('.input-no-rate').click();
 })