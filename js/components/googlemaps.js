import axios from 'axios'
import LC_GoogleMapsHelper from './maphelper';

export class LC_GoogleMaps {
    constructor(elm = null, options = {}) {
        let defaults = {
            apiKey: window.gm_api_key,
            DOMElement: this.setDOMElement(elm),
            bounds: {},
            overlay: true,
            map: {},
            settings: {
                overview: false,
                cluster: false,
                zoom: (LC_GoogleMapsHelper.mobilecheck()) ? 10 : 11,
                scrollwheel: false,
                disableDefaultUI: false,
                center: new google.maps.LatLng(0, 0),
                styles: LC_GoogleMapsHelper.styles,
            },
            markers: [],
            markersOrigin: []
        };
        defaults.settings = Object.assign({}, defaults.settings, options);
        this.state = Object.assign({}, defaults);
    }

    setDOMElement(elm) {
        return document.getElementById(elm);
    }
    init(url = '') {
        this.render(this.state.mapStyle);
        console.log(url)
        if (url != '') {
            //For AJAX loaded markers
            //x-frame-options: SAMEORIGIN, SAMEORIGIN

            // axios.get(url)
            //     .then(function (response) {
            //         console.log(response)
            //         let markers = (typeof response.data == 'object') ? response.data : JSON.parse(response.data);
            //         LC_GoogleMapsHelper.populateMarkers(markers);
            //         _self.renderMap();
            //         _self.checkUrlParam();

            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

        }

    }

    showMarkerOnMap(search, key, zoom = null) {

        let centerMarker = this.state.markersOrigin.find(marker => marker[key].toLowerCase() === search.toLowerCase());

        //TODO: Remove this?
        //google.maps.event.trigger(this.state.map, 'resize');
        this.state.map.panTo({ lat: parseFloat(centerMarker.lat), lng: parseFloat(centerMarker.long) });

        if (zoom) {
            console.log(zoom)
            this.state.map.zoom = parseInt(zoom) ? parseInt(zoom) : 14;
            console.log(this.state.map.zoom)

        }
    }

    panToMarkersCenter() {

    }

    setMarkers(overview = false, cluster = false, reset = false) {

        this.state.bounds = new google.maps.LatLngBounds();
        this.state.markersOrigin.forEach((data, index) => {

            let icon = LC_GoogleMapsHelper.icons.default;

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(data.lat), parseFloat(data.long)),
                icon: {
                    url: icon,
                    size: new google.maps.Size(LC_GoogleMapsHelper.markerSize, LC_GoogleMapsHelper.markerSize)
                },
                map: (reset == true) ? null : this.state.map,
                data
            });

            this.state.markers.push(marker)

            if (overview) {
                //Re-fit map so that all markers are visible at init
                this.state.bounds.extend(marker.position);
                this.state.map.fitBounds(this.state.bounds);
            }

            //Bind click event to marker
            marker.addListener('click', () => {
                alert('click');
            });

        });

        if (cluster) {
            let markerCluster = new MarkerClusterer(this.state.map, this.state.markers,
                { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            markerCluster.addListener('click', () => {
                alert('click on cluster')
            })
        }

    }

    searchMarker(string, key, zoom) {
        this.showMarkerOnMap(string, key, zoom);
    }

    render() {
        this.state.markersOrigin = LC_GoogleMapsHelper.markers;
        this.state.map = new google.maps.Map(this.state.DOMElement, this.state.settings);
        this.setMarkers(
            this.state.settings.overview,
            this.state.settings.cluster,
            false
        );
    }
}