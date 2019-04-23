const express = require('express');
const router = express.Router();

// Bazę danych można kontrolować przez stronę: https://cloud.mongodb.com/user#/atlas/login
// Username: kichel@tlen.pl
// Password: Cod4r$Camp
// Na tym koncie utworzony jest jedna baza danych (to-do-app), która posiada jednego użytkownika (dane niżej)

const dbUsername = 'user-piotr' // nazwa użytkownika bazy 
const dbPassword = 'mocnehaslo' // hasło użytkownika bazy
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@to-do-app-wyfbz.gcp.mongodb.net/test?retryWrites=true`;
const client = new MongoClient(uri, {
    useNewUrlParser: true
});

router.get('/', async (req, res) => {
    res.render(__dirname + '/../views/index');
});


const isValidLogAndPass = async(login, password) => {
    let db;
    try {
        await client.connect()
        db = client.db("to-do-app");

        const dbOutput = await db.collection("users").find({
            "login": login,
            "password": password
        }).toArray();

        if(dbOutput.length > 0)
            return true
        else
            return false
    } finally {
        client.close();
    }
}

// aktualnie dla celów testowych w bazie jest kolekcja (tabela) users,
// która ma jeden dokument (wiersz), który ma login "ala" i hasło "kot",
// dlatego poniższe wywołanie zwróci true, jeśli zmienimy któryś z argumentów, będzie false
isValidLogAndPass('ala', 'kot')
    .then((res) => console.log(res))


module.exports = router;