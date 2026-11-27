import {
    add_task,
    get_task,
    update_task
} from '../controllers/task.controller.js';

const router = express.Router();

router.post('/tasks/add', add_task);
router.get('/tasks/get/:id', get_task);
router.put('/tasks/update/:id', update_task);
router.delete('/tasks/delete/:id', delete_task);

export default router;