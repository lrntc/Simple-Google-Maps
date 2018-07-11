/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_googlemaps__ = __webpack_require__(1);




window.initMapHelper = function () {
  const API_URL = 'https://www.velo-antwerpen.be/availability_map/getJsonObject';
  let map = new __WEBPACK_IMPORTED_MODULE_0__components_googlemaps__["a" /* LC_GoogleMaps */](
    'exampleMap',
    {overview: false, cluster: false}
  );
  map.init(API_URL);
  map.searchMarker('Monnikenplein', 'address', true);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maphelper__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maphelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__maphelper__);



class LC_GoogleMaps {
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
                zoom: (__WEBPACK_IMPORTED_MODULE_1__maphelper___default.a.mobilecheck()) ? 10 : 11,
                scrollwheel: false,
                disableDefaultUI: false,
                center: new google.maps.LatLng(0, 0),
                styles: __WEBPACK_IMPORTED_MODULE_1__maphelper___default.a.styles,
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

            let icon = __WEBPACK_IMPORTED_MODULE_1__maphelper___default.a.icons.default;

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(data.lat), parseFloat(data.long)),
                icon: {
                    url: icon,
                    size: new google.maps.Size(__WEBPACK_IMPORTED_MODULE_1__maphelper___default.a.markerSize, __WEBPACK_IMPORTED_MODULE_1__maphelper___default.a.markerSize)
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
        this.state.markersOrigin = __WEBPACK_IMPORTED_MODULE_1__maphelper___default.a.markers;
        this.state.map = new google.maps.Map(this.state.DOMElement, this.state.settings);
        this.setMarkers(
            this.state.settings.overview,
            this.state.settings.cluster,
            false
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LC_GoogleMaps;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const ICON_BASE_URL = 'images/';

let LC_GoogleMapsHelper = {
  icons: {
    default:  ICON_BASE_URL + 'map-marker-icon.png'
  },
  markerSize: 50,
  populateMarkers: (data) => {

    data.forEach((marker) => {

      LC_GoogleMapsHelper.markers.push({
        id: marker.id,
        lat: parseFloat(marker.lat),
        long: parseFloat(marker.long),
        name: marker.title,
        slug: marker.slug,
        street: marker.street + ' ' + marker.nr,
        town: marker.city,
        postalCode: marker.postal,
        phone: marker.tel,
        fax: marker.fax,
        website: marker.url,
        email: 'mail@test.com',
        type: marker.type
      });

    });
  },
  'styles' : [ // More styles can be found here: https://mapstyle.withgoogle.com/
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ],
  markers: [{id:"001",long:"4.420650000000000000",lat:"51.217820000000000000",bikes:"2",slots:"31",zip:"2018",address:"Koningin Astridplein",status:"OPN",name:"001- Centraal Station - Astrid",stationType:"BIKE"},{id:"002",long:"4.420750000000000000",lat:"51.217580000000000000",bikes:"0",slots:"36",zip:"2018",address:"Koningin Astridplein",addressNumber:" tov st1",status:"OPN",name:"002- Centraal Station - Astrid 2",stationType:"BIKE"},{id:"003",long:"4.421771338842944000",lat:"51.213085853125690000",bikes:"5",slots:"24",zip:"2018",address:"Kievitplein",addressNumber:"tov st 5",status:"OPN",name:"003- Centraal station Kievit 2",stationType:"BIKE"},{id:"004",long:"4.420094444444445000",lat:"51.217363888888890000",bikes:"0",slots:"21",zip:"2018",address:"De Keyserlei",addressNumber:"57",status:"OPN",name:"004- De Keyserlei",stationType:"BIKE"},{id:"005",long:"4.421732916607050000",lat:"51.213010729744000000",bikes:"28",slots:"7",zip:"2018",address:"Lange Kievitstraat",addressNumber:"n\u00b070",status:"OPN",name:"005- Centraal Station \/ Kievit",stationType:"BIKE"},{id:"006",long:"4.422179962645858000",lat:"51.210316661359040000",bikes:"10",slots:"14",zip:"2018",address:"Mercatorstraat ",addressNumber:"tov 18",status:"OPN",name:"006- Premetro Plantin",stationType:"BIKE"},{id:"007",long:"4.433947713271024000",lat:"51.201075847164230000",bikes:"8",slots:"23",zip:"2600",address:"Binnensingel ingang station Berchem",status:"OPN",name:"007- NMBS Berchem ",stationType:"BIKE"},{id:"008",long:"4.433958407621510000",lat:"51.201089073030410000",bikes:"6",slots:"24",zip:"2600",address:"Ryckaertplein",status:"OPN",name:"008- NMBS Berchem 2",stationType:"BIKE"},{id:"009",long:"4.437700892649170000",lat:"51.208965217072930000",bikes:"8",slots:"10",zip:"2140",address:"Wilrijkstraat - Plantin Moretuslei",status:"OPN",name:"009- NMBS Oost",stationType:"BIKE"},{id:"010",long:"4.390718261329017000",lat:"51.198469689711210000",bikes:"13",slots:"23",zip:"2018",address:"Desguinlei - Montignystraat",status:"OPN",name:"010- NMBS Zuid",stationType:"BIKE"},{id:"011",long:"4.418402000000000000",lat:"51.222033000000000000",bikes:"26",slots:"9",zip:"2018",address:"Osystraat",addressNumber:"18",status:"OPN",name:"011- Roosevelt",stationType:"BIKE"},{id:"012",long:"4.390135000000000000",lat:"51.199306000000000000",bikes:"6",slots:"29",zip:"2018",address:"De Singel\/ Brederodestraat",addressNumber:"1",status:"OPN",name:"012- Brussel",stationType:"BIKE"},{id:"013",long:"4.402245000000000000",lat:"51.193882000000000000",bikes:"5",slots:"31",address:"Jan van rijswijcklaan aan bedrijf DE SINGEL",status:"OPN",name:"013- De Singel",stationType:"BIKE"},{id:"014",long:"4.405689000000000000",lat:"51.196813000000000000",bikes:"7",slots:"29",zip:"2018",address:"Jan Van Rijswijcklaan",addressNumber:"86",status:"OPN",name:"014- Markgrave",stationType:"BIKE"},{id:"015",long:"4.394392340970182000",lat:"51.207822115171010000",bikes:"17",slots:"7",zip:"2000",address:"Beeldhouwersstraat - Admiraal De Boisotstraat",status:"OPN",name:"015- Schone Kunsten",stationType:"BIKE"},{id:"016",long:"4.396613000000000000",lat:"51.210160000000000000",bikes:"18",slots:"9",zip:"2000",address:"Karel Rogierstraat ",addressNumber:"8",status:"OPN",name:"016- Marnixplaats",stationType:"BIKE"},{id:"017",long:"4.401197046278909000",lat:"51.218884242613400000",bikes:"17",slots:"1",zip:"2000",address:"Groenplaats n\u00b0 7",status:"OPN",name:"017- Groenplaats",stationType:"BIKE"},{id:"018",long:"4.406168081225285000",lat:"51.218187010036840000",bikes:"10",slots:"26",zip:"2000",address:"Meir n\u00b0 18",status:"OPN",name:"018- Meirbrug",stationType:"BIKE"},{id:"019",long:"4.403610000000000000",lat:"51.219240000000000000",bikes:"22",slots:"8",zip:"2000",address:"Eiermarkt ",addressNumber:"13",status:"OPN",name:"019- Eiermarkt",stationType:"BIKE"},{id:"020",long:"4.401000000000000000",lat:"51.218800000000000000",bikes:"24",slots:"3",zip:"2000",address:"Groenkerkhofstraat\/Nationalestraat",status:"OPN",name:"020- Groenplaats 2",stationType:"BIKE"},{id:"021",long:"4.419189000000000000",lat:"51.195482000000000000",bikes:"7",slots:"23",address:"Grotesteenweg 150\/Driekoningenstraat",status:"OPN",name:"021- Driekoningen",stationType:"BIKE"},{id:"022",long:"4.430990359067499000",lat:"51.199924761619310000",bikes:"1",slots:"31",zip:"2600",address:"Statiestraat 162",status:"OPN",name:"022- Statie",stationType:"BIKE"},{id:"023",long:"4.408880661964794000",lat:"51.217084162925510000",bikes:"17",slots:"19",zip:"2018",address:"Wapper - Jodenstraat",status:"OPN",name:"023- Rubenshuis",stationType:"BIKE"},{id:"024",long:"4.417946000000000000",lat:"51.217959000000000000",bikes:"13",slots:"16",zip:"2018",address:"Anneessensstraat",status:"OPN",name:"024- Opera",stationType:"BIKE"},{id:"025",long:"4.414313350000000000",lat:"51.218188830000000000",bikes:"14",slots:"22",zip:"2000",address:"Leysstraat",addressNumber:"27",status:"OPN",name:"025- Teniersplaats",stationType:"BIKE"},{id:"026",long:"4.412475243159753000",lat:"51.218227891778050000",bikes:"10",slots:"26",zip:"2000",address:"Meir 84",status:"OPN",name:"026- Meir-Antoon Van Dijck",stationType:"BIKE"},{id:"027",long:"4.411949186215027000",lat:"51.219502912476460000",bikes:"0",slots:"34",zip:"2000",address:"Lange Nieuwstraat 101",status:"OPN",name:"027- Lange Nieuwstraat",stationType:"BIKE"},{id:"028",long:"4.408659692889357000",lat:"51.221488045020520000",bikes:"7",slots:"15",zip:"2000",address:"Keizerstraat ro n\u00b0 56",status:"OPN",name:"028- Keizerstraat",stationType:"BIKE"},{id:"029",long:"4.406064590410548000",lat:"51.201777902281430000",bikes:"5",slots:"13",zip:"2018",address:"Lange Lozanastraat n\u00b0 149",status:"OPN",name:"029- Lozana",stationType:"BIKE"},{id:"030",long:"4.433518298737513000",lat:"51.216318451018570000",bikes:"15",slots:"8",zip:"2140",address:"Laar",addressNumber:"tov nr 16",status:"OPN",name:"030- Het Laar",stationType:"BIKE"},{id:"031",long:"4.408029450760751000",lat:"51.193119169424930000",bikes:"10",slots:"26",zip:"2018",address:"Karel Oomsstraat - Binnensingel",status:"OPN",name:"031- Wezenberg",stationType:"BIKE"},{id:"032",long:"4.420708379829534000",lat:"51.221734856855480000",bikes:"1",slots:"25",zip:"2060",address:"De Conickplein ro n\u00b0 26",status:"OPN",name:"032- Permeke",stationType:"BIKE"},{id:"033",long:"4.409645771552839000",lat:"51.226218373722870000",bikes:"5",slots:"16",zip:"2000",address:"Hessenplein n\u00b0 2",status:"OPN",name:"033- Hessenhuis",stationType:"BIKE"},{id:"034",long:"4.390343681438131000",lat:"51.211015066009840000",bikes:"14",slots:"13",zip:"2000",address:"Leuvenstraat - Waalsekaai",status:"OPN",name:"034- M HKA",stationType:"BIKE"},{id:"036",long:"4.40593043087013",lat:"51.2163878210059",bikes:"3",slots:"17",zip:"2000",address:"Schuttershofstraat n\u00b0 2",status:"OPN",name:"036- Bourla",stationType:"BIKE"},{id:"037",long:"4.412371967260860000",lat:"51.215593476438820000",bikes:"6",slots:"24",zip:"2000",address:"Tabakvest - Ibis Hotel",status:"OPN",name:"037- Theater",stationType:"BIKE"},{id:"038",long:"4.432635000000000000",lat:"51.220157000000000000",bikes:"10",slots:"11",address:"Pastorijstraat tov huisnr28",status:"OPN",name:"038- Pastorijstraat",stationType:"BIKE"},{id:"039",long:"4.434095891498593000",lat:"51.211059089441240000",bikes:"13",slots:"23",zip:"2018",address:"Betogingstraat tov3",status:"OPN",name:"039- Koxplein",stationType:"BIKE"},{id:"040",long:"4.396619143599072000",lat:"51.196761939529130000",bikes:"15",slots:"19",zip:"2018",address:"Desguinlei to 246",status:"OPN",name:"040- Desguinlei",stationType:"BIKE"},{id:"041",long:"4.411606000000000000",lat:"51.210802000000000000",bikes:"5",slots:"22",zip:"2018",address:"Van Eycklei\/Edelinckstraat 24 ",status:"OPN",name:"041- Van Eyck",stationType:"BIKE"},{id:"042",long:"4.412070122941341000",lat:"51.202284892494660000",bikes:"8",slots:"11",zip:"2018",address:"Mechelsesteenweg - Ingang Harmoniepark",status:"OPN",name:"042- Harmonie",stationType:"BIKE"},{id:"043",long:"4.415281000000000000",lat:"51.203684000000000000",bikes:"15",slots:"14",zip:"2018",address:"Belgi\u00eblei\/Gretrystraat",status:"OPN",name:"043- Gr\u00e9trystraat",stationType:"BIKE"},{id:"044",long:"4.418194000000000000",lat:"51.205721000000000000",bikes:"16",slots:"20",zip:"2000",address:"Belgi\u00eblei 99",status:"OPN",name:"044- Belgielei",stationType:"BIKE"},{id:"045",long:"4.405497597996209000",lat:"51.226881774868240000",bikes:"11",slots:"24",zip:"2000",address:"Oude Leeuwenrui n\u00b0 2",status:"OPN",name:"045- Falconplein",stationType:"BIKE"},{id:"046",long:"4.415516549585612",lat:"51.19910372113264",bikes:"2",slots:"31",zip:"2600",address:"Grotesteenweg\/Boomgaardstraat",status:"OPN",name:"046- De Merode",stationType:"BIKE"},{id:"047",long:"4.423709521960564000",lat:"51.201405828404990000",bikes:"5",slots:"31",zip:"2600",address:"Boomgaardstraat\/Marialei",status:"OPN",name:"047- Militair Hospitaal",stationType:"BIKE"},{id:"048",long:"4.420149000000000000",lat:"51.217297000000000000",bikes:"2",slots:"31",zip:"2018",address:"De Keyserlei",addressNumber:"57",status:"OPN",name:"048- De Keyserlei 2",stationType:"BIKE"},{id:"049",long:"4.400856169167690000",lat:"51.225853570944370000",bikes:"13",slots:"14",zip:"2000",address:"Sint-Pietersvliet - Tolhuis",status:"OPN",name:"049- Tolhuis",stationType:"BIKE"},{id:"050",long:"4.403024090372765000",lat:"51.223732815536960000",bikes:"17",slots:"4",zip:"2000",address:"Sint-Paulusstraat\/ Lange Koepoortstraat",status:"OPN",name:"050- Klapdorp",stationType:"BIKE"},{id:"051",long:"4.406112888467821000",lat:"51.222896207511770000",bikes:"18",slots:"18",zip:"2000",address:"Mutsaardplein",status:"OPN",name:"051- Mutsaardplein",stationType:"BIKE"},{id:"052",long:"4.411687000000000000",lat:"51.228015000000000000",bikes:"8",slots:"28",zip:"2000",address:"Entrepotkaai",addressNumber:"16",status:"OPN",name:"052- Waaslandtunnel",stationType:"BIKE"},{id:"053",long:"4.413298397408935000",lat:"51.224651454235930000",bikes:"8",slots:"13",zip:"2000",address:"Paardenmarkt - Kleine Kauwenberg",status:"OPN",name:"053- Paardenmarkt",stationType:"BIKE"},{id:"054",long:"4.412985000366758000",lat:"51.221855438767100000",bikes:"7",slots:"14",zip:"2000",address:"Pieter Van Hobokenstraat n\u00b0 19",status:"OPN",name:"054- Ossenmarkt",stationType:"BIKE"},{id:"055",long:"4.428231210627736000",lat:"51.196977234142530000",bikes:"8",slots:"25",zip:"2600",address:"Vredestraat\/Zonnebloemstraat",status:"OPN",name:"055- Zonnebloemstraat",stationType:"BIKE"},{id:"056",long:"4.404587621644557000",lat:"51.222187310742380000",bikes:"12",slots:"17",zip:"2000",address:"Minderbroederrui n\u00b0 46",status:"OPN",name:"056- Minderbroedersrui",stationType:"BIKE"},{id:"057",long:"4.402666666666667000",lat:"51.221541666666670000",bikes:"1",slots:"17",zip:"2000",address:"Wolstraat - Korte Koepoortstraat 2",status:"OPN",name:"057- Wolstraat",stationType:"BIKE"},{id:"058",long:"4.399097050370182000",lat:"51.224389429501930000",bikes:"8",slots:"22",zip:"2000",address:"Jordaenskaai ro Saucierstraat",status:"OPN",name:"058- Noorderterras",stationType:"BIKE"},{id:"059",long:"4.396804494276738000",lat:"51.221099223306060000",bikes:"1",slots:"35",zip:"2000",address:"Ernest Van Dijckkaai ro n\u00b0 13 - Zuiderterras",status:"OPN",name:"059- Het Steen",stationType:"BIKE"},{id:"060",long:"4.400512730484778000",lat:"51.221587619408710000",bikes:"12",slots:"23",zip:"2000",address:"Wisselstraat 9",status:"OPN",name:"060- Grote Markt",stationType:"BIKE"},{id:"061",long:"4.425406466971353000",lat:"51.197809668607660000",bikes:"13",slots:"20",zip:"2600",address:"Statiestraat - Victor Jacobslei",status:"OPN",name:"061- Victor Jacobslei",stationType:"BIKE"},{id:"062",long:"4.426978000000000000",lat:"51.231828000000000000",bikes:"16",slots:"8",address:"Damplein\/Lange lobroekstraat ro n\u00b0 222",status:"OPN",name:"062- Station Dam",stationType:"BIKE"},{id:"063",long:"4.431567000000000000",lat:"51.230014000000000000",bikes:"25",slots:"10",address:"Lange Lobroekstraat tov huisnr 93",status:"OPN",name:"063- Slachthuis",stationType:"BIKE"},{id:"064",long:"4.394899321136949000",lat:"51.219092146698830000",bikes:"5",slots:"31",zip:"2000",address:"Plantinkaai ro Jansvliet (Zuiderterras)",status:"OPN",name:"064- Zuiderterras",stationType:"BIKE"},{id:"065",long:"4.393691048333439000",lat:"51.216434552320200000",bikes:"26",slots:"4",zip:"2000",address:"Plantinkaai ro n\u00b027",status:"OPN",name:"065- Plantinkaai",stationType:"BIKE"},{id:"066",long:"4.399251391055215000",lat:"51.217088702234010000",bikes:"5",slots:"18",zip:"2000",address:"Drukkerijstraat n\u00b0 26",status:"OPN",name:"066- Modemuseum",stationType:"BIKE"},{id:"067",long:"4.403141962080859000",lat:"51.215778420832180000",bikes:"16",slots:"20",zip:"2000",address:"Oudaan n\u00b0 14",status:"OPN",name:"067- Oudaan",stationType:"BIKE"},{id:"068",long:"4.443683000000000000",lat:"51.214571000000000000",bikes:"17",slots:"13",zip:"2140",address:"Turnhoutsebaan\/Stenenbrug ",status:"OPN",name:"068-  Turnhoutsepoort",stationType:"BIKE"},{id:"069",long:"4.441964470690549000",lat:"51.211159421441590000",bikes:"9",slots:"26",zip:"2140",address:"Fonteinstraat tov 72",status:"OPN",name:"069- Fonteinstraat",stationType:"BIKE"},{id:"070",long:"4.396344222405702000",lat:"51.214847821494130000",bikes:"6",slots:"24",zip:"2000",address:"Sint Andriesplaats n\u00b0 24",status:"OPN",name:"070- Sint Andries",stationType:"BIKE"},{id:"071",long:"4.392493461786049",lat:"51.21489302102319",bikes:"13",slots:"17",zip:"2000",address:"Sint-Michielskaai ro n\u00b0 21",status:"OPN",name:"071- Sint-Michielskaai",stationType:"BIKE"},{id:"072",long:"4.398986182742563000",lat:"51.211872754130070000",bikes:"5",slots:"22",zip:"2000",address:"Kronenburgstraat ro n\u00b0 82",status:"OPN",name:"072- Tropisch Instituut",stationType:"BIKE"},{id:"073",long:"4.403718000000000000",lat:"51.212309000000000000",bikes:"19",slots:"17",zip:"2000",address:"Maarschalk Gerardstraat\/schermersstraat",status:"OPN",name:"073- Maarschalk G\u00e9rard",stationType:"BIKE"},{id:"074",long:"4.394022819445082000",lat:"51.212334197409090000",bikes:"13",slots:"14",zip:"2000",address:"Scheldestraat - Kronenburgstraat",status:"OPN",name:"074- Vismijn",stationType:"BIKE"},{id:"075",long:"4.390930567194764000",lat:"51.209766966838010000",bikes:"11",slots:"13",zip:"2000",address:"Vlaamsekaai 35",status:"OPN",name:"075- Vlaamsekaai",stationType:"BIKE"},{id:"076",long:"4.398093000000000000",lat:"51.214035000000000000",bikes:"15",slots:"9",zip:"2000",address:"Nationalestraat\/Lange Vlierstraat",status:"OPN",name:"076- Prekersplein",stationType:"BIKE"},{id:"077",long:"4.409466000000000000",lat:"51.212753000000000000",bikes:"4",slots:"32",zip:"2000",address:"Frankrijklei - Blauwtorenplein",status:"OPN",name:"077- Blauwtorenplein",stationType:"BIKE"},{id:"078",long:"4.403011521639670000",lat:"51.209203171828670000",bikes:"19",slots:"8",zip:"2000",address:"Britselei n\u00b0 82",status:"OPN",name:"078- Oud Gerechtshof",stationType:"BIKE"},{id:"079",long:"4.407260707520346000",lat:"51.211034506177270000",bikes:"7",slots:"17",zip:"2000",address:"Britselei - Mechelsesteenweg",status:"OPN",name:"079- Nationale Bank",stationType:"BIKE"},{id:"080",long:"4.393389834019567000",lat:"51.206073818005830000",bikes:"26",slots:"10",address:"Amerikalei\/Graaf Van Hoornestraat",status:"OPN",name:"080- Montigny",stationType:"BIKE"},{id:"081",long:"4.387671971509639000",lat:"51.204680732033860000",bikes:"15",slots:"12",zip:"2000",address:"Bolivarplaats rechts van het gerechtsgebouw",status:"OPN",name:"081- Justitiepaleis",stationType:"BIKE"},{id:"083",long:"4.398509639357570000",lat:"51.207752878324130000",bikes:"11",slots:"16",zip:"2000",address:"Amerikalei n\u00b0 82",status:"OPN",name:"083- Brederode",stationType:"BIKE"},{id:"084",long:"4.404966647429536000",lat:"51.213441440396450000",bikes:"3",slots:"29",zip:"2000",address:"Lange Gasthuisstraat ro n\u00b0 3",status:"OPN",name:"084- Elzenveld",stationType:"BIKE"},{id:"085",long:"4.398812741627194000",lat:"51.205832366301900000",bikes:"8",slots:"27",zip:"2018",address:"Boudewijnsstraat tegenover n\u00b0 19-21",status:"OPN",name:"085- Den Bell",stationType:"BIKE"},{id:"086",long:"4.392348000000000000",lat:"51.203349000000000000",bikes:"18",slots:"9",zip:"2018",address:"Broederminstraat 59",status:"OPN",name:"086- Troonplaats",stationType:"BIKE"},{id:"087",long:"4.394242774057007",lat:"51.20066347660939",bikes:"14",slots:"7",zip:"2018",address:"Lange Elzenstraat n\u00b0 56",status:"OPN",name:"087- Lange Elzen",stationType:"BIKE"},{id:"088",long:"4.402212232689625000",lat:"51.201140515457520000",bikes:"6",slots:"15",zip:"2018",address:"Van Trierstraat - Haantjeslei",status:"OPN",name:"088- Haantjeslei",stationType:"BIKE"},{id:"089",long:"4.402230221840753000",lat:"51.198425910748000000",bikes:"2",slots:"34",zip:"2018",address:"Van Schoonbekestraat - Markgravelei",status:"OPN",name:"089- Hof van Leysen",stationType:"BIKE"},{id:"090",long:"4.404774275762020000",lat:"51.204546675722690000",bikes:"13",slots:"5",zip:"2018",address:"Vinkenstraat ro n\u00b0 7",status:"OPN",name:"090- Ballaarstraat",stationType:"BIKE"},{id:"091",long:"4.408297423288219000",lat:"51.208823463763380000",bikes:"15",slots:"3",zip:"2018",address:"Mechelsesteenweg n\u00b0 66",status:"OPN",name:"091- Hemelstraat",stationType:"BIKE"},{id:"092",long:"4.410634013269819000",lat:"51.204509611888380000",bikes:"10",slots:"11",zip:"2018",address:"Mechelsesteenweg n\u00b0 180",status:"OPN",name:"092- Sint-Thomas",stationType:"BIKE"},{id:"093",long:"4.413560000000000000",lat:"51.205410000000000000",bikes:"12",slots:"17",zip:"2000",address:"sint vincentius",addressNumber:"tov 61",status:"OPN",name:"093- Sint Vincentius",stationType:"BIKE"},{id:"094",long:"4.396100000000000000",lat:"51.204800000000000000",bikes:"14",slots:"19",zip:"2018",address:"Paleisstraat ",addressNumber:"147",status:"OPN",name:"094- Paleisstraat",stationType:"BIKE"},{id:"095",long:"4.416319522723214000",lat:"51.214151404317630000",bikes:"1",slots:"28",zip:"2018",address:"Quinten Mathijslei n\u00b0 12",status:"OPN",name:"095- Quinten Matsijslei",stationType:"BIKE"},{id:"096",long:"4.413109498483254000",lat:"51.213282141837700000",bikes:"4",slots:"19",zip:"2018",address:"Rubenslei \u2013 Louiza \u2013 Marialei ",status:"OPN",name:"096- Stadspark",stationType:"BIKE"},{id:"097",long:"4.428828981041583000",lat:"51.202779812559390000",bikes:"6",slots:"13",zip:"2018",address:"Cuperusstraat ro Lange Leemstraat",status:"OPN",name:"097- Cuperus",stationType:"BIKE"},{id:"098",long:"4.418930242293162000",lat:"51.199839911369490000",bikes:"8",slots:"13",zip:"2018",address:"Boomgaardstraat 31",status:"OPN",name:"098- Haringrode",stationType:"BIKE"},{id:"099",long:"4.410264715254410000",lat:"51.197060067715470000",bikes:"9",slots:"15",zip:"2018",address:"Generaal Lemanstraat - Karel Oomsstraat",status:"OPN",name:"099- Generaal Leman",stationType:"BIKE"},{id:"100",long:"4.416600409370835000",lat:"51.194851129846040000",bikes:"5",slots:"28",zip:"2600",address:"Frans Van Hombeeckplein 25",status:"OPN",name:"100- Van Hombeeckplein",stationType:"BIKE"},{id:"101",long:"4.432000000000000000",lat:"51.224100000000000000",bikes:"12",slots:"24",zip:"2060",address:"Lange Stuivenbergstraat ",addressNumber:"tov 90",status:"OPN",name:"101- Premetro Handel",stationType:"BIKE"},{id:"102",long:"4.430256657794283000",lat:"51.222461014719360000",bikes:"24",slots:"12",zip:"2060",address:"Duinstraat",status:"OPN",name:"102- Duinstraat",stationType:"BIKE"},{id:"103",long:"4.421462000000000000",lat:"51.192563000000000000",bikes:"4",slots:"32",zip:"2600",address:"Uitbreidingsstraat 184",status:"OPN",name:"103- Oude Kerk Berchem",stationType:"BIKE"},{id:"104",long:"4.424294009067518000",lat:"51.208207812316810000",bikes:"11",slots:"6",zip:"2018",address:"Provinciestraat - Mercatorstraat",status:"OPN",name:"104- Mercator",stationType:"BIKE"},{id:"105",long:"4.432625218239298000",lat:"51.209027738585180000",bikes:"1",slots:"20",zip:"2018",address:"Plantin Moretuslei n\u00b0 158",status:"OPN",name:"105- Plantin en Moretus",stationType:"BIKE"},{id:"106",long:"4.432210218293591000",lat:"51.205609036285810000",bikes:"14",slots:"7",zip:"2600",address:"Draakplaats",status:"OPN",name:"106- Draakplaats",stationType:"BIKE"},{id:"107",long:"4.433296280212769",lat:"51.21380627915371",bikes:"8",slots:"16",zip:"2140",address:"Moorkensplein ro n\u00b0 33A",status:"OPN",name:"107- Moorkensplein",stationType:"BIKE"},{id:"108",long:"4.439968641906528000",lat:"51.216023031856750000",bikes:"1",slots:"22",zip:"2140",address:"Delaraystraat ro n\u00b0 13",status:"OPN",name:"108- Krugerpark",stationType:"BIKE"},{id:"109",long:"4.430513466501682000",lat:"51.218579585329130000",bikes:"10",slots:"10",zip:"2060",address:"Kerkstraat n\u00b0 58",status:"OPN",name:"109- Kerkstraat",stationType:"BIKE"},{id:"110",long:"4.430101723012998000",lat:"51.206943170944800000",bikes:"16",slots:"20",zip:"2018",address:"Dageraadplaats",status:"OPN",name:"110- Dageraadplaats",stationType:"BIKE"},{id:"111",long:"4.427400000000000000",lat:"51.210200000000000000",bikes:"25",slots:"11",zip:"2018",address:"Plantin en Moretuslei",addressNumber:"10",status:"OPN",name:"111- Van Der Meyden",stationType:"BIKE"},{id:"112",long:"4.436840753419609000",lat:"51.203446266096090000",bikes:"9",slots:"25",zip:"2600",address:"Uitbreidingstraat",addressNumber:"578",status:"OPN",name:"112- Pretoriastraat",stationType:"BIKE"},{id:"113",long:"4.438622043829003000",lat:"51.218608995997560000",bikes:"5",slots:"22",zip:"2140",address:"Vercammenstraat - Helmstraat",status:"OPN",name:"113- Helmstraat",stationType:"BIKE"},{id:"114",long:"4.433777992711939000",lat:"51.222053118770870000",bikes:"9",slots:"12",zip:"2060",address:"Pesthofstraat ro n\u00b0 5",status:"OPN",name:"114- ZNA Stuivenberg",stationType:"BIKE"},{id:"115",long:"4.424183815656882000",lat:"51.222754423402240000",bikes:"8",slots:"13",zip:"2060",address:"Sint Elisabethstraat - Greinstraat",status:"OPN",name:"115- Metro Elisabeth",stationType:"BIKE"},{id:"116",long:"4.417215972702701000",lat:"51.210096006315090000",bikes:"6",slots:"12",zip:"2018",address:"Van Eycklei ro n\u00b0 48",status:"OPN",name:"116- Loosplaats",stationType:"BIKE"},{id:"117",long:"4.418404418360266000",lat:"51.225419369818670000",bikes:"21",slots:"8",zip:"2060",address:"Sint Jansplein ro n\u00b0 17",status:"OPN",name:"117- Sint Jansplein",stationType:"BIKE"},{id:"118",long:"4.422247361006011000",lat:"51.227142087032800000",bikes:"17",slots:"3",zip:"2060",address:"Trapstraat n\u00b0 10",status:"OPN",name:"118- Dambrugge",stationType:"BIKE"},{id:"119",long:"4.425367882174795000",lat:"51.215371766191990000",bikes:"9",slots:"14",zip:"2018",address:"Provinciestraat (plein)",status:"OPN",name:"119- Ploeg",stationType:"BIKE"},{id:"120",long:"4.439042000000000000",lat:"51.227532000000000000",bikes:"14",slots:"9",zip:"2060",address:"Schijnpoortweg ",addressNumber:"25",status:"OPN",name:"120- Eendracht",stationType:"BIKE"},{id:"121",long:"4.430533809533261000",lat:"51.227460419479400000",bikes:"26",slots:"4",zip:"2060",address:"Stuivenbergplein ro n\u00b0 36-1",status:"OPN",name:"121- Stuivenbergplein",stationType:"BIKE"},{id:"122",long:"4.436567207739302000",lat:"51.224708822052630000",bikes:"8",slots:"13",zip:"2060",address:"Pothoekstraat ro n\u00b0 124",status:"OPN",name:"122- Schijnpoort",stationType:"BIKE"},{id:"123",long:"4.424935536896917000",lat:"51.229038768621690000",bikes:"9",slots:"9",zip:"2060",address:"Vis\u00e9straat 16",status:"OPN",name:"123- Park Spoor Noord 2",stationType:"BIKE"},{id:"124",long:"4.419613000000000000",lat:"51.229962000000000000",bikes:"6",slots:"22",zip:"2060",address:"Ellermansstraat \u2013 Fuggerstraat",status:"OPN",name:"124- Park Spoor Noord 1",stationType:"BIKE"},{id:"125",long:"4.423474198206600000",lat:"51.225955645521620000",bikes:"8",slots:"28",zip:"2060",address:"Sint-Norbertusstraat\/Van Kerckhovenstraat",status:"OPN",name:"125- Sint-Norbertus",stationType:"BIKE"},{id:"127",long:"4.413307095780299000",lat:"51.228578444757660000",bikes:"2",slots:"28",zip:"2000",address:"Itali\u00eblei n\u00b0 4",status:"OPN",name:"127- FOD Financi\u00ebn",stationType:"BIKE"},{id:"129",long:"4.408800000000000000",lat:"51.228400000000000000",bikes:"20",slots:"15",zip:"2000",address:"Godefriduskaai Qpark",status:"OPN",name:"129- Godefriduskaai",stationType:"BIKE"},{id:"130",long:"4.420800000000000000",lat:"51.203800000000000000",bikes:"8",slots:"10",zip:"2000",address:"Lamorini\u00e8restraat",addressNumber:"150",status:"OPN",name:"130- Lamoriniere",stationType:"BIKE"},{id:"131",long:"4.412152929349810000",lat:"51.193756253382520000",bikes:"0",slots:"18",zip:"2600",address:"De wittestraat - Generaal Lemanstraat",status:"OPN",name:"131- De Wittestraat",stationType:"BIKE"},{id:"132",long:"4.437785965534147000",lat:"51.211773597965510000",bikes:"10",slots:"8",zip:"2140",address:"Maarschalk Montgomeryplein ro n\u00b0 4",status:"OPN",name:"132- Montgomery",stationType:"BIKE"},{id:"133",long:"4.411349321449047000",lat:"51.229581467123380000",bikes:"16",slots:"6",zip:"2000",address:"Entrepotkaai n\u00b0 1",status:"OPN",name:"133- Willemdok",stationType:"BIKE"},{id:"134",long:"4.405728642058911000",lat:"51.228112037401260000",bikes:"6",slots:"29",zip:"2000",address:"Godefriduskaai - Oostendekaai",status:"OPN",name:"134- MAS",stationType:"BIKE"},{id:"135",long:"4.402027750000000000",lat:"51.227970850000000000",bikes:"2",slots:"34",zip:"2000",address:"Sint-Aldegondiskaai",addressNumber:"10",status:"OPN",name:"135- Loodswezen",stationType:"BIKE"},{id:"136",long:"4.420999000000000000",lat:"51.231345000000000000",bikes:"12",slots:"23",zip:"2060",address:"Hardenvoort",status:"OPN",name:"136- Spoor Noord Skatebowl",stationType:"BIKE"},{id:"137",long:"4.405748000000000000",lat:"51.229779000000000000",bikes:"0",slots:"36",zip:"2000",address:"napeleonkaai\/Nassaustraat ",status:"OPN",name:"137- Sint-Laureiskaai",stationType:"BIKE"},{id:"138",long:"4.403552339080501000",lat:"51.231198527554700000",bikes:"21",slots:"3",zip:"2000",address:"Amsterdamstraat",status:"OPN",name:"138- Amsterdamstraat",stationType:"BIKE"},{id:"139",long:"4.412669394282471000",lat:"51.231053480456730000",bikes:"4",slots:"17",zip:"2000",address:"Londenstraat",addressNumber:"53",status:"OPN",name:"139- Londenstraat",stationType:"BIKE"},{id:"140",long:"4.391627018623872000",lat:"51.231422666361720000",bikes:"10",slots:"26",zip:"2050",address:"Goethestraat\/Thoneth",addressNumber:"Goethestraat\/Thoneth",status:"OPN",name:"140- Jachthaven LO",stationType:"BIKE"},{id:"141",long:"4.386875385241651000",lat:"51.235252570032700000",bikes:"25",slots:"10",zip:"2050",address:"Gloriantlaan\/Kastanjedreef",status:"OPN",name:"141- Sint-Anna",stationType:"BIKE"},{id:"142",long:"4.382542133810354000",lat:"51.233439980056400000",bikes:"16",slots:"20",zip:"2050",address:"Esmoreitlaan",addressNumber:"25",status:"OPN",name:"142- Esmoreitlaan",stationType:"BIKE"},{id:"143",long:"4.386179000000000000",lat:"51.231146000000000000",bikes:"20",slots:"4",zip:"2050",address:"Gloriantlaan\/Melis Stokelaan 24  ",status:"OPN",name:"143- Melis Stokelaan",stationType:"BIKE"},{id:"144",long:"4.378669800971490000",lat:"51.231267105658740000",bikes:"10",slots:"26",zip:"2050",address:"August Vermeylenlaan",addressNumber:"tov 7",status:"OPN",name:"144- August Vermeylenlaan",stationType:"BIKE"},{id:"145",long:"4.378550835716943000",lat:"51.227842213432080000",bikes:"6",slots:"18",zip:"2050",address:"August Vermeylenlaan\/ Charles de Costerlaan",status:"OPN",name:"145- De Coster",stationType:"BIKE"},{id:"146",long:"4.385890517853628",lat:"51.22777877150836",bikes:"18",slots:"15",zip:"2050",address:"Gloriantlaan\/Reinaartlaan",status:"OPN",name:"146- Reinaartlaan",stationType:"BIKE"},{id:"147",long:"4.377876746950817000",lat:"51.223918702975620000",bikes:"13",slots:"9",zip:"2050",address:"Halewijnlaan",addressNumber:"86",status:"OPN",name:"147- Halewijnlaan",stationType:"BIKE"},{id:"148",long:"4.386220088490688000",lat:"51.223198209027030000",bikes:"4",slots:"31",zip:"2050",address:"Frederik Van Eedenstraa",addressNumber:" tov nr 4",status:"OPN",name:"148- Verhaerenlaan",stationType:"BIKE"},{id:"149",long:"4.386331953024964000",lat:"51.220613099914330000",bikes:"10",slots:"24",zip:"2050",address:"Blancefloerlaan tov Frederik van Eedenplein",status:"OPN",name:"149- Van Eedenplein",stationType:"BIKE"},{id:"150",long:"4.381723278952854000",lat:"51.220073488674270000",bikes:"8",slots:"16",zip:"2050",address:"Waterhoenlaan",addressNumber:"12",status:"OPN",name:"150- Waterhoenlaan",stationType:"BIKE"},{id:"151",long:"4.378407092993419000",lat:"51.220313008869570000",bikes:"16",slots:"19",zip:"2050",address:"Blancefloerlaan\/Halewijnlaan",status:"OPN",name:"151- Van Cauwelaert",stationType:"BIKE"},{id:"152",long:"4.375590099454385000",lat:"51.220073040155330000",bikes:"4",slots:"28",zip:"2050",address:"Blancefloerlaan",addressNumber:"161",status:"OPN",name:"152- Blancefloerlaan",stationType:"BIKE"},{id:"153",long:"4.385706443546232000",lat:"51.218528603221080000",bikes:"12",slots:"22",zip:"2050",address:"Beatrijslaan",addressNumber:"42",status:"OPN",name:"153- Beatrijslaan",stationType:"BIKE"},{id:"154",long:"4.444364000000000000",lat:"51.219068000000000000",bikes:"6",slots:"27",zip:"2140",address:"Terloplein",status:"OPN",name:"154- Terloplein",stationType:"BIKE"},{id:"155",long:"4.445555",lat:"51.215834",bikes:"10",slots:"25",zip:"2140",address:"Statielei",addressNumber:"33",status:"OPN",name:"155- Statielei",stationType:"BIKE"},{id:"156",long:"4.425506000000000000",lat:"51.226025000000000000",bikes:"2",slots:"28",zip:"2060",address:"Van Kerckhovenstraat 74-76",status:"OPN",name:"156- Gasstraat",stationType:"BIKE"},{id:"157",long:"4.421580000000000000",lat:"51.192502000000000000",bikes:"0",slots:"36",zip:"2600",address:"Binnensingel ",addressNumber:"67",status:"OPN",name:"157- Berchem Kerk",stationType:"BIKE"},{id:"158",long:"4.398386000000000000",lat:"51.201926000000000000",bikes:"16",slots:"20",zip:"2018",address:"Zuidervelodroom",status:"OPN",name:"158- Zuidervelodroom",stationType:"BIKE"},{id:"159",long:"4.399275000000000000",lat:"51.205596000000000000",bikes:"2",slots:"28",zip:"2018",address:"Boudewijnsstraat",status:"OPN",name:"159- Den Bell 2",stationType:"BIKE"},{id:"160",long:"4.388801",lat:"51.203376",bikes:"12",slots:"24",zip:"2018",address:"Brusselstraat",status:"OPN",name:"160- Vlinderpaleis",stationType:"BIKE"},{id:"162",long:"4.368736",lat:"51.219928",bikes:"7",slots:"27",zip:"2050",address:"Blancefloerlaan",addressNumber:"181-185",status:"OPN",name:"162 - Regatta",stationType:"BIKE"},{id:"163",long:"4.377978000000000000",lat:"51.217480000000000000",bikes:"11",slots:"25",zip:"2050",address:"Galgenweellaan",addressNumber:"70",status:"OPN",name:"163 - Pluvier",stationType:"BIKE"},{id:"201",long:"4.420070",lat:"51.260971",bikes:"12",slots:"24",zip:"2030",address:"Havanastraat",addressNumber:"2",status:"OPN",name:"201- Havana",stationType:"BIKE"},{id:"203",long:"4.423168000000000000",lat:"51.253611000000000000",bikes:"6",slots:"30",zip:"2030",address:"Venezuelastraat",addressNumber:"6",status:"OPN",name:"203- Venezuelastraat",stationType:"BIKE"},{id:"204",long:"4.420901000000000000",lat:"51.249964000000000000",bikes:"7",slots:"29",zip:"2030",address:"Noorderlaan",addressNumber:"104",status:"OPN",name:"204- Luchtbal winkelcentrum",stationType:"BIKE"},{id:"205",long:"4.414339000000000000",lat:"51.244781000000000000",bikes:"28",slots:"8",zip:"2030",address:"Groenendaallaan",addressNumber:"397",status:"OPN",name:"205- Kinepolis",stationType:"BIKE"},{id:"206",long:"4.423089000000000000",lat:"51.244502000000000000",bikes:"6",slots:"27",zip:"2030",address:"Bermstraat",addressNumber:"381",status:"OPN",name:"206- Station Luchtbal",stationType:"BIKE"},{id:"207",long:"4.463693000000000000",lat:"51.253646000000000000",bikes:"15",slots:"21",zip:"2170",address:"Van Praetlei",addressNumber:"252",status:"OPN",name:"207- Winkelstap",stationType:"BIKE"},{id:"208",long:"4.454690000000000000",lat:"51.254510000000000000",bikes:"16",slots:"20",zip:"2170",address:"Ringlaan",status:"OPN",name:"208- Ringlaan Atheneum",stationType:"BIKE"},{id:"209",long:"4.447149000000000000",lat:"51.256440000000000000",bikes:"15",slots:"21",zip:"2170",address:"Korte Bremstraat",status:"OPN",name:"209- Melgeshof",stationType:"BIKE"},{id:"210",long:"4.435762000000000000",lat:"51.255228000000000000",bikes:"6",slots:"30",zip:"2170",address:"Maantjessteenweg",status:"OPN",name:"210- Maantjessteenweg",stationType:"BIKE"},{id:"211",long:"4.437315000000000000",lat:"51.251312000000000000",bikes:"6",slots:"30",zip:"2170",address:"Rodeloopstraat",addressNumber:"Rodeloopstraat",status:"OPN",name:"211- Cultuurcentrum",stationType:"BIKE"},{id:"212",long:"4.442306000000000000",lat:"51.250909000000000000",bikes:"8",slots:"26",zip:"2170",address:"Rodeloopstraat",addressNumber:"1",status:"OPN",name:"212- Rode Loop",stationType:"BIKE"},{id:"213",long:"4.448053000000000000",lat:"51.251476000000000000",bikes:"10",slots:"19",zip:"2170",address:"Kroonplein",status:"OPN",name:"213- Kroonplein",stationType:"BIKE"},{id:"214",long:"4.432336000000000000",lat:"51.248100000000000000",bikes:"6",slots:"30",zip:"2170",address:"Kerkhofblommenstraat",status:"OPN",name:"214- Kerkhofblommen",stationType:"BIKE"},{id:"215",long:"4.440150000000000000",lat:"51.246713000000000000",bikes:"17",slots:"19",zip:"2170",address:"Nieuwdreef",status:"OPN",name:"215- Nieuwdreef",stationType:"BIKE"},{id:"216",long:"4.449020000000000000",lat:"51.247269000000000000",bikes:"15",slots:"15",zip:"2170",address:"Van Heybeeckstraat",status:"OPN",name:"216- Zwembad Merksem",stationType:"BIKE"},{id:"217",long:"4.454677000000000000",lat:"51.249165000000000000",bikes:"13",slots:"17",zip:"2170",address:"Bredabaan",status:"OPN",name:"217- Joske Vermeulen",stationType:"BIKE"},{id:"218",long:"4.435687000000000000",lat:"51.243020000000000000",bikes:"12",slots:"24",zip:"2170",address:"Gagelveldenstraat",status:"OPN",name:"218- Groenendaalcollege",stationType:"BIKE"},{id:"219",long:"4.442517000000000000",lat:"51.242161000000000000",bikes:"16",slots:"17",zip:"2170",address:"Borrewaterstraat",status:"OPN",name:"219- Districtshuis Merksem",stationType:"BIKE"},{id:"220",long:"4.447397000000000000",lat:"51.243145000000000000",bikes:"10",slots:"20",zip:"2170",address:"Sint-Bartholomeusstraat",addressNumber:"120",status:"OPN",name:"220- 't Dokske",stationType:"BIKE"},{id:"221",long:"4.407994000000000000",lat:"51.240482000000000000",bikes:"10",slots:"24",zip:"2030",address:"Mexicostraat",status:"OPN",name:"221-Havenhuis",stationType:"BIKE"},{id:"222",long:"4.413912000000000000",lat:"51.233335000000000000",bikes:"6",slots:"30",zip:"2170",address:"Binnenvaartstraat",status:"OPN",name:"222- Cadix Oost",stationType:"BIKE"},{id:"223",long:"4.403114000000000000",lat:"51.233346000000000000",bikes:"34",slots:"2",zip:"2000",address:"Montevideostraat",status:"OPN",name:"223- Red Star Line",stationType:"BIKE"},{id:"224",long:"4.409584000000000000",lat:"51.234392000000000000",bikes:"14",slots:"22",zip:"2000",address:"Indiestraat",status:"OPN",name:"224- Indiestraat",stationType:"BIKE"},{id:"225",long:"4.407688000000000000",lat:"51.230484000000000000",bikes:"3",slots:"31",zip:"2000",address:"Verbindingsdok\/Oostkaai",status:"OPN",name:"225- Verbindingsdok Eilandje",stationType:"BIKE"},{id:"226",long:"4.429735000000000000",lat:"51.233902000000000000",bikes:"7",slots:"28",zip:"2060",address:"Noordschippersdok 41",status:"OPN",name:"226- Noordschippersdok",stationType:"BIKE"},{id:"227",long:"4.444330000000000000",lat:"51.232764000000000000",bikes:"14",slots:"10",zip:"2100",address:"Van Amstelstraat",status:"OPN",name:"227- Amstel",stationType:"BIKE"},{id:"228",long:"4.451413000000000000",lat:"51.229842000000000000",bikes:"18",slots:"6",zip:"2100",address:"Van Heetveldelei",status:"OPN",name:"228- Van Heetvelde",stationType:"BIKE"},{id:"229",long:"4.451985000000000000",lat:"51.226159000000000000",bikes:"13",slots:"21",zip:"2100",address:"Jozef Nellenslei",status:"OPN",name:"229- Jozef Nellens",stationType:"BIKE"},{id:"230",long:"4.461910000000000000",lat:"51.229092000000000000",bikes:"6",slots:"28",zip:"2100",address:"Bosuil",status:"OPN",name:"230- Bosuil",stationType:"BIKE"},{id:"231",long:"4.467826000000000000",lat:"51.229220000000000000",bikes:"23",slots:"11",zip:"2100",address:"Ter Heydenlaan",addressNumber:"235",status:"OPN",name:"231- den Antwerp",stationType:"BIKE"},{id:"232",long:"4.478671",lat:"51.228491",bikes:"9",slots:"23",zip:"2100",address:"Wim Saerensplein",status:"OPN",name:"232- Wim Saerens",stationType:"BIKE"},{id:"233",long:"4.466165000000000000",lat:"51.225095000000000000",bikes:"11",slots:"23",zip:"2100",address:"Gallifortlei",status:"OPN",name:"233- Gallifort",stationType:"BIKE"},{id:"234",long:"4.461183000000000000",lat:"51.222201000000000000",bikes:"14",slots:"22",zip:"2100",address:"Jan Brochovenstraat",addressNumber:"24",status:"OPN",name:"234- Deurne Atheneum",stationType:"BIKE"},{id:"235",long:"4.455008000000000000",lat:"51.219942000000000000",bikes:"28",slots:"7",zip:"2100",address:"Cogelsplein",status:"OPN",name:"235- Cogelsplein",stationType:"BIKE"},{id:"236",long:"4.460066000000000000",lat:"51.219161000000000000",bikes:"28",slots:"7",zip:"2100",address:"Maurice Dequeeckerplein",addressNumber:"1",status:"OPN",name:"236- Districtshuis Deurne",stationType:"BIKE"},{id:"237",long:"4.469246000000000000",lat:"51.220330000000000000",bikes:"22",slots:"12",zip:"2100",address:"Ter Rivierenlaan",status:"OPN",name:"237- Ter Rivieren",stationType:"BIKE"},{id:"238",long:"4.475630000000000000",lat:"51.223732000000000000",bikes:"19",slots:"1",zip:"2100",address:"Ertbruggelaan",addressNumber:"2",status:"OPN",name:"238- Ertbrugge",stationType:"BIKE"},{id:"239",long:"4.479477000000000000",lat:"51.221261000000000000",bikes:"29",slots:"0",zip:"2100",address:"Alfons schneiderlaan",addressNumber:"39",status:"OPN",name:"239- Zwarte Arend",stationType:"BIKE"},{id:"240",long:"4.482117000000000000",lat:"51.217572000000000000",bikes:"19",slots:"16",zip:"2100",address:"Ruggeveldlaan",status:"OPN",name:"240- Park Groot Schijn",stationType:"BIKE"},{id:"241",long:"4.453333000000000000",lat:"51.213333000000000000",bikes:"11",slots:"24",zip:"2100",address:"Collegelaan ",addressNumber:"95",status:"OPN",name:"241- Kerkendijk",stationType:"BIKE"},{id:"242",long:"4.452514000000000000",lat:"51.210431000000000000",bikes:"17",slots:"17",zip:"2140",address:"Te Boelaerlei",status:"OPN",name:"242- Te Boelaerlei",stationType:"BIKE"},{id:"243",long:"4.458156000000000000",lat:"51.209535000000000000",bikes:"10",slots:"26",zip:"2100",address:"Herentalsebaan",status:"OPN",name:"243- Mestputteke",stationType:"BIKE"},{id:"244",long:"4.465315000000000000",lat:"51.207636000000000000",bikes:"27",slots:"8",zip:"2100",address:"Herentalsebaan",status:"OPN",name:"244- Waterbaan",stationType:"BIKE"},{id:"245",long:"4.471315000000000000",lat:"51.206811000000000000",bikes:"23",slots:"13",zip:"2100",address:"Florent Pauwelslei",status:"OPN",name:"245- AZ Monica",stationType:"BIKE"},{id:"246",long:"4.458333000000000000",lat:"51.206946000000000000",bikes:"22",slots:"14",zip:"2100",address:"Arenaplein",status:"OPN",name:"246- Arena",stationType:"BIKE"},{id:"247",long:"4.445950000000000000",lat:"51.208319000000000000",bikes:"6",slots:"29",zip:"2100",address:"Luitenant Lippenslaan",status:"OPN",name:"247- ZNA Sint Erasmus",stationType:"BIKE"},{id:"248",long:"4.449254000000000000",lat:"51.205979000000000000",bikes:"18",slots:"18",zip:"2140",address:"De Schans",status:"OPN",name:"248- De Schans",stationType:"BIKE"},{id:"249",long:"4.444224000000000000",lat:"51.203810000000000000",bikes:"13",slots:"16",zip:"2600",address:"Frans de Vriendstraat",status:"OPN",name:"249- Frans De Vriend",stationType:"BIKE"},{id:"250",long:"4.438997000000000000",lat:"51.201106000000000000",bikes:"10",slots:"26",zip:"2600",address:"Diksmuidelaan",status:"OPN",name:"250- Borsbeekbrug",stationType:"BIKE"},{id:"251",long:"4.452089000000000000",lat:"51.203966000000000000",bikes:"12",slots:"18",zip:"2140",address:"Arthur Matthyslaan",status:"OPN",name:"251- Te Boelaerpark Noord",stationType:"BIKE"},{id:"252",long:"4.450281000000000000",lat:"51.200011000000000000",bikes:"11",slots:"21",zip:"2140",address:"Karel de Preterlei",status:"OPN",name:"252- Te Boelaerpark\/Gitschotellei",stationType:"BIKE"},{id:"253",long:"4.453219000000000000",lat:"51.198064000000000000",bikes:"15",slots:"21",zip:"2140",address:"Vosstraat",status:"OPN",name:"253- Vosplein",stationType:"BIKE"},{id:"254",long:"4.459599000000000000",lat:"51.197541000000000000",bikes:"12",slots:"17",zip:"2100",address:"Boekenberglei",status:"OPN",name:"254- Sint-Jozef",stationType:"BIKE"},{id:"255",long:"4.467644000000000000",lat:"51.204139000000000000",bikes:"15",slots:"21",zip:"2100",address:"Van den Hautelei",status:"OPN",name:"255- Van den Haute",stationType:"BIKE"},{id:"256",long:"4.442231000000000000",lat:"51.195455000000000000",bikes:"8",slots:"19",zip:"2600",address:"Helderstraat",status:"OPN",name:"256- Zillebeek",stationType:"BIKE"},{id:"257",long:"4.44875",lat:"51.192327",bikes:"8",slots:"28",zip:"2600",address:"Hofstadestraat",status:"OPN",name:"257- Hofstade",stationType:"BIKE"},{id:"258",long:"4.443731000000000000",lat:"51.197498000000000000",bikes:"17",slots:"13",zip:"2600",address:"Lodewijk van Berckenlaan",status:"OPN",name:"258- Hof van Nauwelaerts",stationType:"BIKE"},{id:"259",long:"4.437033000000000000",lat:"51.193321000000000000",bikes:"7",slots:"29",zip:"2600",address:"Posthofbrug",status:"OPN",name:"259- Posthofbrug",stationType:"BIKE"},{id:"260",long:"4.421661000000000000",lat:"51.189637000000000000",bikes:"11",slots:"16",zip:"2600",address:"Hof ter Schriecklaan",addressNumber:"1",status:"OPN",name:"260- Ter Schrieck",stationType:"BIKE"},{id:"261",long:"4.429588000000000000",lat:"51.188627000000000000",bikes:"8",slots:"28",zip:"2600",address:"Henri Prostlaan",status:"OPN",name:"261- Brilschans",stationType:"BIKE"},{id:"262",long:"4.435614000000000000",lat:"51.189323000000000000",bikes:"1",slots:"35",zip:"2600",address:"Hoogveld",status:"OPN",name:"262- Hoogveld",stationType:"BIKE"},{id:"263",long:"4.441041000000000000",lat:"51.184528000000000000",bikes:"12",slots:"24",zip:"2600",address:"Fruithoflaan - Jos Ratinckxstraat",addressNumber:"110",status:"OPN",name:"263- Fruithoflaan 2",stationType:"BIKE"},{id:"264",long:"4.435101000000000000",lat:"51.187649000000000000",bikes:"1",slots:"35",zip:"2600",address:"Filip Williotstraat",status:"OPN",name:"264- Filip Williotstraat",stationType:"BIKE"},{id:"265",long:"4.432041000000000000",lat:"51.185138000000000000",bikes:"15",slots:"15",zip:"2600",address:"Pulhoflaan",status:"OPN",name:"265- Pulhof",stationType:"BIKE"},{id:"266",long:"4.434712000000000000",lat:"51.180764000000000000",bikes:"12",slots:"24",zip:"2600",address:"Fruithoflaan - Sint-Theresiastraat",addressNumber:"1",status:"OPN",name:"266- Fruithoflaan 1",stationType:"BIKE"},{id:"267",long:"4.423380000000000000",lat:"51.185888000000000000",bikes:"11",slots:"17",zip:"2600",address:"Prins Leopoldstraat",status:"OPN",name:"267- Leopold",stationType:"BIKE"},{id:"268",long:"4.418486000000000000",lat:"51.182961000000000000",bikes:"14",slots:"22",zip:"2020",address:"Lindendreef",status:"OPN",name:"268- ZNA Middelheim",stationType:"BIKE"},{id:"269",long:"4.424310000000000000",lat:"51.183092000000000000",bikes:"9",slots:"27",zip:"2600",address:"Elisabethlaan",status:"OPN",name:"269- Middelheim",stationType:"BIKE"},{id:"270",long:"4.404271000000000000",lat:"51.186453000000000000",bikes:"6",slots:"30",zip:"2020",address:"Eglantierlaan",status:"OPN",name:"270- Dikke Mee",stationType:"BIKE"},{id:"271",long:"4.408988000000000000",lat:"51.180694000000000000",bikes:"28",slots:"7",zip:"2020",address:"Beukenlaan",addressNumber:"24",status:"OPN",name:"271- Middelheimmuseum",stationType:"BIKE"},{id:"273",long:"4.412831000000000000",lat:"51.175820000000000000",bikes:"5",slots:"31",zip:"2610",address:"Oosterveldlaan",status:"OPN",name:"273- Campus Groenenborger",stationType:"BIKE"},{id:"274",long:"4.394845000000000000",lat:"51.170393000000000000",bikes:"23",slots:"7",zip:"2610",address:"Bist",addressNumber:"148-150",status:"OPN",name:"274- De Bist",stationType:"BIKE"},{id:"275",long:"4.403340000000000000",lat:"51.174365000000000000",bikes:"11",slots:"24",zip:"2610",address:"Groenenborgerlaan 17",status:"OPN",name:"275- Sneeuwbes",stationType:"BIKE"},{id:"276",long:"4.393877000000000000",lat:"51.183506000000000000",bikes:"13",slots:"23",zip:"2610",address:"Kruishofstraat",status:"OPN",name:"276- Corbusier",stationType:"BIKE"},{id:"277",long:"4.399725000000000000",lat:"51.177078000000000000",bikes:"10",slots:"26",zip:"2610",address:"Ahornenlaan ",addressNumber:"4",status:"OPN",name:"277- Ahornen",stationType:"BIKE"},{id:"278",long:"4.393937000000000000",lat:"51.165330000000000000",bikes:"9",slots:"27",zip:"2610",address:"Oversneslaan",addressNumber:"59",status:"OPN",name:"278- Oversnes",stationType:"BIKE"},{id:"279",long:"4.394375000000000000",lat:"51.168681000000000000",bikes:"11",slots:"25",zip:"2610",address:"Doornstraat",status:"OPN",name:"279- Ieperman",stationType:"BIKE"},{id:"280",long:"4.382415000000000000",lat:"51.176724000000000000",bikes:"10",slots:"25",zip:"2610",address:"Bosheidelaan",status:"OPN",name:"280- Marmotteke",stationType:"BIKE"},{id:"281",long:"4.385404000000000000",lat:"51.182476000000000000",bikes:"11",slots:"22",zip:"2020",address:"Hof van Tichelen",status:"OPN",name:"281- Hof van Tichelen",stationType:"BIKE"},{id:"282",long:"4.380868000000000000",lat:"51.180232000000000000",bikes:"11",slots:"24",zip:"2610",address:"Letterkundestraat 61",status:"OPN",name:"282- De Letter",stationType:"BIKE"},{id:"283",long:"4.372030000000000000",lat:"51.181666000000000000",bikes:"16",slots:"20",zip:"2660",address:"Hollebeekstraat",status:"OPN",name:"283- Hollebeek",stationType:"BIKE"},{id:"284",long:"4.364133000000000000",lat:"51.183230000000000000",bikes:"12",slots:"24",zip:"2660",address:"Steynsstraat",status:"OPN",name:"284- Steynsstraat",stationType:"BIKE"},{id:"285",long:"4.352957000000000000",lat:"51.183787000000000000",bikes:"7",slots:"20",zip:"2660",address:"Commandant Weynsstraat",addressNumber:"127",status:"OPN",name:"285- Hoge Beuken",stationType:"BIKE"},{id:"286",long:"4.348112",lat:"51.182534",bikes:"6",slots:"30",zip:"2660",address:"Berkenrodelei",addressNumber:"2",status:"OPN",name:"286- Station Hoboken\/Polderstad",stationType:"BIKE"},{id:"287",long:"4.350760000000000000",lat:"51.177484000000000000",bikes:"11",slots:"25",zip:"2660",address:"Antwerpsesteenweg",status:"OPN",name:"287- Kioskplaats\/Centrum",stationType:"BIKE"},{id:"288",long:"4.359723000000000000",lat:"51.177318000000000000",bikes:"13",slots:"23",zip:"2660",address:"Draaiboomstraat",addressNumber:"50",status:"OPN",name:"288- Draaiboom",stationType:"BIKE"},{id:"289",long:"4.352282000000000000",lat:"51.173553000000000000",bikes:"3",slots:"30",zip:"2660",address:"Walstraat",addressNumber:"3",status:"OPN",name:"289- Broydenborgpark",stationType:"BIKE"},{id:"290",long:"4.367697000000000000",lat:"51.176212000000000000",bikes:"12",slots:"23",zip:"2660",address:"Schoonselhoflei",status:"OPN",name:"290- Co\u00f6peratielaan",stationType:"BIKE"},{id:"291",long:"4.372703000000000000",lat:"51.188503000000000000",bikes:"12",slots:"24",zip:"2020",address:"Maurits Sabbelaan",status:"OPN",name:"291- Braem blokken",stationType:"BIKE"},{id:"292",long:"4.381008000000000000",lat:"51.190807000000000000",bikes:"9",slots:"27",zip:"2020",address:"Jacob le Mairestraat",addressNumber:"8",status:"OPN",name:"292- Kielpark",stationType:"BIKE"},{id:"293",long:"4.390949000000000000",lat:"51.188516000000000000",bikes:"8",slots:"28",zip:"2020",address:"Edgard Casteleinstraat",status:"OPN",name:"293- Edgard Castelein",stationType:"BIKE"},{id:"294",long:"4.376694000000000000",lat:"51.191017000000000000",bikes:"7",slots:"25",zip:"2020",address:"Eugeen Laermansstraat",status:"OPN",name:"294- Den Tir",stationType:"BIKE"},{id:"295",long:"4.379091000000000000",lat:"51.194275000000000000",bikes:"0",slots:"32",zip:"2020",address:"Emiel Vloorstraat",status:"OPN",name:"295- Sporthal Kiel",stationType:"BIKE"},{id:"296",long:"4.393042000000000000",lat:"51.194083000000000000",bikes:"6",slots:"24",zip:"2020",address:"Eric Sassenlaan",status:"OPN",name:"296- Mastvest",stationType:"BIKE"},{id:"297",long:"4.388933000000000000",lat:"51.190620000000000000",bikes:"11",slots:"23",zip:"2020",address:"Tentoonstellingslaan",status:"OPN",name:"297- Tentoonstellingswijk",stationType:"BIKE"},{id:"298",long:"4.382368000000000000",lat:"51.171900000000000000",bikes:"12",slots:"15",zip:"2610",address:"Valkstraat",status:"OPN",name:"298- Koornbloem",stationType:"BIKE"},{id:"299",long:"4.398349000000000000",lat:"51.191955000000000000",bikes:"9",slots:"27",zip:"2020",address:"C.Huysmanslaan",status:"OPN",name:"299- Antwerp expo",stationType:"BIKE"},{id:"300",long:"4.397701000000000000",lat:"51.188747000000000000",bikes:"19",slots:"17",zip:"2020",address:"Vogelzanglaan",status:"OPN",name:"300- Wilrijksepleinen",stationType:"BIKE"},{id:"301",long:"4.450391000000000000",lat:"51.188840000000000000",bikes:"7",slots:"27",zip:"2100",address:"Luchthaven ",status:"OPN",name:"301- Luchthaven ",stationType:"BIKE"},{id:"302",long:"4.390479000000000000",lat:"51.179041000000000000",bikes:"12",slots:"18",zip:"2610",address:"Rozenkrans",status:"OPN",name:"302- Rozenkrans",stationType:"BIKE"},{id:"303",long:"4.409588000000000000",lat:"51.237933000000000000",bikes:"23",slots:"13",zip:"2000",address:"Kambalastraat",status:"OPN",name:"303-Kambala",stationType:"BIKE"},{id:"304",long:"4.433795000000000000",lat:"51.240067000000000000",bikes:"14",slots:"22",zip:"2170",address:"Campiniastraat",addressNumber:"50",status:"OPN",name:"304 - Campinia",stationType:"BIKE"},{id:"305",long:"4.443500000000000000",lat:"51.191308000000000000",bikes:"6",slots:"28",zip:"2600",address:"Ter Nieuwerbrugge",addressNumber:"3",status:"OPN",name:"305 - Ter Nieuwerbrugge",stationType:"BIKE"},{id:"307",long:"4.338246000000000000",lat:"51.172063000000000000",bikes:"16",slots:"19",zip:"2660",address:"Baron Sadoinestraat",addressNumber:"34",status:"OPN",name:"307 - Baron Sadoin",stationType:"BIKE"},{id:"308",long:"4.367170000000000000",lat:"51.171068000000000000",bikes:"12",slots:"23",zip:"2660",address:"Majoor Maelfaitplein",addressNumber:"15",status:"OPN",name:"308 - KDG Campus Hoboken",stationType:"BIKE"},{id:"309",long:"4.349603000000000000",lat:"51.170885000000000000",bikes:"8",slots:"28",zip:"2660",address:"Paul Henri Spaaklaan",addressNumber:"2",status:"OPN",name:"309 - De Torekens",stationType:"BIKE"},{id:"310",long:"4.353652000000000000",lat:"51.167155000000000000",bikes:"4",slots:"26",zip:"2660",address:"Krijgsbaan",addressNumber:"20",status:"OPN",name:"310 - Sporthal Sorghvliedt",stationType:"BIKE"},{id:"311",long:"4.344227000000000000",lat:"51.174546000000000000",bikes:"8",slots:"28",zip:"2660",address:"Cockerillplaats",addressNumber:"12",status:"OPN",name:"311 - Cockerillhof",stationType:"BIKE"},{id:"312",long:"4.342512",lat:"51.184743",bikes:"25",slots:"11",zip:"2660",address:"Graspolderlaan",addressNumber:"15-21",status:"OPN",name:"312 - Graspolder",stationType:"BIKE"},{id:"314",long:"4.363276",lat:"51.169097",bikes:"14",slots:"22",zip:"2660",address:"Sint-Bernardsesteenweg",addressNumber:"847",status:"OPN",name:"314 - Schoonselhof",stationType:"BIKE"},{id:"316",long:"4.358049000000000000",lat:"51.181743000000000000",bikes:"5",slots:"29",zip:"2660",address:"Dokter Emiel Van Dammestraat",addressNumber:"28-30",status:"OPN",name:"316 - D.E. Van Damme",stationType:"BIKE"},{id:"317",long:"4.433105",lat:"51.252073",bikes:"13",slots:"23",zip:"2170",address:"Sluitberg",addressNumber:"10",status:"OPN",name:"317 - Distelhoek",stationType:"BIKE"},{id:"319",long:"4.405166000000000000",lat:"51.172836000000000000",bikes:"4",slots:"32",zip:"2610",address:"Schaliemolenstraat",addressNumber:"6",status:"OPN",name:"319 - Schaliemolen",stationType:"BIKE"},{id:"320",long:"4.375633000000000000",lat:"51.174055000000000000",bikes:"12",slots:"24",zip:"2610",address:"Den Brem",addressNumber:"91",status:"OPN",name:"320 - Den Brem",stationType:"BIKE"},{id:"321",long:"4.430026000000000000",lat:"51.175079000000000000",bikes:"12",slots:"24",zip:"2610",address:"Monnikenplein",addressNumber:"1",status:"OPN",name:"321 - Monnikenplein",stationType:"BIKE"},{id:"322",long:"4.382131000000000000",lat:"51.166950000000000000",bikes:"16",slots:"17",zip:"2610",address:"Malisgoed",addressNumber:"7",status:"OPN",name:"322 - Malisgoed",stationType:"BIKE"},{id:"323",long:"4.418924",lat:"51.175348",bikes:"8",slots:"27",zip:"2610",address:"Oosterveldlaan",addressNumber:"24",status:"OPN",name:"323 - Sint-Augustinus",stationType:"BIKE"},{id:"324",long:"4.461313000000000000",lat:"51.204304000000000000",bikes:"7",slots:"16",zip:"2100",address:"Dordrechtlaan",addressNumber:"2",status:"OPN",name:"324 - Dordrechlaan",stationType:"BIKE"},{id:"325",long:"4.359931000000000000",lat:"51.174881000000000000",bikes:"7",slots:"29",zip:"2660",address:"Paul Vekemanslaan",addressNumber:"18",status:"OPN",name:"325 - Paul Vekemans",stationType:"BIKE"},{id:"326",long:"4.363470000000000000",lat:"51.187436000000000000",bikes:"12",slots:"23",zip:"2660",address:"Krugerbrug tov Lageweg 342",status:"OPN",name:"326 - Krugerbrug",stationType:"BIKE"},{id:"327",long:"4.374881000000000000",lat:"51.177213000000000000",bikes:"5",slots:"25",zip:"2610",address:"Ridderveld",addressNumber:"7",status:"OPN",name:"327 - Ridderveld",stationType:"BIKE"},{id:"328",long:"4.475061000000000000",lat:"51.219152000000000000",bikes:"12",slots:"24",zip:"2100",address:"Schotensesteenweg",addressNumber:"1 - 7",status:"OPN",name:"328 - Oude Terminus",stationType:"BIKE"},{id:"329",long:"4.470640000000000000",lat:"51.226097000000000000",bikes:"4",slots:"23",zip:"2100",address:"Prosper de Wittestraat",addressNumber:"5-9",status:"OPN",name:"329 - Prosper de Wit",stationType:"BIKE"},{id:"330",long:"4.356264",lat:"51.172341",bikes:"14",slots:"19",zip:"2660",address:"Meerlenhoflaan",addressNumber:"32",status:"OPN",name:"330 - Meerlenhof",stationType:"BIKE"},{id:"331",long:"4.338699",lat:"51.175517",bikes:"11",slots:"25",zip:"2660",address:"Zaatlaan",addressNumber:"6",status:"OPN",name:"331 - Zaatlaan",stationType:"BIKE"},{id:"332",long:"4.385419000000000000",lat:"51.167514000000000000",bikes:"5",slots:"31",zip:"2610",address:"Michel Geysemansstraat",addressNumber:"10",status:"OPN",name:"332 - Valkstraat",stationType:"BIKE"},{id:"333",long:"4.441730",lat:"51.254570",bikes:"9",slots:"21",zip:"2170",address:"Frans Adriaenssensst",addressNumber:"123",status:"OPN",name:"333 - Frans Adriaenssen \/ Joma",stationType:"BIKE"},{id:"334",long:"4.483170000000000000",lat:"51.219789000000000000",bikes:"17",slots:"19",zip:"2100",address:"August van de Wielelei",addressNumber:"136",status:"OPN",name:"334 - Den Haas",stationType:"BIKE"},{id:"337",long:"4.353356000000000000",lat:"51.163790000000000000",bikes:"8",slots:"28",zip:"2660",address:"Verenigde Natieslaan",addressNumber:"168",status:"OPN",name:"337 - Verenigde Naties",stationType:"BIKE"},{id:"339",long:"4.332148",lat:"51.175400",bikes:"14",slots:"22",zip:"2660",address:"Leo Bosschartlaan",status:"OPN",name:"339 - 't Veer",stationType:"BIKE"},{id:"340",long:"4.404972000000000000",lat:"51.168131000000000000",bikes:"10",slots:"26",zip:"2610",address:"Dokter Donnyplein",addressNumber:"1-9",status:"OPN",name:"340 - Dokter Donny",stationType:"BIKE"},{id:"342",long:"4.383487",lat:"51.206119",bikes:"7",slots:"29",zip:"2000",address:"Jos Smolderenstraat",status:"OPN",name:"342 - Nieuw Zuid",stationType:"BIKE"}],
  mobilecheck: function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }
}

module.exports = LC_GoogleMapsHelper;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5);
var isBuffer = __webpack_require__(13);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(15);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var settle = __webpack_require__(16);
var buildURL = __webpack_require__(18);
var parseHeaders = __webpack_require__(19);
var isURLSameOrigin = __webpack_require__(20);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(21);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(22);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(17);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(5);
var Axios = __webpack_require__(14);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(28);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(29);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(23);
var dispatchRequest = __webpack_require__(24);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(25);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(4);
var isAbsoluteURL = __webpack_require__(26);
var combineURLs = __webpack_require__(27);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ })
/******/ ]);