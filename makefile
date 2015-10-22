compile:
	babel --stage 0 --optional runtime src --out-dir lib

test: compile
	mkdir -p tmp_test/{src,tests}
	cp lib/* tmp_test/src
	babel --stage 0 tests --out-file tmp_test/tests/index.js
	mocha tmp_test/tests/index.js
	# rm -rf tmp_test
