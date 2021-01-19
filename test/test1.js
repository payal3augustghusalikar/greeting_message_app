// var assert = require("assert");
// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../server.js");
// //let server1 = require("routes/greeting.rt.js");
// const should = chai.should;
// chai.use(chaiHttp);
// //assertion style
// chai.should();
// const greetings = require("../greetings.json");

// describe("Task APIs", () => {
//   describe("Test GET route /greetings", () => {
//     it("It should return all tasks", (done) => {
//       chai
//         .request(server)
//         .get("/greetings")
//         .end((err, response) => {
//           response.should.have.status(200);
//           response.body.should.be.a("array");
//           response.body.length.should.not.be.eq(0);
//           done();
//         });
//     });

//     it("It should NOT return all the tasks", (done) => {
//       chai
//         .request(server)
//         .get("/api/task")
//         .end((err, response) => {
//           response.should.have.status(404);
//           done();
//         });
//     });
//   });

//   /**
//    * Test the GET (by id) route
//    */
//   describe("GET /greetings/:greetingId", () => {
//     it("It should GET a task by ID", (done) => {
//       const greetingId = 1;
//       chai
//         .request(server)
//         .get("/greetings/" + greetingId)
//         .end((err, response) => {
//           response.should.have.status(200);
//           response.body.should.be.a("object");
//           response.body.should.have.property("id");
//           response.body.should.have.property("name");
//           response.body.should.have.property("message");
//           response.body.should.have.property("id").eq(1);
//           done();
//         });
//     });

//     it("It should NOT GET a task by ID", (done) => {
//       const greetingId = 123;
//       chai
//         .request(server)
//         .get("/greetings/" + greetingId)
//         .end((err, response) => {
//           response.should.have.status(404);
//           response.text.should.be.eq(
//             "The task with the provided ID does not exist."
//           );
//           done();
//         });
//     });
//   });

//   /**
//    * Test the POST route
//    */
//   describe("POST /greetings", () => {
//     it("It should POST a new task", (done) => {
//       const task = {
//         name: "Taskkk ",
//         message: "taskkk",
//       };
//       chai
//         .request(server)
//         .post("/greetings")
//         .send(task)
//         .end((err, response) => {
//           response.should.have.status(201);
//           response.body.should.be.a("object");
//           response.body.should.have.property("id").eq(4);
//           response.body.should.have.property("name").eq("Taskkk");
//           response.body.should.have.property("message").eq("taskkk");
//           done();
//         });
//     });

//     it("It should NOT POST a new task without the name property", (done) => {
//       const task = {
//         message: "taskkk",
//       };
//       chai
//         .request(server)
//         .post("/greetings")
//         .send(task)
//         .end((err, response) => {
//           response.should.have.status(400);
//           response.text.should.be.eq(
//             "The name should be at least 3 chars long!"
//           );
//           done();
//         });
//     });
//   });

//   /**
//    * Test the PUT route
//    */
//   describe("PUT /greetings/:greetingId", () => {
//     it("It should PUT an existing task", (done) => {
//       const greetingId = 1;
//       const task = {
//         name: "Taskchanged",
//         message: "true",
//       };
//       chai
//         .request(server)
//         .put("/greetings/" + greetingId)
//         .send(task)
//         .end((err, response) => {
//           response.should.have.status(200);
//           response.body.should.be.a("object");
//           response.body.should.have.property("id").eq(1);
//           response.body.should.have.property("name").eq("Taskchanged");
//           response.body.should.have.property("message").eq("true");
//           done();
//         });
//     });

//     it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
//       const greetingId = 1;
//       const task = {
//         name: "Ta",
//         message: "true",
//       };
//       chai
//         .request(server)
//         .put("/greetings/" + greetingId)
//         .send(task)
//         .end((err, response) => {
//           response.should.have.status(400);
//           response.text.should.be.eq(
//             "The name should be at least 3 chars long!"
//           );
//           done();
//         });
//     });
//   });

//   /**
//    * Test the PATCH route
//    */

//   // describe("PATCH /greetings/:greetingId", () => {
//   //     it("It should PATCH an existing task", (done) => {
//   //         const greetingId = 1;
//   //         const task = {
//   //             name: "Taskpatch"
//   //         };
//   //         chai.request(server)
//   //             .patch("/greetings/" + greetingId)
//   //             .send(task)
//   //             .end((err, response) => {
//   //                 response.should.have.status(200);
//   //                 response.body.should.be.a('object');
//   //                 response.body.should.have.property('id').eq(1);
//   //                 response.body.should.have.property('name').eq("Task 1 patch");
//   //                 response.body.should.have.property('message').eq(true);
//   //             done();
//   //             });
//   //     });

//   //     it("It should NOT PATCH an existing task with a name with less than 3 characters", (done) => {
//   //         const greetingId = 1;
//   //         const task = {
//   //             name: "Ta"
//   //         };
//   //         chai.request(server)
//   //             .patch("/greetings/" + greetingId)
//   //             .send(task)
//   //             .end((err, response) => {
//   //                 response.should.have.status(400);
//   //                 response.text.should.be.eq("The name should be at least 3 chars long!");
//   //             done();
//   //             });
//   //     });
//   // });

//   /**
//    * Test the DELETE route
//    */
//   describe("DELETE /greetings/:greetingId", () => {
//     it("It should DELETE an existing task", (done) => {
//       const greetingId = 1;
//       chai
//         .request(server)
//         .delete("/greetings/" + greetingId)
//         .end((err, response) => {
//           response.should.have.status(200);
//           done();
//         });
//     });

//     it("It should NOT DELETE a task that is not in the database", (done) => {
//       const greetingId = 145;
//       chai
//         .request(server)
//         .delete("/greetings/" + greetingId)
//         .end((err, response) => {
//           response.should.have.status(404);
//           response.text.should.be.eq(
//             "The task with the provided ID does not exist."
//           );
//           done();
//         });
//     });
//   });
// });
