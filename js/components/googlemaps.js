import LC_GoogleMapsHelper from './maphelper';

class LC_GoogleMaps {
    constructor(elm = null, options = {}) {
        let defaults =  {
            apiKey: window.gm_api_key,
            DOMElement: this.setDOMElement(elm),
            bounds: {},
            overlay: true,
            map: {},
            settings: {
                zoom: (LC_GoogleMapsHelper.mobilecheck()) ? 10 : 11,
                scrollwheel: false,
                disableDefaultUI: true,
                center: new google.maps.LatLng(0, 0),
                styles: LC_GoogleMapsHelper.styles
            },
            markers: [ //Dummy Data
                {
                    lat: 38.1406578,
                    long: 13.2872484,
                    info: 'Dummy Info 1',
                    meta: 'palermo'
                },
                {
                    lat: 47.802904,
                    long: 12.9863901,
                    info: 'Dummy Info 2',
                    meta: 'salzburg'
                },
                {
                    lat: 54.3612063,
                    long: 18.5499444,
                    info: 'Dummy Info 3',
                    meta: 'gdansk'
                },
            ],
            options
        };
        this.state = Object.assign({}, defaults, options);

// if(options.init) {
//     this.init();
// }

    }

    setDOMElement(elm) {
        return document.getElementById(elm);
    }
    init() {
        this.render(this.state.mapStyle);

        //
        //For AJAX loaded markers
        //
        // axios.get('/nl-BE/store/all')
        // .then(function (response) {
        //
        //   let markers = (typeof response.data == 'object') ? response.data : JSON.parse(response.data);
        //   LC_GoogleMapsHelper.populateMarkers(markers);
        //   _self.renderMap();
        //   _self.checkUrlParam();
        //
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
    }

    showMarkerOnMap(search) {

        let centerMarker = this.state.markers.find( marker =>  marker.meta == search );
        console.log(centerMarker);
        google.maps.event.trigger(this.state.map, 'resize');
        this.state.map.panTo({ lat: parseFloat(centerMarker.lat), lng: parseFloat(centerMarker.long) });

    }

    setMarkers(search = null, reset = false, overview) {

        this.state.bounds = new google.maps.LatLngBounds();
        this.state.markers.forEach((data, index) => {

            let icon = LC_GoogleMapsHelper.icons.default;

            let marker = new google.maps.Marker({
                position:  new google.maps.LatLng( parseFloat(data.lat),parseFloat(data.long) ),
                icon: {
                    url: icon,
                    size: new google.maps.Size(LC_GoogleMapsHelper.markerSize, LC_GoogleMapsHelper.markerSize)
                },
                map: (reset == true) ? null : this.state.map,
                data
            });

            if(overview) {
                //Re-fit map so that all markers are visible at init
                this.state.bounds.extend(marker.position);
                this.state.map.fitBounds(this.state.bounds);
            }

            //Bind click event to marker
            marker.addListener('click', function(){
                alert('click');
            });

        });

        if(search) {

            this.showMarkerOnMap(search);

        }
    }

    search(key, overview) {
        this.render();
        this.setMarkers(key, false, overview);
    }

    render(search = null) {

        this.state.map = new google.maps.Map(this.state.DOMElement, this.state.settings);
        this.setMarkers();

    }
}

export { LC_GoogleMaps }
