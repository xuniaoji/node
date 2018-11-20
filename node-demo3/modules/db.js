const mongoClient = require('mongodb').MongoClient
const monogoUrl = ' mongodb://127.0.0.1:27017'
const dbName = 'admin'

function connectDb(callback) {
    mongoClient.connect(monogoUrl, (error, client) => {
        if (error) {
            console.log('数据库连接失败');
        }
        callback(client)
    })
}

// Db.find('user',{},(errmdata)=>{})
exports.find = (collection, searchParam, callback) => {
    connectDb(db => {

    })
}