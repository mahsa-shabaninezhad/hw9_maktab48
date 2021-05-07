const fs = require('fs')
//-------------------CREATING FILE-------------------------------
fs.appendFile('./test.txt','Creating file.', (err) => {
    if (err) {
        console.error(err)
        return
    }    
    console.log('file created successfully');
})

//-------------------READING FILE-------------------------------

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return
    }
    console.log('Reading File:', data);
})
//-------------------UPDATING FILE-------------------------------

fs.writeFile('./test.txt', 'Updating File', (err) => {
    if(err){
        console.log(err);
        return
    }
    console.log('file updated');
})
//-------------------RENAMING FILE-------------------------------

fs.rename('test.txt', 'newTest.txt', (err) => {
    if(err){
        console.log(err);
        return
    }
    console.log('file renamed');
})

//-------------------DELETING FILE-------------------------------

fs.unlink('./newTest.txt', (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('file deleted');
})
