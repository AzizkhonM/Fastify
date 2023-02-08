const fs = require('fs')

const read_file = (file_name) =>{
    return JSON.parse(fs.readFileSync(`./src/model/${file_name}`, 'utf8'))
}



const write_file = (file_name, data) => {
    return fs.writeFileSync(`./src/model/${file_name}`, JSON.stringify(data, null, 4));
} 



module.exports = {
    read_file,
    write_file
}