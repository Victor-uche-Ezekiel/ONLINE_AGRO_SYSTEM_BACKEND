const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
  updateRole,
  deleteCurrentUser,
  deleteUser,
} = require("../controllers");
const {
  authenticateUser,
  authorizePermissions,
  authorizeRolePermission,
} = require("../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/deleteCurrentUser").delete(authenticateUser, deleteCurrentUser);

router
  .route("/updateRole")
  .patch(
    authenticateUser,
    authorizeRolePermission("victor@gmail.com"),
    updateRole
  );

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getSingleUser);

router
  .route("/deleteUser/:id")
  .delete(
    authenticateUser,
    authorizeRolePermission("victor@gmail.com"),
    deleteUser
  );

module.exports = router;
