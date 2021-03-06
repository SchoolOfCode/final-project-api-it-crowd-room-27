import query from "../db/connection.js";

// -=-=-=-=-=-=-=-=-=-=-=-=- USERS MODELS -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// fetch all USERS from a user's table
export async function getAllUsers() {
  const data = await query(`SELECT * FROM users;`);
//   console.log(data);
  return data.rows;
}

// fetch the USER by ID from an users table
export async function getUserById(id) {
  const data = await query(`SELECT * FROM users WHERE id=$1;`, [id]);
  return data.rows;
}

// fetch the USER by EMAIL from an users table ***
// export async function getUserByEmail( email ) {
// 	const data = await query(`SELECT * FROM users WHERE email=$1;`, [ email ]);
// 	return data.rows;
// }

// create a new USER registration in an users table
export async function createUser(


	full_name,
	email,
	address,
	is_active,
	cloudinary_id,
	avatar,
	user_bio
) {
	const data = await query(
		`INSERT INTO users ( full_name, email, address, is_active, cloudinary_id, avatar, user_bio ) VALUES ( $1, $2, $3, $4, $5, $6, $7)  RETURNING *;`,
		[full_name, email, address, is_active, cloudinary_id, avatar, user_bio]
	);
	return data.rows;

}

// update an existing USER registration parameters in an users table
export async function updateUser(

	id,
	full_name,
	email,
	address,
	is_active,
	cloudinary_id,
	avatar,
	user_bio
) {
	const data = await query(
		`UPDATE users SET full_name=$2, email=$3, address=$4, is_active=$5, cloudinary_id=$6, avatar=$7, user_bio=$8 WHERE id=$1 RETURNING *;`,
		[id, full_name, email, address, is_active, cloudinary_id, avatar, user_bio]
	);
	return data.rows;

}

// delete an existing USER registration in an users table
export async function deleteUser(id) {
  const data = await query(`DELETE FROM users WHERE id=$1;`, [id]);
  return data.rows;
}

// update an isActive parameter with an existing USER registration in an users table
export async function updateIsActiveStatus(id, is_active) {
  // const selectedUser = await getUserById(id);
  // const currentStatus = selectedUser[0].isActive;
  // const isComplete = changeIsCompleteStatus(currentStatus);
  const data = await query(
    `UPDATE users SET is_active = $2 WHERE id = $1 RETURNING *;`,
    [id, is_active]
  );
  return data.rows;
}

// fetch JOINED data of USERS and ITEMS on ID
export async function getListings() {
  const data = await query(
    `SELECT *
FROM
	users
INNER JOIN items 
    ON users.id = items.user_id;`
  );

  return data.rows;
}

// `SELECT
//     users.id,
//     first_name,
//     last_name,
//     address,
//     is_active,
//     cloudinary_id,
//     avatar,
//     items.user_id,
//     category,
//     item_name,
//     item_description,
//     use_by_date,
//     date_added,
//     quantity,
//     cloudinary_id,
//     item_image,
//     is_reserved,
//     availability,
//     time_slot
// FROM
// 	users
// INNER JOIN items
//     ON users.id = items.user_id;`);

// -=-=-=-=-=-=-=-=-=-=-=-=- ITEMS MODELS -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//fetch all ITEMS from a items table
export async function getAllItems() {
  const data = await query(`SELECT * FROM items;`);
  return data.rows;
}

// fetch the ITEM by ID from items table
export async function getItemById(id) {

	const data = await query(`SELECT * FROM items WHERE item_id=$1;`, [id]);
	return data.rows;

}

// fetch all ITEMS from a particular USER from an user table
export async function getAllItemsParticularUser(id) {
  const data = await query(`SELECT * FROM items WHERE user_id=$1;`, [id]);
  return data.rows;
}

// create a new ITEM registration in an items table
export async function createAGiveAwayItem(
  user_id,
  category,
  item_name,
  item_description,
  use_by_date,
  date_added,
  quantity,
  cloudinary_id,
  item_image,
  is_reserved,
  availability,
  time_slot
) {

	const data = await query(
		`INSERT INTO items ( user_id, category, item_name, item_description, use_by_date, date_added, quantity, cloudinary_id, item_image, is_reserved, availability, time_slot ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )  RETURNING *;`,
		[
			user_id,
			category,
			item_name,
			item_description,
			use_by_date,
			date_added,
			quantity,
			cloudinary_id,
			item_image,
			is_reserved,
			availability,
			time_slot,
		]
	);
	return data.rows;

}

// update an existing ITEM registration parameters in an items table
export async function updateAGiveAwayItem(
  item_id,
  user_id,
  category,
  item_name,
  item_description,
  use_by_date,
  date_added,
  quantity,
  cloudinary_id,
  item_image,
  is_reserved,
  availability,
  time_slot
) {
  const data = await query(
    `UPDATE items SET user_id=$2, category=$3, item_name=$4, item_description=$5, use_by_date=$6, date_added=$7, quantity=$8, cloudinary_id=$9, item_image=$10, is_reserved=$11, availability=$12, time_slot=$13 WHERE item_id=$1 RETURNING *;`,
    [
      item_id,
      user_id,
      category,
      item_name,
      item_description,
      use_by_date,
      date_added,
      quantity,
      cloudinary_id,
      item_image,
      is_reserved,
      availability,
      time_slot,
    ]
  );
  return data.rows;
}

// delete an existing ITEM registration in an items table
export async function deleteAGiveAwayItem(id) {
  const data = await query(`DELETE FROM items WHERE item_id=$1;`, [id]);
  return data.rows;
}

// delete all ITEMS registrations in an items table belongs to particular USER
export async function deleteAllItemsOfParticularUser(id) {
  const data = await query(`DELETE FROM items WHERE user_id=$1 RETURNING *;`, [id]);
  return data.rows;
}

// update an isReserved parameter with an existing ITEM registration in an items table
export async function updateIsReservedStatus(id, is_reserved) {
  // const selectedItem = await getItemById(id);
  // const currentStatus = selectedUser[0].isReserved;
  // const isReserved = changeIsReservedStatus(currentStatus);
  const data = await query(
    `UPDATE items SET is_reserved = $2 WHERE item_id = $1 RETURNING *;`,
    [id, is_reserved]
  );
  return data.rows;
}
