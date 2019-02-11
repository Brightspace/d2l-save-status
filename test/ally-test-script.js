// eslint-disable-next-line no-unused-vars
var isAttestInstalled = function() {

	try {
		attest.reset();
	}
	catch (err) {
		return false;
	}
	return true;
};

// eslint-disable-next-line no-unused-vars
var ally_tests = function(my_delay) {

	function delay(t, v) {
		return new Promise(function(resolve) {
			setTimeout(resolve.bind(null, v), t);
		});
	}
	//disable a few rules that don't apply to our component
	var rules_options = {
		'rules':{
			'html-has-lang':{enabled:false},
			'landmark-one-main':{enabled:false},
			'page-has-heading-one':{enabled:false},
			//'region':{enabled:false},
			//'duplicate-id':{enabled:false}
		}
	};
	var my_res = '_UNSET';
	return delay(my_delay || 0).then(function() {
		return attest.run(rules_options).then(
			function(results) {
				my_res = results;
				expect(results.violations.length).to.equal(0);
			})
			.catch(
				function(err) {
					var i;
					for (i = 0; i < my_res.violations.length; i++) {
						// eslint-disable-next-line no-console
						console.log(JSON.stringify(my_res.violations[i]));
					}
					throw err;
				}
			);
	});
};
