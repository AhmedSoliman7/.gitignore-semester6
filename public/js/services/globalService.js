angular.module('austrianAirlinesApp').service('global', function() {
	// A list of passengers whose info are entered by the user
	
 this.passengers = [{firstName:"mohamed",
 lastName : "khaled",
 emailAddress : "mohamedkhly@gmail.com",
 passportNumber : "A2112D",
 birthDate : "30-4-1995",
 nationality : "Egyptian",type:"Adult"},
{firstName:"mohamed",
 lastName : "khaled",
 emailAddress : "mohamedkhly@gmail.com",
 passportNumber : "A2112D",
 nationality : "Egyptian",type:"Child"}
 ];
	// the outgoing trip selected by the user
	this.outGoingTrip =
	{
		origin: 'CAI',
		destination : 'JKA',
		flights : [
			{
				airport : 'CAI',
				date : 'March 25',
				duration: '5',
				class: 'Economy',
				seat : '23B'
			},
			{
				airport : 'Tegel',
				date : 'March 26',
				duration: '1',
				class: 'Economy',
				seat : '22E'
			}
		]
	};

	// The return trip selected by the user
	this.returnTrip =
	{
		origin: 'JKA',
		destination : 'CAI',
		flights : [
			{
				airport : 'JKA',
				date : 'April 1',
				duration: '4',
				class: 'Economy',
				seat : '23B'
			},
			{
				airport : 'Tegel',
				date : 'March 26',
				duration: '1',
				class: 'Economy',
				seat : '22E'
			}
		]
	};


	/**
	* Set the passengers array
	*/
	this.setPassengers = function(passengersArr)
	{
		this.passengers = passengersArr;
	}

	/**
	* Add a passenger to the passengers array
	*/
	this.addPassenger = function(passenger)
	{
		this.passengers.push(passenger);
	}

	/**
	* Get a list of passengers in the service
	*/
	this.getPassengers = function()
	{
		return this.passengers;
	}

	/**
	* Set the outgoing trip to a list of flights (to handle transits)
	*/
	this.setOutGoingTrip = function(trip)
	{
		this.outGoingTrip = trip;
	}

	/**
	* Get the list of flights of the outgoing trip
	*/
	this.getOutGoingTrip = function()
	{
		return this.outGoingTrip;
	}

	/**
	* Set the return trip to a list of flights
	*/
	this.setReturnTrip = function(trip)
	{
		this.returnTrip = trip;
	}

	/**
	* get the list of flights of the return trip
	*/
	this.getReturnTrip = function()
	{
		return this.returnTrip;
	}




});
