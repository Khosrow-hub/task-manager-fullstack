const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  createTaskValidator,
  updateTaskValidator,
} = require('../validators/taskValidator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// All task routes are protected
router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(createTaskValidator, validate, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTaskValidator, validate, updateTask)
  .delete(deleteTask);

module.exports = router;