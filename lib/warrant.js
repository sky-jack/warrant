(function( $ ) {

	'use strict';

	function Plugin( element, options, custom, callback ) {

		// default options
		var defaults = {
			identifier: 'data-validate',
			validateEvents : 'blur', 
			errorClass: 'error',
			identifier: 'data-validate',
			validationMessage: 'data-validate-message',
			elements: ['textarea', 'checkbox', 'email', 'input', 'password', 'radio']
		};

		// a selection of validation rules
		var helpers = {
			isNumber: function(value) {
  				return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
			},
			isEmail: function(value) {
				return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
			},
			isUrl: function(value) {
				return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
			}
		};
		
		this.options = $.extend(defaults, options);
		
		this.validationRules = $.extend(helpers, custom);

		this.$element = $(element);

		this.fresh = true;

		this.errors = [];

		this.allGood = true;


		// hijack native browser validation
		this.$element.attr('novalidate', 'novalidate');
		this.init();
	}

		// is this element not empty
	Plugin.prototype.isNotEmpty = function ($input) {
		var placeholder = $input.attr('placeholder');
		return ($input.val().length && $input.val() !== placeholder) ? true : false;
	};

	Plugin.prototype.selectInputs = function () {
		var self = this;
		// generate element string from inputs that contain the correct identifier data attribute
		var identified = [];

		$.each(self.options.elements, function(key, value) {
			identified.push(value+'['+self.options.identifier+']');
		});
		identified = identified.join(', ');
		this.$inputs = this.$element.find(identified);
	};


	Plugin.prototype.validateAllInputs = function () {
		var self = this;
		
		self.selectInputs();

		// validate each compatible form element                
		self.$inputs.each(function () {
			var $this = $(this);
	
				if (!self.validateInput($this) === true)	{

				$this.attr('data-valid', true);
				self.allGood = true

			} else {

				$this.attr('data-valid', false);
				self.allGood = false;

			}
		});
		//returns true if all elements are valid
		if (self.allGood == true) {
			return true;
		} 
		return false;
	};


	Plugin.prototype.validateInput = function ($input) {
		var self = this;
		var type = $input.attr('type');

		// acquire the data validation rule from the inputs data attribute
		var validationRule = $input.attr(self.options.identifier);
		console.log('validationRule',validationRule.length);
		if (validationRule && validationRule.length > 0) {

			if (validationRule == "required") {
				console.log('is not empty', $input);
				return self.isNotEmpty($input);
			}
			// runs specified helper/custom validation
			if (this.validationRules.hasOwnProperty(validationRule)) {
				return self.validationRules[validationRule]($input.attr('value'), $input, this.$element);
			} 

		} else if ($input.attr('required')) {

			return self.isNotEmpty($input);

		} else {

			return false;
		}
	};


	Plugin.prototype.checkElement = function($input) {
		var self = this;
 		console.log("input is valid", self.validateInput($input));
		if (self.validateInput($input) == true) {
			console.log('isvalid yeah!', $input);
			self.toggleError($input, true);
			$input.unbind('keyup');

		} else {
			self.allGood = false;
			self.errors.push(true);
			self.toggleError($input);
			self.validateOnChange($input, self.validateInput($input));
			
		}
	};

	Plugin.prototype.toggleError = function($input, remove) {
		var self = this;
		var id = $input.attr('id');
		var errorText = $input.attr(self.options.validationMessage);
		var type = $input.attr('type');
		var errorId = id + '-error';
		var $msg = $('#' + errorId);
		var $lastElement;
		console.log('to be removed',remove);
		if (remove) {
			$input.removeClass(self.options.errorClass);
				$msg.animate({'opacity' : 0}, self.options.speed /2, self.options.ease, function () {
					$msg.remove();
					

			});
		} else {

			$lastElement = $input;
			$input.addClass(self.options.errorClass);
			$msg.remove();
			$lastElement.after('<label class="error-message ' + type +'" id="' + errorId + '" for="' + id + '" data-test="email-error-' + id + '">' + errorText + '</label>').next().css({'opacity' : 0}).animate({'opacity' : 1}, self.options.speed, self.options.ease).parent().addClass('redraw').removeClass('redraw');

		}
	};
		// Does this element have errors
	Plugin.prototype.hasError = function (errors) {
		return ($.inArray(true, errors)) ? false : true;
	};

	Plugin.prototype.validateOnChange = function ($input) {
		var self = this;
		// re-validate when input is updated
		$input.keyup(function () {
			// valid input: remove error message, remove an error from the array, remove the keyup event
			if (self.validateInput($input)) {

				self.toggleError($input, true);
				self.errors.pop();
			} else {
				self.toggleError($input);
			}
		}); // end keyup
	};

	Plugin.prototype.bindFormSubmit = function ($form) {
		var self = this;

		$form.submit(function (event) {

			// have we submitted the form before or are there errors?
			// dont submit the form & de-flower virgin
			if (self.fresh || !self.allGood) {
				event.preventDefault();
				self.fresh = false;
			
			// No Errors: Submit the form
			} else if (self.allGood) {
				return true;
			}

			// reset errors to erase results from last submit
			self.errors = [];

			// validate each compatible form element                
			self.$inputs.each(function () {
				var $input = $(this);
				self.checkElement($input);
			}); // end each element
			console.log('error logging', self.errors);
			// no errors: remove the submit event from the form, then re-submit
			if (!self.hasError(self.errors)) {
				// if callback function passed, then run                        
				if (typeof(callback) === 'function') {
					callback($form);
				// else submit the form without validation                          
				} else {
					$form.unbind('submit').submit();
				}
			// errors: focus on the first element with errors
			} else {
			//	$form.find('.' + options.errorClass + ':first').focus();
			}
		}); // end form submit

	};

	Plugin.prototype.init = function () {
		var self = this;

		this.selectInputs();

		this.bindFormSubmit(self.$element);

		this.$element.click(function() {
			
		});
	};

	/*
		Plugin.prototype.handleAccordionClick = function () {
			this.$sections.show();
		};
	*/

	$.fn['warrant'] = function ( options, custom, callback ) {
		var self = this;
		var custom = custom || {};
		var options = options || {};

		return this.each(function (index) {
			$.data(this, 'warrant', new Plugin( this, options, custom));
		});
	}
	
	
}(jQuery));


