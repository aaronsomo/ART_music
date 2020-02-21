const router = require('express').Router();
const controller = require('./controller.js');

// USERS
router
  .route('/users')
  .post(controller.insertUser)

router
  .route('/users/:uid')
  .get(controller.getUser)
  // .delete(controller.deleteUser)
  .put(controller.updateUser)
  // .get(controller.getUser)
  // .put(controller.insertupdateUser)

// GROUPS
router
  .route('/groups')
  .post(controller.insertGroup)
  
router
  .route('/groups/:id')
  .delete(controller.deleteGroup)
  .put(controller.updateGroup)
  // .get(controller.getGroup)
  // .put(controller.insertupdateGroup)

module.exports = router;