var result = 'nice decoding young padawan learner free ticket code is arkapi';
var encodedString = '';
var original = '';

for (var i = 0; i < result.length; i++) {
	var encoded = result.charAt(i).charCodeAt(0) + 7;
	if (encoded > 122) encoded = encoded - 122 + 96;
	encodedString = encodedString + String.fromCharCode(encoded);
}

console.log(encodedString);

for (var i = 0; i < encodedString.length; i++) {
	var encoded = encodedString.charAt(i).charCodeAt(0) - 7;
	if (encoded == 32) { //space special treatment
		encoded = 32;
	} else if (encoded < 96) {
		encoded = 122 - (96 - encoded);
	}
	original = original + String.fromCharCode(encoded);
}

console.log(original);