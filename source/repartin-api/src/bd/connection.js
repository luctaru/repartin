const mongoose = require('mongoose')
const uri = ''


function connectionOpen() {
    mongoose.connect(uri, { useNewUrlParser: true });
}
function connectionClose(){
    mongoose.connection.close()
}

module.exports = {
    connectionOpen,
    connectionClose
}
