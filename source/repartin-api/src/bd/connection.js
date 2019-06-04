const mongoose = require('mongoose')
const uri = 'mongodb://usuario:teste123@ds113522.mlab.com:13522/testemanutencao'


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
