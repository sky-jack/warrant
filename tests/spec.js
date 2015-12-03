// spec.js
describe("creating an instance of a validation plugin on a valid form", function () {

	var $form;

	before(function() {
		
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form" id="testing" >',
			'<input type="text" name="first-name" value="ad"  required="true" id="first-name" data-validation-message="please enter your first name" />',
			'<input type="text" name="last-name" value="dasd" required="true"  id="last-name" data-validation-message="please enter a last name" />',
			'<input type="email" name="email" value="jack@email.com" id="email" required="true"  data-validation-message="please enter a valid email" />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);

	});


	it('is chainable', function() {

		$form.warrant().addClass('testing');
		proclaim.strictEqual($form.hasClass('testing'), true);

	});

	it('will validate', function() {
	
		$form.warrant();
		proclaim.strictEqual($form.data('warrant').checkFormValidity(), true);
	});



});

// spec.js
describe("creating an instance of a validation plugin for an invalid form", function () {

		before(function() {
		
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form" id="testing" >',
			'<input type="text" name="first-name" value=""  required="true" id="first-name" data-validation-message="please enter your first name" />',
			'<input type="text" name="last-name" value="" required="true"  id="last-name" data-validation-message="please enter a last name" />',
			'<input type="email" name="email" value="jack@email.com" id="email" required="true"  data-validation-message="please enter a valid email" />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);

	});

	it('has applied a custom validation message based on inputs data attribute', function() {
	
		$form.warrant();
		$form.find('input');
		var $firstInvalid = $form.find('input');
		proclaim.strictEqual($firstInvalid[0].validationMessage, $firstInvalid.attr('data-validation-message'));
	});


});

// spec.js
describe("creating an instance of a validation plugin with an  invalid form and custom validation function", function () {

		before(function() {
		
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form" id="testing" >',
			'<input type="text" name="first-name" value="asdasd"  required="true" id="first-name" data-validation-message="please enter your first name" />',
			'<input type="text" name="last-name" value="blue" required="true"  id="last-name" data-custom="custom1"  data-validation-message="please enter blue" />',
			'<input type="email" name="email" value=""  data-custom="custom1" id="email" required="true"  />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);

	});

	it('has applies a custom validation function based upon the data attribute present', function() {
	
		$form.warrant({}, {
			custom1 : function (value, input, form) {
				if (value === 'blue') {
					return true;
				}
			}
		});
		$form.data('warrant').checkFormValidity();
		var $customInput = $form.find('[name="last-name"]');
		proclaim.strictEqual($customInput[0].validity.valid, true);


	});

	it('has applies a custom validation function and shows a custom message if not true', function() {
		

		var $customInput = $form.find('[name="last-name"]');
		$customInput.attr('value', '');

		$form.warrant({}, {
			custom1 : function (value, input, form) {
				if (value === 'blue') {
					return true;
				}
			}
		});
		
		proclaim.strictEqual($customInput[0].validationMessage, $customInput.attr('data-validation-message'));



	});







});
