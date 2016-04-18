var app=angular.module('austrianAirlinesApp');

app.controller('flightsController', function($scope, flights, global, $location){

	$scope.airline          = "Austrian";

	var outgoingDate        = new Date(global.searchFlight.outgoingDate);
	var returnDate          = new Date(global.searchFlight.returnDate);
	$scope.departureDate    = outgoingDate.toDateString();
	$scope.arrivalDate      = returnDate.toDateString();

	$scope.origin           = global.searchFlight.origin;
	$scope.destination      = global.searchFlight.destination;
	$scope.flightClass      = capitalize(global.searchFlight.flightClass);
	$scope.tripType         = global.searchFlight.tripType;
	$scope.outgoingFlights  = angular.copy(flights.outgoingFlights);
	$scope.returnFlights    = angular.copy(flights.returnFlights);

	// Converting outgoing flights dated into form of hours and minutes
	for(i = 0; i < $scope.outgoingFlights.length; i++){

		var departureTime                           = new Date($scope.outgoingFlights[i].departureDateTime);
		$scope.outgoingFlights[i].departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

		var arrivalTime                             = new Date($scope.outgoingFlights[i].arrivalDateTime);
		$scope.outgoingFlights[i].arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
	}


	// Converting return flights dated into form of hours and minutes
	for(i = 0; i < $scope.returnFlights.length; i++){

		var departureTime                           = new Date($scope.returnFlights[i].departureDateTime);
		$scope.returnFlights[i].departureDateTime   = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

		var arrivalTime                             = new Date($scope.returnFlights[i].arrivalDateTime);
		$scope.returnFlights[i].arrivalDateTime     = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
	}

	// Array to store indexes of selected flights
	$scope.info   = [];

	// Model to represent which flight to show its information
	$scope.trans  = {id: -1};

	$scope.step   = 1;


	// Function will be performed when submitting reserve button
	$scope.moveForward = function(){

		if(!$scope.info[0] || ($scope.tripType == 2 && !$scope.info[1] && $scope.returnFlights.length > 0)) {
			Materialize.toast('Please select the flight.',3000);
		}
		else{
			// Passing selected outgoing flight to the global service
			global.outGoingTrip = $scope.outgoingFlights[$scope.info[0]];
			if ($scope.tripType == 2){
				// Passing selected return flight to the global service
				global.returnTrip = $scope.returnFlights[$scope.info[1]];
			}
			if($scope.tripType == 2 &&  $scope.returnFlights.length==0)
				global.searchFlight.tripType = 1;
			$location.path('/passengers');
		}

	};
});

/**
* Capitalize first letter in a string
*/
function capitalize(s){
	return s[0].toUpperCase() + s.slice(1);
}