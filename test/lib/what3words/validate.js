var expect = require('chai').expect;

module.exports = {
  _geojson: {
    index_home_raft: {
      crs: {
        type: 'link',
        properties: {
          href: 'http://spatialreference.org/ref/epsg/4326/ogcwkt/',
          type: 'ogcwkt'
        }
      },
      bbox: [-0.203607, 51.521238, -0.203564, 51.521265],
      geometry: {
        coordinates: [-0.203586, 51.521251],
        type: 'Point'
      },
      type: 'Feature',
      properties: {
        words: 'index.home.raft',
        language: 'en',
        map: 'http://w3w.co/index.home.raft',
        status: {
          status: 200,
          reason: 'OK'
        },
        thanks: 'Thanks from all of us at index.home.raft for using a what3words API'
      }
    }

  },

  validateGeoJSONPayload: function (data) {
    expect(data).to.deep.equal(this._geojson.index_home_raft);
  }
};
