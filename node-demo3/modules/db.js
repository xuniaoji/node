const mongoClient = require('mongodb').MongoClient
const monogoUrl = ' mongodb://127.0.0.1:27017'
const dbName = 'admin'

function connectDb(callbackBig) {
    mongoClient.connect(monogoUrl, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            console.log('数据库连接失败');
        }
        callbackBig(client)
        client.close()
    })
}

// Db.find('user',{},(errmdata)=>{})
exports.find = (collection, searchParam, callback) => {
    connectDb(client => {
        const db = client.db('admin')
        db.collection(collection).find(searchParam).toArray((error, results) => {
            if (error) {
                console.log(err);
                return
            }
            callback(results)
        })
    })
}

exports.insert = (collection, insertParam, callback) => {
    connectDb(client => {
        const db = client.db('admin')
        db.collection(collection).insertOne(insertParam, (error, results) => {
            if (error) {
                console.log(err);
                return
            }
            callback(results)
        })
    })
}