(function( $ ) {

	'use strict';

	function Plugin( element, options, custom, callback ) {

		// default options
		var defaults = {
			validateEvents : 'blur', 
			errorClass: 'error',
			identifier: 'data-custom',
			validationMessage: 'data-validation-message',
			validationMessageMismatch: 'data-mismatch-message'
		};

		var helpers = {};

		this.options = $.extend(defaults, options);
		
		this.validationRules = custom;

		this.element = element;

		this.$element = $(element);

		this.init();
	}

	Plugin.prototype.validateCustom = function (input) {
		var self = this;
		var validationRule = $(input).attr(self.options.identifier);

		console.log('called', self.validationRules[validationRule]($(input).attr('value'), input, self.element),"now we show input:", $(input).val());
		// runs specified helper/custom validation
		if (self.validationRules.hasOwnProperty(validationRule)) {
			return self.validationRules[validationRule]($(input).val(), input, self.element);
		} 
		return false;
	};

	Plugin.prototype.setErrorMessage = function (input, event) {
		var self = this;
		var validationMsg = $(input).attr(self.options.validationMessage);
		var misMatchMsg =  $(input).attr(self.options.validationMessageMismatch);
		var customValidationRule = $(input).attr(self.options.identifier);

		//console.log(input.validity, customValidationRule, validationMsg );
		// account for custom error handling

		if (customValidationRule && validationMsg) {


			//invalidate by default
			input.setCustomValidity(validationMsg);

			console.log('result of custom validatioN:', self.validateCustom(input));
			
			//check custom validation
			if (self.validateCustom(input) === true) {

				//if validation function returns true the we validate 
				input.setCustomValidity('');
				if(input.validity.typeMismatch) {
					//changes type to overide type mismatch validation. Feels hacky maybe remvove
					$(input).attr('type', 'text');
				}
				console.log('we valid', input.validity);
			}

		} else {
				// configure apply validation message according to nature of error.
		if (input.validity.valueMissing) {

			if (validationMsg) {

				input.setCustomValidity(validationMsg);

			}

	    } else if (input.validity.typeMismatch) {

	    	if (misMatchMsg) {

				input.setCustomValidity(misMatchMsg);

			}

	    } else {
	    	input.setCustomValidity('');
	    }


		}


	
	};


	Plugin.prototype.checkFormValidity = function () {
		var self = this;
		var form = this.element;
		var validity = true;
		var input;

		if (form && form.length > 0) {
			// for each input configure custom messages and add event handler
			for (var i=0, max=form.length; i < max; i++) {
				input = form[i];
				if (input.tagName === "INPUT") {
					if(!input.checkValidity()) {
						validity = false;
					}
				}
			};
		}
		if (validity) {
			self.Valid = true;
			return true;
		} else {
			self.inValid = true;
			return false;
		}
	};

	Plugin.prototype.HandleEvents = function (input) {
		var self = this;	

		$(input).on('change', $.proxy(function(event) {
			console.log('calling');
			self.setErrorMessage(event.currentTarget, event);

		}, self));

		$(input).on('input', $.proxy(function(event) {
			console.log('calling');
			self.setErrorMessage(event.currentTarget, event);

		}, self));
	};

	Plugin.prototype.init = function () {
		var self = this;
		var form = this.element;
		var input;

		// for each input configure custom messages and add event handler
		for (var i=0, max=form.length; i < max; i++) {
			input = form[i];
			if (input.tagName === "INPUT") {
				self.setErrorMessage(input);
				self.HandleEvents(input);
			}
		}
	};


	$.fn.warrant = function ( options, custom, callback ) {
		var self = this;
		var custom = custom || {};
		var options = options || {};

		return this.each(function (index) {
			$.data(this, 'warrant', new Plugin( this, options, custom));
		});
	};


}(jQuery));

