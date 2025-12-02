const mongoose=require("mongoose");

const Chat=require("./Modules/chat.js");

main()
.then( (res) =>{
 console.log("connection sueccful");              //(5)
 })
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Fakewhatsapp');

}

let allchats=[
    {
        from:"neha",
        to:"priya",
        msg:"hi priya",
        created_at:new Date()

    },
    {
        from:"rohit",
        to:"aksh",
        msg:"how are you",
        created_at:new Date()
    },
    {
        from:"abhi",
        to:"bob",
        msg:"fine",
        created_at:new Date()
    },
    {
        from:"ankita",
        to:"pranya",
        msg:"what you say",
        created_at:new Date()
    },

];


Chat.insertMany(allchats);