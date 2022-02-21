import express from "express";
// import { getAllUsers } from "../models/users.js";

const router = express.Router();

// GET request /items -> get all items
// GET request /items/:id -> get specific item
// POST request /items -> create an item
// PUT request /items/:id -> update an item
// DELETE request /items/:id -> delete item

/* GET all items */
router.get("/", async (req, res) => {
  res.send("get all items");

  // const items = await getAllItems();

  // res.json({
  //   message: `all items`,
  //   success: true,
  //   payload: items,
  // });
});

/* GET specific item */
router.get("/:id", async (req, res) => {
  res.send("get specific item");

  // const id = Number(req.params.id);
  // const requestedItem = await getItemById(id);

  // res.json({
  //   message: `found item with id ${id}`,
  //   success: true,
  //   payload: requestedItem,
  // });
});

/* CREATE an item */
router.post("/", async (req, res) => {
  res.send("item created successfully");

  //   const {
  //     userId,
  //     category,
  //     itemName,
  //     itemDescription,
  //     useByDate,
  //     dateAdded,
  //     quantity,
  //     cloudinary_id,
  //     isReserved,
  //     availability,
  //     timeslot,
  //   } = req.body;

  //   const newItem = await createAGiveAwayItem(
  //     userId,
  //     category,
  //     itemName,
  //     itemDescription,
  //     useByDate,
  //     dateAdded,
  //     quantity,
  //     cloudinary_id,
  //     isReserved,
  //     availability,
  //     timeslot
  //   );

  //   res.json({
  //     message: `item created successfully`,
  //     success: true,
  //     payload: newItem,
  //   });
});

/* DELETE specific item */
router.delete("/:id", async (req, res) => {
  res.send("item deleted successfully");

  // const id = Number(req.params.id);
  // const deletedItem = await deleteAGiveAwayItem(id);

  // res.json({
  //   message: `item deleted successfully`,
  //   success: true,
  //   payload: deletedItem,
  // });
});

/* UPDATE specific item */
router.put("/:id", async (req, res) => {
  res.send("item details updated successfully");
  const paramsId = Number(req.params.id);
  const {
    paramsId,
    itemId,
    userId,
    category,
    itemName,
    itemDescription,
    useByDate,
    dateAdded,
    quantity,
    cloudinary_id,
    isReserved,
    availability,
    timeslot,
  } = req.body;

  const updatedItem = await updateAGiveAwayItem(
    paramsId,
    itemId,
    userId,
    category,
    itemName,
    itemDescription,
    useByDate,
    dateAdded,
    quantity,
    cloudinary_id,
    isReserved,
    availability,
    timeslot
  );

  res.json({
    message: `item details updated successfully`,
    success: true,
    payload: updatedItem,
  });
});

export default router;
