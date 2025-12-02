const express=require("express");                  //(1)
const app = express();
const mongoose= require("mongoose");              //(4)
const path=require("path");

// const ExpressError = require("./ExpressError"); //in handling asyn errror(2) file exports

const Chat=require("./Modules/chat.js");           //(7) export module require kiya
const methodOverride=require("method-override")  ;   //(14 )require method overrirde

app.set("views", path.join(__dirname,"views"));    //(6)
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));           //(13) to parse data from req.body 

app.use(express.static(path.join(__dirname,"public")));        //(10) add css file
app.use(methodOverride("_method"));                     // use

main().then( (res) =>{console.log("connection sueccful");              //(5)
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Fakewhatsapp');

}

//(8) insert data in Chat madule

// let chat1=new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send your exam seet",
//     created_at:new Date()
// });

// chat1.save().then( (res) =>{
//     console.log(res);
// })
// .catch( (err) =>{
//     console.log(err);
// })

// Create route.. new chat req  enter in db (12)

app.post("/chats",(req,res) =>{                     //no need of awit and create async fun 

     let {from,to,msg}=req.body;                   //jaise hi post req aayegi 1st access "from" data 

     let newChat= new Chat({         // create new chat schema from new.ejs
      
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
     });

    //  console.log(newChat);
    newChat.save()
    .then( (res)=>{
        console.log("chat was saved")
    })
    .catch( (err) =>{
        console.log(err);
    })
    //  res.render("working");
    res.redirect("/chats");                          //to return in page
})


// //create new route for Handling sync error in backend 7(error)(3)

// app.get("/chats/:id" , async (req, res, next) =>{
//     let { id } =req.params;
//     let chat = await Chat.findById(id);
//     if(!chat){
//         throw new ExpressError(404, "Chat Not Found");                //(3) throw new error
//     }
//     res.render("edit.js",{ chat });

// });

//Edit route (13) to show edit from

app.get("/chats/:id/edit", async (req, res) =>{
    let {id}=req.params;                                              //to remove id using params
    let chat= await Chat.findById(id);                                //id ke basic pr search chat in db ..kuch search krana async function
    res.render("edit.ejs", { chat });
});


//Update route(14)

app.put("/chats/:id", async (req,res) =>{
    let {id} =req.params;                                                //id extract
    let {msg:newMsg} =req.body;                                          //msg extract msg: ko rename kiya newmsg
    console.log(newMsg);
    let updatedChat= await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runvalidators:true , new:true}

    );
    console.log(updatedChat);
    res.redirect("/chats");
});

// Destroy route(15)

app.delete("/chats/:id" , async (req,res) => {
    let{ id }=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
    res.render("app.js");
})


//crete new chat to return the render from  (11)

app.get("/chats/new", (req,res) =>{      //this route return a from in this from we add new chat
    //throw error 
   // throw new ExpressError(404, "page Not Found");      //(3) throw new error this is backend errror hnadling
    res.render("new.ejs")
})



//Index route (9)

app.get("/chats",async (req,res) =>{
    let chats= await Chat.find();                         //async funnction Chat.find()and give data fronm database async fumction await 
    //console.log(chats); //(15)
    // res.send("woring");
    res.render("index.ejs", { chats});              //render file ejs then chats pass in ejs file 
})



//cerete route
app.get("/", (req,res) =>{                                     //(3)
 res.send("root is working");
});


//Error handling middleware(4) tghis is Backend error
// app.use((err,req,res,next)=>{
//     let {status=500 ,message="Some error Occuerd"}= err;
//     res.status(status).send(message);
// })



app.listen(8080, (res) =>{                                       //(2)
    console.log("server is listioning on port 8080");
});