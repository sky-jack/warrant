
This is a jQuery plugin that provides a simple way to customise the behaviour of the native HTML form validation using data attributes. It uses the native validation supported in modern browsers using the Constraints API.  It's aim is to simplify the process of adding custom error messages for required fields and type mismatch errors. It also allows you to specify custom functions for more complicated field validation that might involve multiple fields, in all other cases its hands off the task of validation to the browser.


## Browser Support

This library is dependent upon the Constraints API is only supported by modern Browser IE 10+ [http://caniuse.com/#feat=form-validation](http://caniuse.com/#feat=form-validation)


A client-side form validation should only ever be a secondary measure besides server side validation for older browsers, client side validation should 'fall-back' to reliance upon server-side validation.


## Guide to usage


To initialise this library on a form do the following:


```javascript

$('#form').warrant();

```

Then to provide custom messaging for required fields add the following data attributes to each input:

```html
	<form action="/url" name="test" id="form" >
		<input type="text" name="first-name" value=""  required="true" id="first-name" data-validation-message="please enter your first name" />
		<button type="submit" >Submit</button>
	</form>
```
    
Users will then see this message rather than the default 'please enter a value' message when a field has not been given a value.


You may also add a data-attribute to specify a custom message for type mismatch errors, for example on inpult elements with at type of email or url that do not contain a valid value:


```html
	<form action="/url" name="test" id="form" >
		<input type="text" name="first-name" value=""  required="true" id="first-name" data-validation-message="please enter your first name" data-mismatch-message="please enter a specific type of email" />
		<button type="submit" >Submit</button>
	</form>
```


If you wish to provide a custom function to overide existing validation you can pass this in on initalisation

```javascript

		$form.warrant({}, {
			acustomfunction : function (value, input, form) {
				if (value === 'blue') {
					return true;
				}
			}
		});

```

You may then specify upon which element it should be used using the 'data-custom' data atrribute. You will also need to provide a custom validation message as above:

 

```html
	<form action="/url" name="test" id="form" >
		<input type="text" name="first-name" value=""  required="true" id="first-name" data-validation-message="please enter your first name" data-custom="acustomfunction" data-validation-message="This is a custom message relating to the custom function" />
		<button type="submit" >Submit</button>
	</form>
```

There is also the ability to pass in callback functions to allow for custom functionality in combination with various results of input validation. You may currently supply a callback named onValidInput that fires each time an input in the specified form is marked as valid:

```javascript

	$form.warrant({}, {}, {
		onValidInput: function(input) {
			console.log('do something');
		}
	});

```
Further callback options will follow.




