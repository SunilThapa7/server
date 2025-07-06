import { Router } from 'express';
import { executeQuery, setReturn } from '../helper/helper.js';

const router = Router();

//#region Swagger Doccumentation initialization
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to user management
 */
//#endregion

//#region Swagger Doccumentation and API for signUp
/**
 * @swagger
 * /authUser/signUp:
 *   post:
 *     summary: Signup a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [name, role, email, password, gender]
 *             properties:
 *               name: { type: string }
 *               role: { type: string }
 *               email: { type: string }
 *               password: { type: string, format: password }
 *               gender: { type: string }
 *     responses:
 *       200:
 *         description: User created
 */
router.post('/signUp', async (req, res) => {
    let userData = req.body;
    const { name, role, email, password, gender } = userData;
    let result;
    try {
        if (!name || !role || !email || !gender) return res.status(400).json({ message: 'Invalid user data' });
        const queryToFindUser = 'SELECT * FROM users WHERE email = ?;';
        result = await executeQuery(queryToFindUser, [email]);
        if (result.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists!' });
        }
        const queryToCreateUser = 'INSERT INTO users(name, role, email, password, gender) VALUES (?, ?, ?, ?, ?); SELECT id, name, role, email, gender FROM users where id = LAST_INSERT_ID();';
        userData = [name, role, email, password, gender];
        result = await executeQuery(queryToCreateUser, userData);

        return setReturn([req, res], result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
//#endregion

//#region Swagger Doccumentation and API for login
/**
 * @swagger
 * /authUser/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT id, email, password, role, name FROM users WHERE email = ?;';
        const result = await executeQuery(query, [email]);

        if (result.length > 0) {
            if (result[0].password === password) {
                return res.status(200).json({
                    user: {
                        id: result[0].id,
                        name: result[0].name,
                        email: result[0].email,
                        role: result[0].role,
                    }
                });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ message: 'User with this email not found!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
//#endregion

//#region Swagger Doccumentation and API for getUser
/**
 * @swagger
 * /authUser/getUser:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *              
 */
router.get('/getUser', async (req, res) => {
    try {
        const query = 'SELECT * FROM users;';
        const result = await executeQuery(query, []);
        return setReturn([req, res], result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
//#endregion

//#region

/**
 * @swagger
 * /authUser/updateUser:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, name, role, email, gender]
 *             properties:
 *               id: 
 *                 type: integer
 *               name: 
 *                 type: string
 *               role: 
 *                 type: string
 *               email: 
 *                 type: string
 *               gender: 
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */

router.patch('/updateUser', async (req, res) => {
    const userData = req.body;
    const { id, name, role, email, gender } = userData;
    let result;
    try {
        if (id <= 0 || !id || !name || !role || !email || !gender) return res.status(400).json({ message: 'Invalid user data' });
        const queryToCheckUserId = 'SELECT * FROM users WHERE id = ?;';
        result = await executeQuery(queryToCheckUserId, [id]);
        if (result.length === 0) return res.status(404).json({ message: 'User not found' });

        const queryToFindUser = 'SELECT * FROM users WHERE email = ? AND id <> ?;';
        result = await executeQuery(queryToFindUser, [email, id]);
        if (result.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists!' });
        }

        const queryToUpdateUser = 'UPDATE users SET name = ?, role = ?, email = ?,gender = ? WHERE id = ?;';
        const userData = [name, role, email, gender, id];
        result = await executeQuery(queryToUpdateUser, userData);
        return setReturn([req, res], result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

//#endregion
//#region Swagger Documentation and API for deleteUser
/**
 * @swagger
 * /authUser/deleteUser:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid user ID
 */
router.delete('/deleteUser', async (req, res) => {
    const userId = parseInt(req.query.id);

    if (!userId || userId <= 0) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const checkQuery = 'SELECT * FROM users WHERE id = ?;';
        const checkResult = await executeQuery(checkQuery, [userId]);

        if (checkResult.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deleteQuery = 'DELETE FROM users WHERE id = ?;';
        const deleteResult = await executeQuery(deleteQuery, [userId]);

        return res.status(200).json({ message: 'User deleted successfully', affectedRows: deleteResult.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
//#endregion

/**
 * @swagger
 * /authUser/profile:
 *   get:
 *     summary: Get a single user's profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User profile
 *       404:
 *         description: User not found
 */
router.get('/profile', async (req, res) => {
    const userId = parseInt(req.query.id);
    if (!userId || userId <= 0) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const query = 'SELECT id, name, email, gender, role FROM users WHERE id = ?;';
        const result = await executeQuery(query, [userId]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export const authUserManagement = router;
