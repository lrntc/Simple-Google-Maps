'use strict';

import {LC_GoogleMaps} from "./components/googlemaps";

window.initMapHelper = function () {
  let map = new LC_GoogleMaps('exampleMap', {
      zoom: 2,
  });
  // map.init();
  map.search('gdansk', false);
}
