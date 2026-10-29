const { body } = require('express-validator');

exports.createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title max 100 chars'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description max 500 chars'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
];

exports.updateTaskValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title max 100 chars'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description max 500 chars'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
];