ko.subscribable.fn.subscribeChanged = function(callback) {
	var oldValue;
	this.subscribe(function(_oldValue) {
		oldValue = _oldValue;
	}, this, 'beforeChange');

	this.subscribe(function(newValue) {
		callback(newValue, oldValue);
	});
};

ko.bindingHandlers.slider = {
		init: function (element, valueAccessor, allBindingsAccessor) {
			var options = allBindingsAccessor().sliderOptions || {};
		    $(element).slider(options);
		    ko.utils.registerEventHandler(element, "slidechange", function (event, ui) {
		        var observable = valueAccessor();
		        observable(ui.value);
		    });
		    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
		        $(element).slider("destroy");
		    });
		    ko.utils.registerEventHandler(element, "slide", function (event, ui) {
		        var observable = valueAccessor();
		        observable(ui.value);
		    });
		},
		update: function (element, valueAccessor) {
		    var value = ko.utils.unwrapObservable(valueAccessor());
		    if (isNaN(value)) value = 0;
		    $(element).slider("value", value);
		}
};

ko.bindingHandlers.checkedUniform = {
        init: function (element, valueAccessor) {
        	ko.bindingHandlers.checked.init(element, valueAccessor);
        	$(element).uniform();
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value == null) {
                element.indeterminate = true;
            }
            else {
                element.indeterminate = false;
            }
            $.uniform.update($(element));
        }
};

ko.bindingHandlers.dialog = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};
            //do in a setTimeout, so the applyBindings doesn't bind twice from element being copied and moved to bottom
            setTimeout(function() {
                options.close = function() {
                    allBindingsAccessor().dialogVisible(false);
                };

                $(element).dialog(ko.toJS(options));
            }, 0);

            //handle disposal (not strictly necessary in this scenario)
             ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                 $(element).dialog("destroy");
             });
        },
        update: function(element, valueAccessor, allBindingsAccessor) {
            var shouldBeOpen = ko.utils.unwrapObservable(allBindingsAccessor().dialogVisible),
                $el = $(element),
                dialog = $el.data("uiDialog") || $el.data("dialog"),
                options = valueAccessor();

            //don't call dialog methods before initilization
            if (dialog) {
                $el.dialog(shouldBeOpen ? "open" : "close");

                for (var key in options) {
                    if (ko.isObservable(options[key])) {
                        $el.dialog("option", key, options[key]());
                    }
                }
            }
        }
};

/*
ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: false,
    decorateElement: true
});
*/


// dates START
function currentDate() {
    return moment(); //sends current datetime
};

function formatDate(date, format) {
	return moment(date).format(format);
	//current date we can retrieve with line below but line above is reusable with other dates
	//return moment().format('DD.MM.YYYY');
}

// dates END


// URL location START
function currentUrl() {
	var protocol = $(window.location).attr('protocol');
	var location = $(window.location).attr('host');
	var HOST_URL = protocol+"//"+location+"/";

	return HOST_URL;
};

// URL location END


function ajax_request(method_type, url, json_data, global, async) {

	return $.ajax({
           type: method_type,
           url: url,
           data: json_data,
           dataType: "json",
           global: global,
           async: async,
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
     });

};



function BaseClass(params) {
	var self = this;

	params = params || {};

	// objects BEGIN

	self.Program = function Program(data) {
		var selectedStatus = false;
		if(data.selected == undefined || data.selected == null) {
			selectedStatus = false;
		}
		else {
			selectedStatus = data.selected;
		}

		this.name = ko.observable(data.name);
		this.selected = ko.observable(selectedStatus);
		this.program = ko.observable(data.program);
	};

	self.Series = function Series(data) {
		this.seriesId = ko.observable(data.seriesId);
		this.seriesName = ko.observable(data.seriesName);
		this.parentId = ko.observable(data.parentId);
		this.parentName = ko.observable(data.parentName);
	};

	self.Commercial = function Commercial(data) {
		this.commercialId = ko.observable(data.commercialId);
		this.commercialName = ko.observable(data.commercialName);
		this.parentId = ko.observable(data.parentId);
		this.parentName = ko.observable(data.parentName);
	};

	self.Population = function Population(data) {
		this.populationValue = data.populationValue;

		//add whitespace to elements that doesn't contain < or > so all numbers are aligned
		if(data.populationText.indexOf('<') == 0 || data.populationText.indexOf('>') == 0) {
			this.populationText = data.populationText;
		}
		else {
			this.populationText = "\u00A0\u00A0\u00A0"+data.populationText;
		}
	};

	self.Quarter = function Quarter(data) {
		var selectedStatus = false;
		if(data.selected == undefined || data.selected == null) {
			selectedStatus = false;
		}
		else {
			selectedStatus = data.selected;
		}

		this.text = data.text;
		this.selected = ko.observable(selectedStatus);
		this.value = data.value;
	};

	self.Year = function Year(data) {
		this.yearValue = data.yearValue;
		this.yearText = data.yearText;
	};

	self.DayOfWeek = function DayOfWeek(data) {
		var selectedStatus = false;
		if(data.selected == undefined || data.selected == null) {
			selectedStatus = false;
		}
		else {
			selectedStatus = data.selected;
		}

		this.weekdayValue = data.weekdayValue;
		this.selected = ko.observable(selectedStatus);
		this.weekdayText = data.weekdayText;
	};

	self.Measures = function Measures(data) {
		var selectedStatus = false;
		if(data.selected == undefined || data.selected == null) {
			selectedStatus = false;
		}
		else {
			selectedStatus = data.selected;
		}

		this.text = data.value;
		this.selected = ko.observable(selectedStatus);
		this.value = data.value;
	};

	self.Splits = function Splits(data) {
		var selectedStatus = false;
		if(data.selected == undefined || data.selected == null) {
			selectedStatus = false;
		}
		else {
			selectedStatus = data.selected;
		}

		this.text = data.text;
		this.selected = ko.observable(selectedStatus);
		this.value = data.value;
	};

	self.MeasureColumn = function MeasureColumn(data) {
		var selectedStatus = false;
		if(data.selected == undefined || data.selected == null) {
			selectedStatus = false;
		}
		else {
			selectedStatus = data.selected;
		}

		this.text = data.text;
		this.selected = ko.observable(selectedStatus);
		this.value = data.value;
	};


	// objects END



	// reusable methods BEGIN

	self.getById = function getById(items, value) {
		if (!value) {
			return [];
		}

		var result = ko.utils.arrayFirst(items, function(item) {
			return item.value === value;
		});

		return result && result.childItems || [];
	};

	self.createDynamicPropertyParam = function(propertyName, paramName) {
		self[propertyName] = ko.computed({
	        read: function() {
	            var months = self[paramName]();
	            for (var i = 0; i < months.length; i++) {
	                if (!months[i].selected()) return false;
	            } // put this parenthesis outside "return true" if select all element should be checked if only one child checkbox is selected
	            return true;
	        },
	        write: function(value) {
	            ko.utils.arrayForEach(self[paramName](), function(month){
	            	month.selected(value);
	            });
	        }
	    });
	};

	// reusable methods END

};