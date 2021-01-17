var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
//let server1 = require("routes/greeting.rt.js");
const should = chai.should;
chai.use(chaiHttp);
//assertion style
chai.should();
// const app = express();
// app.use(express.json());
//const greetings = require("../greetings.json");
const API = "http://localhost:2000";
//const greetings = require('../controllers/greeting.ctr.js');
// chai.use(chaiHttp);
// describe("Greetings API", () => {

// beforeEach((done) => {
//     greetings.remove({}, (err) => {
//        done();
//     });
// });

describe("Greetings API", () => {
  /**
   * test the GET method
   */
  describe("GET /greetings", () => {
    it("should get all the greetings", (done) => {
      console.log("getting all data .");
      chai
        .request(server)
        .get("/greetings")
        // .send({})
        .end((err, res) => {
          // console.log(res);
          // console.log("err",err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          // should(res.body).be.a('object');
          // res.body.length.should.be.eq(3);
          //console.log("Response Body:", res.body);
          // console.log (result);
          done();
        });
    });

    it("it should NOT GET all the greetings", (done) => {
      chai
        .request(server)
        .get("/greeting")
        .end((err, res) => {
          res.should.have.status(404);
          // console.log (result);
          done();
        });
    });
  });

  /**
   * Test th GET by id
   */
  describe("GET /greetingss/:greetingId", () => {
    it("should get greeting by id", (done) => {
      const greetingID = 2;
      chai
        .request(server)
        .get("/greetingss/" + greetingID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("greetingID");
          res.body.should.have.property("name");
          res.body.should.have.property("message");
          // res.body.should.have.property("greetingId").eq(2);
          done();
        });
    });

    // it("Should get Particular greeting only", (done) => {
    //   chai
    //     .request(API)
    //     .get("/greetings/" + greetings[1].isbn)
    //     .end((err, result) => {
    //       result.should.have.status(200);
    //       console.log(
    //         "Fetched Particlar greting using /GET//greetings/:greetingId ::::",
    //         result.body
    //       );
    //       done();
    //     });

    it("should not get greeting by id", (done) => {
      const greetingId = 144;
      chai
        .request(server)
        .get("/greetings/" + greetingId)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("task with provided id does not exist");
          done();
        });
    });
  });

  // describe("Greetings API", function(){
  //     describe ("DELETE ALL", function(){
  //         it("should remove all first", done=>{
  //            // console.log ("getting all data ")
  //             chai.request(server)
  //                 .get("/books/")
  //                 .send({})
  //                 .end((err,res)=>{
  //                     //console.log (res)
  //                     // console.log("err",err);
  //                     res.should.have.status(200);
  //                     console.log("Response Body:", res.body);
  //                     // console.log (result);
  //                     done()
  //                 })
  //         })

  //     })
  //     /// some other tests we will write here
  // })

  describe("POST /greetings", function () {
    it("Should add greeting in DB", (done) => {
      const greeting = {
        name: "payalll",
        message: "Worlddd",
      };

      chai
        .request(server)
        .post("/greetings")
        // .send(greetings[greeting])
        .send(greeting)
        .end((err, res) => {
          res.should.have.status(200);
          // console.log("Response Body:", res.body);
          // res.should.have.status(200);
          //res.body.should.be.a("Object");
          should(res.body).be.a("object");
          // res.body.should.have.property("id").eq(4);
          res.body.should.have.property("name").eq("payalll");
          res.body.should.have.property("greeting").eq("Worlddd");

          done();
        });
    });

    it("Should not add greeting without name property", (done) => {
      const greeting = {
        greeting: "hello",
      }
      chai
        .request(server)
        .post("/greetings")
        // .send(books[book])
        .send(greeting)
        .end((err, res) => {
          res.should.have.status(400);
          // console.log("Response Body:", res.body);

          res.text.should.be.eq("it is not accepting without name property");
          done();
        });
    });
  });

  describe("PUT /greetings/:greetingId", function () {
    it("Should put new greeting in DB", (done) => {
      const greetingID = 1;
      const greeting = {
        name: "payalllchanged",
        message: "Worlddd",
      };

      // for (book in books) {
      chai
        .request(server)
        .put("/greetings/" + greetingID)
        // .send(greetings[greeting])
        .send(greeting)
        .end((err, res) => {
          res.should.have.status(200);
          // console.log("Response Body:", res.body);
          // res.should.have.status(200);
          //res.body.should.be.a("Object");
          should(res.body).be.a("object");
          res.body.should.have.property(" greetingID").eq(1);
          res.body.should.have.property("name").eq("payalllchanged");
          res.body.should.have.property("greeting").eq("Worlddd");

          done();
        });
    });

    it("Should not add greeting with less than 3 char name property", (done) => {
      const greetingID = 1;
      const greeting = {
        name: "pa",
        greeting: "hello",
      };

      chai
        .request(server)
        .put("/greetings/" + greetingID)
        // .send(books[book])
        .send(greeting)
        .end((err, res) => {
          res.should.have.status(400);
          // console.log("Response Body:", res.body);

          res.text.should.be.eq("it is not accepting without name property");
          done();
        });
    });
  });

  /**
   * test delete
   */
  describe("DELETE /greetings/:greetingId", function () {
    it("Should delete existing greeting in DB", (done) => {
      const greetingID = 1;
      // for (book in books) {
      chai
        .request(server)
        .delete("/greetings/" + greetingID)
        // .send(greetings[greeting])
        .send(greeting)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("Should not delete greeting with wrong id property", (done) => {
      const greetingID = 144;
      chai
        .request(server)
        .delete("/greetings/" + greetingID)
        .send(greeting)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq("it cannot delete with wrong greeting id");
          done();
        });
    });
  });
});
// it ("Should Fecth all the Books", (done)=>{
//     chai.request(server)
//         .get("/books/")
//         .end((err, result)=>{
//             result.should.have.status(200);
//             console.log ("Got",result.body.data.length, " docs")
//             //console.log ("Result Body:", result.body);

//             done()
//     })
// })

// it ("Should Fetch Particular Book only", (done)=>{
//     chai.request(server)
//         .get("/books/"+books[1].isbn)
//         .end((err, result)=>{
//             result.should.have.status(200)
//             console.log("Fetched Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)
//             done()
//         })
// })
// it ("should check data updated in DB", (done)=>{
//     chai.request(server)
//         .get("/books/"+books[1].isbn)
//         .end((err, result)=>{
//             result.should.have.status(200)
//             result.body.data.year.should.eq("2017")
//             console.log("Fetched Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)
//             done()
//         })
// })

// it ("Should Fetch Particular Book only", (done)=>{
//     chai.request(server)
//         .get("/books/"+books[1].isbn)
//         .end((err, result)=>{
//             result.should.have.status(200)
//             console.log("Fetched Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)
//             done()
//         })
// })
// it ("should check data updated in DB", (done)=>{
//     chai.request(server)
//         .get("/books/"+books[1].isbn)
//         .end((err, result)=>{
//             result.should.have.status(200)
//             result.body.data.year.should.eq("2017")
//             console.log("Fetched Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)
//             done()
//         })
// })
