beforeEach(module('ngStorage'));

afterEach(inject(function ($httpBackend, $localStorage) {
    $localStorage.$reset();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
}));

describe('starter', () => {
    it('has tests', () => {
    });
});
