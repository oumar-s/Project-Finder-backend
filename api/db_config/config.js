module.exports = {
    development: {
        username: "pf_user",
        password: "pf_password",
        database: "pf_dev",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    test: {
        username: "pf_user",
        password: "pf_password",
        database: "pf_db_test",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        dialectOptions: {
            "ssl": {
                "rejectUnauthorized": false
            }
        }
    }
}