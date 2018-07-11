'use strict';

import {LC_GoogleMaps} from "./components/googlemaps";

window.initMapHelper = function () {
  const API_URL = 'https://www.velo-antwerpen.be/availability_map/getJsonObject';
  let map = new LC_GoogleMaps(
    'exampleMap',
    {overview: false, cluster: false}
  );
  map.init(API_URL);
  map.searchMarker('Monnikenplein', 'address', true);
}
