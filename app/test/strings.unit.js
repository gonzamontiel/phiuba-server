const chai = require('chai');
const expect = chai.expect;
var strings = require('app/lib/strings');

describe('sanitize', function() {
    it('Sanitize empty string', function() {
        var input = "";
        var expected = "";
        expect(strings.sanitize(input)).to.equal(expected);
    });

    it('Sanitize string with diacritic chars', function() {
        var input = "Análisis matemático II A (Éxito)";
        var expected = "analisis matematico ii a exito";
        expect(strings.sanitize(input)).to.equal(expected);
    });
});

describe('tokenize', function() {
    it('Tokenize empty string', function() {
        var input = "";
        var expected = "";
        expect(strings.tokenize(input)).to.equal(expected);
    });

    it('Tokenize text default', function() {
        var input = "Esta es una oración";
        var expected = "Esta es una oración Est ora orac oraci oració";
        expect(strings.tokenize(input)).to.equal(expected);
    });

    it('Tokenize text custom min chars', function() {
        var input = "Esta oración";
        var expected = "Esta oración Es Est or ora orac oraci oració";
        expect(strings.tokenize(input, 2)).to.equal(expected);
    });
});
