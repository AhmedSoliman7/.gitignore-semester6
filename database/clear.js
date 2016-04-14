var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');

/**
 * remove airports from airport if the collection was not empty .
 */
 exports.removeAirports = function removeAirports(cb){
   airport.count(function(err,count){
     if(count == 0){
        cb(err,false);
    }
    else {
      airport.remove(function(err,removed){
        cb(err,removed);
      });
    }
  });
 }

  /**
   * remove flights from flight if the collection was not empty .
   */
   exports.removeFlights = function removeAirports(cb){
     flight.count(function(err,count){
       if(count == 0){
          cb(err,false);
      }
      else {
        flight.remove(function(err,removed){
          cb(err,removed);
        });
      }
    });
   }
