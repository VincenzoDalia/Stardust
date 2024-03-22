exports.config = {
    connectionLimit: 10,
    host: 'eu-cdbr-west-01.cleardb.com',
    // Non usiamo *** mai *** root senza password
    user: 'b5a32478c5a082',
    password: '891a217c',
    database: 'heroku_b9355a20414c5bb',
    multipleStatements: true // consente query multiple in un'unica istruzione SQL
}

