(function( $ ) {

	'use strict';
	
	$.fn.formValidation = function( options, callback ) {

		// default options
		var defaults = {
			identifier: 'data-validate',
			validateEvents : 'blur', 
			errorClass: 'error',
			identifier: 'data-validate',
			elements: ['textarea', 'checkbox', 'input', 'password', 'radio']
		};
		var options = $.extend(defaults, options);

		function bindFormSubmit(form) {
      		var self = this,
          	opt  = this.options;
      
	      	form.submit(function() {
				return self.allFieldsValid(form, true);
	      	});
    	};

		// each form to be validated
		return this.each( function () {

			// hijack the HTML5 form validation
			var $form = $(this).attr('novalidate', 'novalidate');
				
			// each form element that should be validated   
			var $inputs = $form.find(identified);
		}




	});
 
}(jQuery));