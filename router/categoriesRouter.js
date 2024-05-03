import express from 'express';
import { categoriesController } from '../controller/index.js';
import authentication from '../middleware/auth.js';
import { validationMiddleware } from '../middleware/serverValidation.js';
import { categorySchemas } from '../middleware/schemas.js';

const router = express.Router();

router.post(
  '/create',
  validationMiddleware(categorySchemas.body.ValidCreateCategory, 'body'),
  authentication,
  categoriesController.newCategories
);

router.get('/list', categoriesController.listAllCategorie);

router.put(
  '/update/:id',
  validationMiddleware(categorySchemas.body.ValidUpdateCategory, 'body'),
  validationMiddleware(categorySchemas.params.ValidCategoryId, 'params'),
  authentication,
  categoriesController.updateCategorie
);

router.delete(
  '/delete/:id',
  validationMiddleware(categorySchemas.params.ValidCategoryId, 'params'),
  authentication,
  categoriesController.deleteCategorie
);

router.get(
  '/findOneCategorie/:id',
  validationMiddleware(categorySchemas.params.ValidCategoryId, 'params'),
  authentication,
  categoriesController.findOneCategorie
);

export default router;