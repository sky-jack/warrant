(function( $ ) {

	'use strict';

	function Plugin( element, options, custom, callback ) {

		// default options
		var defaults = {
			validateEvents : 'blur', 
			errorClass: 'error',
			identifier: 'data-custom',
			validationMessageRequired: 'data-validate-message',
			validationMessageMismatch: 'data-validate-message'
		};

		var helpers = {};

		this.options = $.extend(defaults, options);
		
		this.validationRules = custom;

		this.element = element;

		this.$element = $(element);

		this.init();
	}

	Plugin.prototype.selectInputs = function () {
		var self = this;
		self.$inputs = this.$element.find('input');
	};

	Plugin.prototype.validateCustom = function ($input) {
		var self = this;
		// runs specified helper/custom validation
		if (this.validationRules.hasOwnProperty(validationRule)) {
			return self.validationRules[validationRule]($input.attr('value'), $input, self.$element) 
		}
		return false;
	};

	Plugin.prototype.setErrorMessage = function (input) {
		var self = this;
		var requiredMsg;
		var misMatchMsg;

		// configure custome validation messages from data atrributes
		if (self.options.validationMessageRequired) {
			requiredMsg = $(input).attr(self.options.validationMessageRequired);
		};
		if (self.options.validationMessageMismatch) {
			misMatchMsg = $(input).attr(self.options.validationMessageMismatch);
			console.log(misMatchMsg);
		}

		// configure apply validation message according to nature of error.
		if (input.validity.valueMissing) {

			if (requiredMsg) {
				input.setCustomValidity(requiredMsg);
			}

	    } else if (input.validity.typeMismatch) {

	    	if (misMatchMsg) {
				input.setCustomValidity(misMatchMsg);
			}

	    } else {
	    	input.setCustomValidity('');
	    }
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

				$(input).on('change', $.proxy(function(event) {
					self.setErrorMessage(event.currentTarget);
				},self));
			}
		}
	};


	$.fn['warrant'] = function ( options, custom, callback ) {
		var self = this;
		var custom = custom || {};
		var options = options || {};

		return this.each(function (index) {
			$.data(this, 'warrant', new Plugin( this, options, custom));
		});
	};


}(jQuery));

