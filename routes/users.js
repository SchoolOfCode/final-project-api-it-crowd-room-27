import express from "express";

//import cloudinary.uploader from cloudinary import and config
import { uploader } from "../config.js";

//import models
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	updateIsActiveStatus,
} from "../models/users.js";

//create instance of usersRouter
const usersRouter = express.Router();

// GET request to /users -> get all users
// GET request /users/:id -> get specific user
// POST request /users -> create new user
// PUT request /users/:id -> update user
// DELETE request /users/:id -> delete user

/* GET all users */
usersRouter.get("/", async (req, res) => {
	// res.send("get all users");

	const users = await getAllUsers();
	console.log(users);
	res.json({
		message: `all users`,
		success: true,
		payload: users,
	});
});

/* GET specific user by ID */
usersRouter.get("/:id", async (req, res) => {
	// res.send("get user by id");

	const id = Number(req.params.id);
	const requestedUser = await getUserById(id);

	res.json({
		message: `found user with id ${id}`,
		success: true,
		payload: requestedUser,
	});
});

// /* GET specific user by EMAIL */
// getting user by email, *unfinished logic*
// router.get("/auth/:email", async (req, res) => {
//   res.send("get user by email");

// const email = req.params.email;
// const requestedUser = await getUserByEmail(email);

// res.json({
//   message: `found user with email ${email}`,
//   success: true,
//   payload: requestedUser,
// });
// });

/* CREATE new user */
usersRouter.post("/", async (req, res) => {
	//extract the data from the register user form on client , sent via req.body
	try {
		const {
			first_name,
			last_name,
			email,
			address,
			image,
			is_active,
			user_bio,
		} = req.body;
		console.log(req.body);
	} catch (error) {
		console.log(error);
	}

	//some variables are unavailable unless scoped outside the try block
	let result;

	try {
		//cloudinary uploader passed image which is a base 64 encoded image
		result = await uploader.upload(image);
	} catch (error) {
		//if this fails, let the client know
		console.log("upload failed", error);
		//bad practice to return like this but ok for development
		return;
	}
	//cloudinary returned us an object which we saved as const result
	//we store the image url property as avatar
	//we store the public_id of that image as unique cloudinary_id
	const avatar = result.secure_url;
	const cloudinary_id = result.public_id;

	//insert these values into the users table
	let newUser;
	try {
		newUser = await createUser(
			first_name,
			last_name,
			email,
			address,
			is_active,
			cloudinary_id,
			avatar,
			user_bio
		);
	} catch (error) {
		console.log("create newUser failed", error);
		return;
	}

	res.json({
		message: `user created successfully`,
		success: true,
		payload: newUser,
	});
});

/* DELETE specific user */
usersRouter.delete("/:id", async (req, res) => {
	const id = Number(req.params.id);
	const deletedUser = await deleteUser(id);
	//also delete cloudinary id of the user we want to delete
	const user = await getUserById(id);
	await uploader.destroy(user.cloudinary_id);

	res.json({
		message: `user successfully deleted`,
		success: true,
		payload: deletedUser,
	});
});

/* UPDATE specific user */
usersRouter.put("/:id", async (req, res) => {
	// res.send("user details updated successfully");

	const id = Number(req.params.id);
	const {
		first_name,
		last_name,
		email,
		address,
		is_active,
		cloudinary_id,
		user_bio,
	} = req.body;

	const updatedUser = await updateUser(
		id,
		first_name,
		last_name,
		email,
		address,
		is_active,
		cloudinary_id,
		user_bio
	);

	res.json({
		message: `user details updated successfully`,
		success: true,
		payload: updatedUser,
	});
});

usersRouter.patch("/:id", async (req, res) => {
	//   res.send("item reserve status updated successfully");

	const id = Number(req.params.id);
	const { is_active } = req.body;

	const userActiveStatus = await updateIsActiveStatus(id, is_active);

	res.json({
		message: `user active status updated successfully`,
		success: true,
		payload: userActiveStatus,
	});
});

// =-=-=-=-=-=-=-=-=-=-=

// usersRouter.get("/listings", async (req, res) => {
//   //   res.send("item reserve status updated successfully");

//   const getAllListings = await getListings();

//   res.json({
//     message: `all users and items fetched successfully`,
//     success: true,
//     payload: getAllListings,
//   });
// });

export default usersRouter;
