let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
chai.use(chaiHttp);
//assertion style
chai.should();
//console.log("server", server)
const greet = require("./greetings.json");
//const API = 'http://localhost:2000/greetings'

describe("Greetings API", () => {
    /**
     * test the GET method
     */
    describe("GET /greetings", () => {
        it("givenGreetings_WhenGivenProperEndPoints_ShouldReturn_object", (done) => {
            console.log("getting all data .");
            chai
                .request(server)
                .get("/greetings")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    //console.log("Response Body:", res.body);
                    done();
                });
        });

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
     * Test th GET by id
     */
    describe("/GET /greetings/greetingId", () => {
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


    describe("POST /greetings", () => {
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


        it("givenGreetings_WhenNotGivenProperNameAndMessage_ShouldNotPost_Greeting", (done) => {

            const greeting = greet.greetings.greetingWithoutName;
            console.log("not post", greeting);
            chai
                .request(server)
                .post("/greetings/")
                .send(greeting)
                .end((err, res) => {
                    res.should.have.status(400);
                    // console.log("Response Body:", res.body);
                    res.text.should.be.eq("it is not accepting without name property");
                    done();
                });
        });
    });

    describe("/PUT  /greetings/:greetingId", function() {
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

    /**
     * test delete
     */
    describe("DELETE /greetings/greetingID", function() {
        it("givenGreetings_WhenGivenProperId_ShouldDelete_Greeting", (done) => {
            const greetingID = greet.greetings.greetingToDelete.greetingId;
            chai
                .request(server)
                .delete("/greetings/" + greetingID)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

        it("givenGreetings_WhenNotGivenProperId_ShouldNotDelete_Greeting", (done) => {
            const greetingID = 144;
            chai
                .request(server)
                .delete("/greetings/" + greetingID)
                //.send(greeting)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("it cannot delete with wrong greeting id");
                    done();
                });
        });
    });
});