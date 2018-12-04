'use strict';

suite('<d2l-save-status>', function() {

	var element, sandbox;

	suiteSetup(function() {
		sandbox = sinon.sandbox.create();
		element = fixture('basic');
	});

	suiteTeardown(function() {
		sandbox.restore();
	});

	suite('smoke test', function() {
		test('can be instantiated', function() {
			expect(element.is).to.equal('d2l-save-status');
		});
	});

	suite ('Ally Test', function() {
		suiteSetup(function() {
			if (!isAttestInstalled()) {
				// eslint-disable-next-line no-invalid-this
				this.skip();
			}
		});
		test('d2l-save-status a11y checks', function() {
			return ally_tests();
		});
	});
});
