const express=require("express");                  
const app = express();
const mongoose= require("mongoose");              
const path=require("path");

// const ExpressError = require("./ExpressError"); 

const Chat=require("./Modules/chat.js");           
const methodOverride=require("method-override")  ;   

app.set("views", path.join(__dirname,"views"));   
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));            

app.use(express.static(path.join(__dirname,"public")));        
app.use(methodOverride("_method"));                     

main().then( (res) =>{console.log("connection sueccful");              
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Fakewhatsapp');

}



app.post("/chats",(req,res) =>{                     

     let {from,to,msg}=req.body;                   

     let newChat= new Chat({         
      
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
    res.redirect("/chats");                          
})
app.get("/chats/:id/edit", async (req, res) =>{
    let {id}=req.params;                                              
    let chat= await Chat.findById(id);                                
    res.render("edit.ejs", { chat });
});
//Update route(14)
app.put("/chats/:id", async (req,res) =>{
    let {id} =req.params;                                                
    let {msg:newMsg} =req.body;                                          
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
app.get("/chats/new", (req,res) =>{      
    //throw error 
   // throw new ExpressError(404, "page Not Found");      
    res.render("new.ejs")
})
//Index route (9)

app.get("/chats",async (req,res) =>{
    let chats= await Chat.find();                          
    //console.log(chats); //(15)
    // res.send("woring");
    res.render("index.ejs", { chats});              
})
//cerete route
app.get("/", (req,res) =>{                                     //(3)
 res.send("root is working");
});
app.listen(8080, (res) =>{                                       //(2)
    console.log("server is listioning on port 8080");
});
