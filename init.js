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
        from:"sender",
        to:"reciever",
        msg:"hi sender",
        created_at:new Date()

    },
    {
        from:"sender1",
        to:"reciever1",
        msg:"how are you",
        created_at:new Date()
    },
    {
        from:"Alice",
        to:"bob",
        msg:"fine",
        created_at:new Date()
    },
    {
        from:"sender2",
        to:"receiver2",
        msg:"some message",
        created_at:new Date()
    },

];


Chat.insertMany(allchats);
