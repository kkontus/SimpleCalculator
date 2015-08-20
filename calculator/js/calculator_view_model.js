$( document ).ready( function() {
function CalculatorViewModel() {
	
	var self = this;	
	BaseClass.call(self);
	
	//AJAX SETTINGS
	var HOST_URL = currentUrl();
	var CUSTOM_PART_URL = "/calculator/CalculatorController.php";
	var METHOD_TYPE = "POST";
	var GLOBAL = false;
	var ASYNC = false;
	
	//BUTTON DEFAULT VALUES
	this.display = ko.observable("");	
	
	this.value0 = ko.observable("0");
	this.value1 = ko.observable("1");
	this.value2 = ko.observable("2");
	this.value3 = ko.observable("3");
	this.value4 = ko.observable("4");
	this.value5 = ko.observable("5");
	this.value6 = ko.observable("6");
	this.value7 = ko.observable("7");
	this.value8 = ko.observable("8");
	this.value9 = ko.observable("9");
	
	this.valueMrc = ko.observable("mrc");
	this.valueMminus = ko.observable("m-");
	this.valueMplus = ko.observable("m+");
	
	this.valueAddition = ko.observable("+");
	this.valueSubtraction = ko.observable("-");
	this.valueMultiplication = ko.observable("*");
	this.valueDivision = ko.observable("/");
	
	this.valueDecimal = ko.observable(".");
	this.valueC = ko.observable("C");
	this.valueEquals = ko.observable("=");

	
	//BUTTON FUNCTIONALITY
	this.button0 = function() {
		enterOperands(self.value0());
	}
	this.button1 = function() {
		enterOperands(self.value1());		
	}
	this.button2 = function() {
		enterOperands(self.value2());
	}
	this.button3 = function() {
		enterOperands(self.value3());
	}
	this.button4 = function() {
		enterOperands(self.value4());
	}
	this.button5 = function() {
		enterOperands(self.value5());
	}
	this.button6 = function() {
		enterOperands(self.value6());
	}
	this.button7 = function() {
		enterOperands(self.value7());
	}
	this.button8 = function() {
		enterOperands(self.value8());
	}
	this.button9 = function() {
		enterOperands(self.value9());
	}
	
	
	this.buttonMrc = function() {
		this.display("NOT IMPLEMENTED");
	}
	this.buttonMminus = function() {
		this.display("NOT IMPLEMENTED");
	}
	this.buttonMplus = function() {
		this.display("NOT IMPLEMENTED");
	}	
	
	
	this.buttonAddition = function() {
		enterOperation("+");
	}
	this.buttonSubtraction = function() {
		enterOperation("-");
	}
	this.buttonMultiplication = function() {
		enterOperation("*");
	}
	this.buttonDivision = function() {
		enterOperation("/");
	}	
	
	
	this.buttonDecimal = function() {
		var currentValue = self.display();

		if(currentValue.indexOf('.') === -1) {
			enterOperands(".");
		}
	}
	this.buttonC = function() {
		clearDisplay();
	}
	this.buttonEquals = function() {
		var url = HOST_URL + CUSTOM_PART_URL;
		var json_data = {
			"calculation_params": self.display()
		};
		var response = ajax_request(METHOD_TYPE, url, json_data, GLOBAL, ASYNC).success(function(data, status) {
			self.display(data.result.toString());
			//console.log(data);
		}).error(function(request,error) {
			alert("Request: "+JSON.stringify(request));
		});	
	}	
	
	function executeAjaxCall() {
		var url = HOST_URL + CUSTOM_PART_URL;
		var json_data = {
			"calculation_params": self.display()
		};
		var response = ajax_request(METHOD_TYPE, url, json_data, GLOBAL, ASYNC).success(function(data, status) {
			//console.log(data);
		}).error(function(request,error) {
			alert("Request: "+JSON.stringify(request));
		});	

		return response;
	}	
	
	function enterOperation(buttonClickedValue) {
		var currentValue = self.display();
		var exist = false;
		if(currentValue.indexOf('+') !== -1 || currentValue.indexOf('-') !== -1 || currentValue.indexOf('*') !== -1 || currentValue.indexOf('/') !== -1) {
			exist = true;
		}
			
		var lastCharacter = currentValue.substr(currentValue.length-1); 
		if(currentValue == "") {
			currentValue = "0"+buttonClickedValue;
		}
		else if(lastCharacter == buttonClickedValue) {
			currentValue = currentValue; //do not add operation sign
		}
		else {
			currentValue = currentValue+buttonClickedValue;
		}
	
		if (exist) {
			var response = executeAjaxCall();
			currentValue = response.responseJSON.result+buttonClickedValue;
		}		
		self.display(currentValue);		
	}

	function enterOperands(buttonClickedValue) {
		var currentValue = self.display();		

		var lastCharacter = currentValue.substr(currentValue.length-1); 
		if(lastCharacter == "/" && buttonClickedValue == "0") {
			self.display("Cannot devide by zero");
		}
		else {		
			currentValue = currentValue+buttonClickedValue;
			self.display(currentValue);
		}
	}
	
	function clearDisplay() {
		self.display(""); //clears display
	}
	
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
				
};

// this line below doesn't have to be used but it saves memory usage
CalculatorViewModel.prototype = new BaseClass();

var ViewModel = {};
ViewModel.calculatorViewModel = new CalculatorViewModel();

ko.applyBindings(ViewModel.calculatorViewModel);

});