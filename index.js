const { render } = require("ejs");
const express=require("express");
const port =8080;
const app=express();

const path=require("path");
const methodOverride=require('method-override');

const{v4 : uuidv4} =require('uuid');
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended :true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Albert Einstein",
        content:"Life is like riding a bicycle. To keep your balance, you must keep moving."
    },
    {
        id:uuidv4(),
        username:"Ada Lovelace",
        content:"That brain of mine is something more than merely mortal; as time will show."
    },
    {
        id:uuidv4(),
        username:"Martin Luther King Jr.",
        content:"Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that."
    },
];


app.listen(port, ()=>{
    console.log(`app is listning on port ${port}`);
});

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/post/new", (req,res)=>{
    res.render("new.ejs");
})


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs",{post});

})
app.post("/posts",(req,res)=>{
   let {username ,content}=req.body;
   let id=uuidv4();
   posts.push({id,username ,content});
//    res.render("index.ejs",{posts});
        res.redirect("/post");
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post");
    
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/post")
})