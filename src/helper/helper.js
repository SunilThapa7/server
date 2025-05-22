import connection from '../../config/dbConfig.js';

export async function executeQuery(query, values) {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(query, values, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });

        return result;
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export async function setReturn(response, result) {
    const [req, res] = response;
    try {
        switch (req.method) {
            case 'GET':
                if (result.length > 0) return res.status(200).json(result);
                else return res.status(404).json({ message: 'No users found' });
            case 'POST':
                if (result[0].affectedRows > 0) return res.status(200).json(result[1][0]);
                else return res.status(404).json({ message: 'Error: User Not Created.' });
            case 'PUT':
                if (result.affectedRows > 0) return res.status(200).json({ affectedRows: result.affectedRows });
                else return res.status(404).json({ message: 'Error: User Not Update.' });
            case 'PATCH':
                if (result.affectedRows > 0) return res.status(200).json({ affectedRows: result.affectedRows });
                else return res.status(404).json({ message: 'Error: User Not Update.' });
            case 'DELETE':
                if (result.affectedRows > 0) return res.status(200).json({ affectedRows: result.affectedRows });
                else return res.status(404).json({ message: 'Error: User Not Deleted.' });
            default:
                if (result.length > 0) return res.status(200).json(result);
                else return res.status(404).json({ message: 'Internal Server error' });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}