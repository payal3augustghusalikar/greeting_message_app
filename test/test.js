var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
//let server1 = require("routes/greeting.rt.js");
let should = chai.should();
chai.use(chaiHttp);
//assertion style
chai.should();

//app.use(express.json());

const API = "http://localhost:2000";

describe("Greetings API", () => {
  /**
   * test the GET method
   */
  describe("GET /greetings", () => {
    it("should get all the greetings", (done) => {
      console.log("getting all data .");
      chai
        .request(API)
        .get("/greetings")
        // .send({})
        .end((err, res) => {
          // console.log (res)
          // console.log("err",err);
          res.should.have.status(200);
          // res.body.should.be.a("array");
          // res.body.length.should.be.eq(3);
          // // console.log("Response Body:", res.body);
          // // console.log (result);
          done();
        });
    });

    it("it should NOT GET all the greetings", (done) => {
      chai
        .request(API)
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
//  */
// describe("GET /greetings/:id", () => {
//   it("should get all the greetings", (done) => {
//     console.log("getting all data .");
//     chai
//       .request(API)
//       .get("/greetings")
//       // .send({})
//       .end((err, res) => {
//         // console.log (res)
//         // console.log("err",err);
//         res.should.have.status(200);
//         // res.body.should.be.a("array");
//         // res.body.length.should.be.eq(3);
//         // console.log("Response Body:", res.body);
//         // console.log (result);
//         done();
//       });
//   });

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

// describe ("CRUD OPERATIONS", function(){

//     var books = [{
//         "isbn": "121212",
//         "title": "World Is Best",
//         "author": "Larry",
//         "year": "2016"

//     }, {
//         "isbn": "121213",
//         "title": "Node JS",
//         "author": "John",
//         "year": "2016"

//     }]
//     it("Should add Books in DB", (done) => {
//         for (book in books) {
//             chai.request(server)
//                 .post("/books/")
//                 .send(books[book])
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     console.log("Response Body:", res.body);

//                 })
//         }
//         done()
//     })
// //...
// })

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
