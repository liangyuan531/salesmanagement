const config = {
    app: {
        port: process.env.PORT || 5000
    },
    db: {
        url: "mongodb+srv://admin:ezGqnXDQyIpPDrCq@cluster0-a0kj5.mongodb.net/management?retryWrites=true"
    }
}

module.exports = config;