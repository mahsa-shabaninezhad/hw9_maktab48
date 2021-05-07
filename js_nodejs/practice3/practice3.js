const fs = require('fs')

fs.readFile('./names.txt','utf8',(err, data)=>{
    if (err) {
        console.log(err);
        return
    }
    let names = data.split('\n')
    let namesObj = {}
    names.forEach(name =>{
        name = name.split('-')
        namesObj = {...namesObj,[name[0]]:name[1]}
    })
    
    fs.readFile('./phones.txt', 'utf8', (err, data)=>{
        if (err) {
            console.log(err);
            return
        }
        let phones = data.split('\n')
        phones = phones.map(phone =>{
            phone = phone.split('-')
            return{
                [phone[0]]:phone[1]
            }
        })
        
        ids = Object.keys(namesObj)
        finalObj = {}
        for (const id of ids) {
            finalObj = {...finalObj,[id]:[namesObj[id]]}
            phones.forEach(phone =>{
                if (phone[id]) {
                    finalObj[id].push(phone[id])
                }
            })
        }
        
        let str = ''
        for (const id in finalObj) {
            if(finalObj[id].length === 1){
                str += `${finalObj[id][0]} hasn't any number.\n`
            }else if(finalObj[id].length >= 3){
                str += `${finalObj[id][0]}'s phone numbers are ${finalObj[id].splice(1)}.\n`
            }else{
                str += `${finalObj[id][0]}'s phone number is ${finalObj[id][1]}.\n`
            }
        }
        
        fs.writeFile('final.txt', str, err => {
            if (err) {
                console.log(err);
                return
            }
        })
    })
})