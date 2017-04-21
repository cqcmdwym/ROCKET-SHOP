var assert = require("assert");
var MembershipApplication = require("../models/membership_application");

describe("Membership application requirement", function(){
    var validApp;

    before(function(){
        validApp = new MembershipApplication({
            first:"Test",
            last:"User",
            email:"test@test.com",
            age:30,
            height:66,
            weight:180
        });
    });

    describe("Application valid if...", function(){
        it("all validators successful",function(){
            assert(validApp.isValid(), "Not valid");
        });
        it("email is 4 or more chars and contains an @", function(){
            assert(validApp.emailIsValid());
        });
        it("height is between 60 and 75 inches", function(){
            assert(validApp.heightIsValid());
        });
        it("age is between 15 and 100", function(){
            assert(validApp.ageIsValid());
        });
        it("weight is between 100 and 300", function(){
            assert(validApp.weightIsValid());
        });
        it("first and last name are provided", function(){
            assert(validApp.nameIsValid());
        });
    });

    describe("Application invalid if...", function(){
        it("email is 4 characters or less", function(){
            var app = new MembershipApplication({email:"d@d"});
            assert(!app.emailIsValid());
        });
        it("email does not contain an @", function(){
            var app = new MembershipApplication({email:"dd:dd.com"});
            assert(!app.emailIsValid());
        });
        it("email is omitted", function(){
            var app = new MembershipApplication();
            assert(!app.emailIsValid());
        });
        it("height is less than 60 inches", function(){
            var app = new MembershipApplication({heigth:10});
            assert(!app.emailIsValid());
        });
        it("height is more than 76 inches", function(){
            var app = new MembershipApplication({heigth:80});
            assert(!app.emailIsValid());
        });
        it("height is more than 76 inches", function(){
            var app = new MembershipApplication();
            assert(!app.emailIsValid());
        });
        it("age is less than 15", function(){
            var app = new MembershipApplication({age:5});
            assert(!app.ageIsValid());
        });
        it("age is more then 100", function(){
            var app = new MembershipApplication({heigth:110});
            assert(!app.ageIsValid());
        });
        it("age is omitted", function(){
            var app = new MembershipApplication();
            assert(!app.ageIsValid());
        });
        it("weight is less than 100 and 300", function(){
            var app = new MembershipApplication({weight:90});
            assert(!app.weightIsValid());
        });
        it("weight is more than 300", function(){
            var app = new MembershipApplication({weight:390});
            assert(!app.weightIsValid());
        });
        it("weight is omitted", function(){
            var app = new MembershipApplication();
            assert(!app.weightIsValid());
        });
        it("first name is omitted", function(){
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });
        it("last name is omitted", function(){
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });
    })
});