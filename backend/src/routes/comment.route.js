import { Router } from "express";
import verifyJwt from "../middlewares/auth.middlewae.js";
import { commentValidator } from "../middlewares/validator.middleware.js";
import validateRequest from "../middlewares/validate.req.js";
import CommentController from "../controllers/comment.controller.js";
const router = Router();

router.post(
  "/create",
  commentValidator,
  validateRequest,
  verifyJwt,
  CommentController.createComment,
);

router.route("/edit/:commentId").put(
    commentValidator,
    validateRequest,
    verifyJwt,
    CommentController.editComment
)
router.route("/delete/:commentId").delete(
    verifyJwt,
    CommentController.deleteComment
)
    
export default router;
