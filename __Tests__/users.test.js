import request from "supertest";
import app from "../app.js";
import { uploader } from "../config.js";
import { jest } from "@jest/globals";
import fs from "fs";
import { users } from "../libs/dummyData.js";

//import { dummyData } from "../libs/dummyData.js";

// GET test to /api/users
describe("GET /api/users", function () {
  test("it should give us back 200 SUCCESS", async function () {
    const actual = await request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200);

    //  expect(actual.status).toEqual(200);
  });

  test("it should give us back an object", async function () {
    const actual = await request(app).get("/api/users");
    expect(actual.body).toBeInstanceOf(Object);
  });
});

// GET test to /api/users/:id
describe("Get /api/users/:id", function () {
  let id = 1;
  test("it should give us back 200 SUCCESS", async function () {
    const actual = await request(app)
      .get(`/api/users/${id}`)
      .expect("Content-Type", /json/)
      .expect(200);

    //  expect(actual.status).toEqual(200);
  });
});

// const getAllUsers = jest.fn();

// // implementing mock for GET to /api/users
// describe("GET /api/users", function () {
//   test("gives us back all users", () => {
//    //  const spy = jest.spyOn(users, "getAllUsers");
//    //  const getUsers = users.getAll();

// await request(app).get("/api/users")
//     expect(spy).toHaveBeenCalled();
//     expect(getUsers).toBe(true);
//     spy.mockRestore();

//     //get all users
//   });
// });

// implementing mock for POST to /api/users
describe("Post /api/users", function () {
  const response = { json: jest.fn((x) => x) };

  test("it should give us back 201 CREATED", async function () {
    // create a mock upload function for cloudinary
    const mockUploader = jest.spyOn(uploader, "upload");

    // create a mock function for creating user
    const createUser = jest.fn();

    // using dummy image to pass through to upload()
    //  const image = fs.readFileSync("./avatar.jpeg").toString("base64");

    // using cloudinary upload(image)

    let secure_url;
    let public_id;

    const result = await uploader.upload.mockImplementationOnce(() => ({
      secure_url:
        "https://res.cloudinary.com/dzektczea/image/upload/v1646091226/fgubsl1bw8dekqo94mix.jpg",
      public_id: "xnefc68tvb0wu94ewyls",
    }));

    const avatar = secure_url;
    const cloudinary_id = public_id;

    createUser.mockImplementationOnce(() => ({
      id: 7,
      first_name: "Dmitriy",
      last_name: "Yegorov",
      email: "yegorovd14@gmail.com",
      address: "SW",
      is_active: true,
      cloudinary_id: "xnefc68tvb0wu94ewyls",
      avatar:
        "https://res.cloudinary.com/dzektczea/image/upload/v1646091225/xnefc68tvb0wu94ewyls.jpg",
      user_bio: "",
    }));

    createUser.mockReset();

    const actual = await request(app)
      .post("/api/users")
      .expect("Content-Type", /json/)
      .expect(200);

    //  const actual = await request(app).post("/api/users").send({
    //    first_name: "Graham",
    //    last_name: "Delbeck",
    //    email: "graham.delbeck@gmail.com",
    //    address: "Main Street, LA22 9BU, Ambleside, United Kingdom",
    //    //   image: `${image}`,
    //    is_active: true,
    //    cloudinary_id: cloudinary_id,
    //    avatar: avatar,
    //    user_bio: "hello I'm another Graham",
    //  });

    //  expect(actual).;

    //     // test("It should expect a json and a success create status code of 201")
    //     // .expect("Content-Type", /json/)
    //     // .expect(201);

    //     // test("it should upload image successfully to cloudinary")
    //     // test("it should create new user")
    //     // test("It should respond with an object containing; message, success and payload ")

    //     expect(actual.status).toEqual(201);
  });
});
