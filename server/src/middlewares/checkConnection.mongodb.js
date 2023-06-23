const mongoose = require('mongoose');
const os = require('node:os');
const process = require('node:process');
const _SECOND = 5000;

const countConnection = () =>{
    const numConnection = mongoose.connections.length;
    return numConnection;
}

const checkOverLoad = () =>{
    setInterval(()=>{
        const numConnection = mongoose.connections.length;
        const numCore = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        // console.log(`memory Usage: ${memoryUsage/1024/1024} MB`);
        // console.log(`numConnection: ${numConnection}`);

        const maxConnection = numCore * 10;
        if(numConnection>maxConnection){
            console.log(`detected over load in db`);
            return false;
        }
        return true;

    },_SECOND)
}


module.exports = {countConnection, checkOverLoad};