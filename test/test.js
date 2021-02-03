/**
 * @module       test
 * @file         test.js
 * @description  test the all routes for crud operation
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        2/01/2021  
-----------------------------------------------------------------------------------------------*/

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
chai.use(chaiHttp);
//assertion style
chai.should();
const greet = require("./greetings.json");

describe("Greetings API", () => {

    /**
     * @description Test the GET API
     */
    describe("GET /greetings", () => {

        // test the GET API when points are proper
        it("givenGreetings_WhenGivenProperEndPoints_ShouldReturn_object", (done) => {
            console.log("getting all data .");
            chai
                .request(server)
                .get("/greetings")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        // test the GET API when points are not proper
        it("givenGreetings_WhenNotGivenProperEndPoints_ShouldNotReturn_object", (done) => {
            chai
                .request(server)
                .get("/greeting")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * @description Test the GET API using Id
     */
    describe("/GET /greetings/greetingId", () => {

        // test the GET API when provided proper greeting Id
        it("givenGreetings_WhenGivenProperGreetoingId_ShouldGive_object", (done) => {
            const greetingId = greet.greetings.GetGreetingById.greetingId
            chai
                .request(server)
                .get("/greetings/" + greetingId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("greetingId");
                    response.body.should.have.property("name");
                    response.body.should.have.property("message");
                    done();
                });
        });

        // test the GET API when provided improper greeting Id
        it("givenGreetings_WhenNotGivenProperGreetoingId_ShouldNotGive_object", (done) => {
            const greetingID = 144;
            chai
                .request(server)
                .get("/Greetings/" + greetingID)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("task with provided id does not exist");
                    done();
                });
        });
    });


    /**
     * @description Test the POST API 
     */
    describe("POST /greetings", () => {

        // test the POST API when provided proper data
        it("givenGreetings_WhenGivenProperNameAndMessage_ShouldPost_Greeting", (done) => {
            const greeting = greet.greetings.greetingToPost;
            chai
                .request(server)
                .post("/greetings")
                .send(greeting)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a("object");
                    response.body.should.have.property("greetingId").eq(9);
                    response.body.should.have.property("name").eq("Ccompany");
                    response.body.should.have.property("message").eq("CHello");
                    done();
                });
        });

        // test the POST API when provided improper data
        it("givenGreetings_WhenNotGivenProperNameAndMessage_ShouldNotPost_Greeting", (done) => {
            const greeting = greet.greetings.greetingWithoutName;
            console.log("not post", greeting);
            chai
                .request(server)
                .post("/greetings/")
                .send(greeting)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eq("it is not accepting without name property");
                    done();
                });
        });
    });


    /**
     * @description Test the PUT API using Id
     */
    describe("/PUT  /greetings/:greetingId", function() {
        // test the PUT API when provided proper Id
        it("givenGreetings_WhenGivenProperId_ShouldUpdate_Greeting", (done) => {
            const greetingID = greet.greetings.greetingToUpdate.greetingId;
            const greeting = greet.greetings.greeting7;
            chai
                .request(server)
                .put("/greetings/" + greetingID)
                .send(greeting)
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("Response Body:", res.body);
                    res.body.should.be.a("Object");
                    res.body.should.have.property(" greetingId").eq(2);
                    res.body.should.have.property("name").eq("payalllchanged");
                    res.body.should.have.property("greeting").eq("Worlddd");
                    done();
                });
        });

        // test the PUT API when provided improper Id
        it("givenGreetings_WhenNotGivenProperName_ShouldNotUpdate_Greeting", (done) => {
            const greetingID = greet.greetings.greetingWithoutName.greetingId;
            const greeting = greet.greetings.greeting8;
            chai
                .request(server)
                .put("/greetings/" + greetingID)
                .send(greeting)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eq("it is not accepting without name property");
                    done();
                });
        });
    });
});