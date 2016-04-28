var app = angular.module('starter');

app.controller('passengerViewController' , function($scope, global) {

  $scope.departureDate    = "20th, April 2016";
	$scope.arrivalDate      = "21th, April 2016";
	$scope.origin           = "CAI";
	$scope.destination      = "JED";
	$scope.flightClass      = "Economy";
	$scope.tripType         = 2;
	$scope.outgoingFlight   = angular.copy(global.outGoingTrip);
  if($scope.tripType == 2)
		$scope.returnFlight = angular.copy(global.returnTrip);


    $scope.formData =[];
  	$scope.formDataChildren =[];
  	$scope.errors = [];
  	$scope.errorsChildren = [];

  	if(!global.searchFlight.adults)
  		global.searchFlight.adults = 1;
  	if(!global.searchFlight.children)
  		global.searchFlight.children = 0;
  	$scope.infoFlow = global;

  	$scope.adults   = new Array(parseInt(global.searchFlight.adults));
  	$scope.children = new Array(parseInt(global.searchFlight.children));

    $scope.validAdults = function(){
  		for (var i = 0; i < $scope.errors.length; i++) {
  		  if($scope.errors[i])
          return false;
  		}
      return true;
  	}

    $scope.validChildren = function(){
  		for (var i = 0; i < $scope.errorsChildren.length; i++) {
  		  if($scope.errorsChildren[i])
          return false;
  		}
      return true;
  	}

    $scope.submitForm = function(){
      // Validate adult form fields.
  		if(validateForm($scope.formData, false, $scope, global.searchFlight.adults)
  		  &validateForm($scope.formDataChildren, true, $scope, global.searchFlight.children)){
  			// Determine if the passenger is child or adult
  			for(i = 0; i < $scope.formData.length; i++)
  				$scope.formData[i].isChild = false;
  			for(i = 0; i < $scope.formDataChildren.length; i++)
  				$scope.formDataChildren[i].isChild = true;
  			// Set passengers Array in service with filled passengers info .
  			global.setPassengers($scope.formData.concat($scope.formDataChildren));
  			// Redirect to confirmation page.
  			// $location.path('/confirmation');
  		}
  	}
});

/**
* Validate birth date of an adult.
* @return boolean
*/
function validateDate(stringDate , isChild){
	var birthDate   	 = new Date(Date.parse(stringDate));
	var nowDate     	 = new Date(Date.now());
	var yearDifference   = nowDate.getFullYear() - birthDate.getFullYear();

	if(birthDate >= nowDate)
		return false;
	if(!isChild)
		return yearDifference >= 12;
	else
		return yearDifference < 12;
}


/** function to validate email address.
* returns boolean to indicate validity.
* Using regular expressions to test email format.
*/
function validateEmail(email)
{
	if(!email)
		return false;
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

/**
* Validate adults form fields.
* Takes scope and callback function as parameters.
* Returns boolean isValid to indicate form fields validity.
*/
function validateForm(formData, isChild, $scope,length) {
	var validationErrors = [];
	if(isChild)
		$scope.errorsChildren = validationErrors;
	else
		$scope.errors = validationErrors;

	// Boolean value to check the validation of the form.
	var isValid = true;

	// Integer to indicate errors occurences
	var countErrors = 0;

	// Loop in formData submitted to check fields.
	for(var i = 0; i < length; i++){
		if(!formData[i])
			formData[i] = {};
		// Check if first name  field is empty.
		if(!formData[i].firstName){
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].firstName = true;
			countErrors++;
		}

		// Check if last name field is empty.
		if(!formData[i].lastName){
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].lastName = true;
			countErrors++;
		}

		// Check if nationality field is empty.
		if(!formData[i].nationality) {
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].nationality = true;
			countErrors++;
		}

		// Check if passport number field is empty or is not valid.
		if(!formData[i].passportNum){
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].passportNumber = true;
			countErrors++;
		}
		else if(formData[i].passportNum.length < 7) {
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].passportNumberLength = true;
			countErrors++;
		}

		// check if email address field is empty or is not valid.
		if(!isChild && !validateEmail(formData[i].email))  {
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].emailAddressNotValid = true;
			countErrors++;
		}

		// check if birthDate field is empty or is not valid.
		if(!formData[i].dateOfBirth) {
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].birthDateRequired = true;
			countErrors++;
		}
		else if(!validateDate(formData[i].dateOfBirth , isChild)){
			if(!validationErrors[i])
				validationErrors[i] = {};
			validationErrors[i].birthDateNotValid = true;
			countErrors++;
		}
	}

	// Check if error(s) found isValid is set to false.
	if(countErrors > 0)
		isValid = false;
	return isValid;
}
