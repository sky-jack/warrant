// spec.js
describe("creating an instance of a validation plugin", function () {

	var $form;

	beforeEach(function() {
		/*
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form" id="testing" >',
			'<input type="text" name="first-name" value="my first name"  required="true" id="first-name" data-validate-message="please enter your first name" />',
			'<input type="text" name="last-name" value="dsds" required="true"  id="last-name" data-validate-message="please enter a last name" />',
			'<input type="email" name="email" value="jack@email.com" id="email" required="true"  data-validate-message="please enter a valid email" />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);*/

	});


	it('is chainable', function() {


		//$form.warrant().addClass('testing');
		//proclaim.strictEqual($form.hasClass('testing'), true);

	});

	it('has verified inputs', function() {
	
		$('#testing').warrant();

		//$form.data('warrant').selectInputs();
		//proclaim.strictEqual($form.data('warrant').$inputs.length, 3);
	});

	/*


	it('can validate all inputs', function() {

		$form.warrant();
	//	$form.data('warrant').selectInputs();
		$form.data('warrant').validateAllInputs();
		console.log($form.find('[data-valid]').length);
		proclaim.greaterThan($form.find('[data-valid]').length, 1);
		
	});


	$('[data-javascript=demo-form]').remove();

	*/

});


/*


describe("creating an instance of a validation plugin with no  helpers", function () {
	var $form;

	beforeEach(function() {
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form" >',
			'<input type="text" name="first-name" value="asdasd" required="true"  data-validate-message="please enter a value" />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);

	});

	it('can validate inputs with no helper specified', function() {

		var $formInstance;
		$form = $([
	
		].join('\n'));

		$('body').append($form);

		$form = $('[data-javascript=demo-form]');
		$form.warrant();
		$form.data('warrant').selectInputs();
		var isValid = $form.data('warrant').validateAllInputs();
		console.log(isValid);
		proclaim.strictEqual(isValid, true);
	});

	$('[data-javascript=demo-form]').remove();

});

?8

// spec.js
describe("creating an instance of a form and validation plugin that requires helpers", function () {
	var $form;

	beforeEach(function() {
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form"  >',
			'<input type="text" name="first-name" value="asdasd" id="first-name" required="true" data-validate-message="please enter a value" />',
			'<input type="email" name="email"  id="email" value="jack@email.com"  required="true" data-validate-message="please enter a valid email" />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);

	});


	it('can validate an element using a helper', function() {
		
		$form = $('[data-javascript=demo-form]');
		$form.warrant();
		var isValid = $form.data('warrant').validateAllInputs();
		proclaim.strictEqual(isValid, true);

	});

	$('[data-javascript=demo-form]').remove();

});


describe("creating an instance of a form and validation plugin that requires custom functions", function () {

	beforeEach(function() {
		$form = $([
			'<form action="/url" name="test" data-javascript="demo-form" >',
			'<input type="text" name="first-name" id="first-name" value="asdasd" required="true" data-validate-message="please enter a value"  />',
			'<input type="email" name="email" id="email" value="mustbeblue" data-custom="custom1" data-validate="custom1" required="true" data-validate-message="please enter a valid email" />',
			'<button type="submit" >Log in</button>',
			'</form>'
		].join('\n'));

		$('body').append($form);

	});

	it('can validate an element using a custom function', function() {

		var $form = $('[data-javascript=demo-form]');
		$form.warrant({},{
			custom1 : function (value, $input) {
				if (value == 'mustbeblue') {
					return true;
				}
			}
		});

		$form.data('warrant').selectInputs();
		var isValid = $form.data('warrant').validateAllInputs();
		proclaim.strictEqual(isValid, true);
		$formInstance = $form.data('warrant');
	});

	$('[data-javascript=demo-form]').remove();
});

*/