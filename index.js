
const fs=require('fs');

if(process.argv[2]=="add")
{
    let data=JSON.parse(fs.readFileSync("new.txt",'utf-8'))
    let student = {id:data.length+1,name:process.argv[3],grade:process.argv[4]}
    data.push(student);
    fs.writeFileSync("new.txt",JSON.stringify(data));
    console.log(data)   
}

else if(process.argv[2]=="list")
{
    let data=JSON.parse(fs.readFileSync("new.txt",'utf-8'))
    console.log(data)
    data.forEach(element => {
        console.log(element['id']);
        console.log(element['name']);
        console.log(element['grade']);
        console.log('\n');
    });
}

else if(process.argv[2]=="edit")
{
    let data=JSON.parse(fs.readFileSync("new.txt",'utf-8'))

    data.forEach(student => {
        if(student.id == parseInt(process.argv[4])){
            student.grade = process.argv[3]
        }
    });
    fs.writeFileSync("new.txt",JSON.stringify(data));
}

else if(process.argv[2]=="delete")
{
    let data=JSON.parse(fs.readFileSync("new.txt",'utf-8'))

    let id = parseInt(process.argv[3])-1
    data.splice(id,1)
    fs.writeFileSync("new.txt",JSON.stringify(data));
}

else if(process.argv[2]=="sum")
{
    let sum = 0
    let data=JSON.parse(fs.readFileSync("new.txt",'utf-8'))
    
for(let i=0;i<data.length;i++){
    sum+=parseInt(data[i].grade);
}
    
    console.log(sum);
}