const mysql = require('mysql2');

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'siddha'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Controller function to get remedies by symptom
exports.getRemediesBySymptom = (req, res) => {
  const symptom = req.params.symptom;
  connection.query(
    'SELECT remedy_name, herb_names, preparation, dosage, precautions FROM siddha_remedies WHERE symptom = ?',
    [symptom],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Remedy not found' });
      res.status(200).json(results);
    }
  );
};