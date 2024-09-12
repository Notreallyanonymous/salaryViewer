const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors())
app.use(express.static('public'));


var con = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "Javascript1997!", 
    database: "encrypted_data"
})

async function obtainData(){
return new Promise((resolve, reject) =>{
    con.connect(function(err) {
        if(err) return reject(err)

    con.query("SELECT  NOMBRE, AVG(SALARIO) AS SALARY FROM encrypted_total WHERE SALARIO > 10000 GROUP BY NOMBRE LIMIT 20", 
        function (err, result, fields) {
      if (err) return reject(err);
      resolve(result)
        });
    });
  });
}




app.get('/api/data', async (req, res) => {
    try {
        const data = await obtainData();
       // const uniqueNames = [...new Set(data.map(item => item.NOMBRE))];
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});