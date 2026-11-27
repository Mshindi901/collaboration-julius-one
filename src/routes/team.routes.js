import {
    add_team,
    add_team_member,
    get_team,
    update_team,
    delete_team
} from '../controllers/team.controller.js';

const router = express.Router();

router.post('/teams/add', add_team);
router.post('/teams/add-member', add_team_member);
router.get('/teams/get/:id', get_team);
router.put('/teams/update/:id', update_team);
router.delete('/teams/delete/:id', delete_team);

export default router;