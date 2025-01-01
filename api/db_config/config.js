module.exports = {
    development: {
        username: "pf_user",
        password: "pf_password",
        database: "pf_dev",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    test: {
        username: "",
        password: "",
        database: "",
        host: "",
        port: "",
        dialect: "",
        dialectOptions: {
            options: {
                encrypt: true
            }
        }
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