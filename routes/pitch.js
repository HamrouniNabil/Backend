const express = require('express');
const Router = express();
const Pitch = require('../models/Pitch')

Router.post("/Add-pitch",(req,res)=>{
    const {name,adresse,phone1,phone2,email,capacite,prix,image} =req.body;
    const newpitch = new Pitch({
        name,
        adresse,
        phone1,
        phone2,
        email,
        capacite,
        prix,
        image
    })
    newpitch.save()
    .then(Pitchs=>res.send(Pitchs))
    .catch(err=>console.log(err));
})

Router.get("/pitchs",(req,res)=>{
    Pitch.find()
    .then(Pitchs=>res.send(Pitchs))
    .catch(err=>console.log(err))
})

Router.get("/getOnePitch/:_id",(req,res)=>{
    const {_id}= req.params;
    Pitch.findOne({_id})
    .then(Pitchs=>res.send(Pitchs))
    .catch(err=>console.log(err))
})

Router.delete("/delete-pitch/:_id",(req,res)=>{
    const {_id}=req.params;
    Pitch.findOneAndDelete({_id})
    .then(Pitchs=>res.send("Pitch deleted",Pitchs))
    .catch(err=>console.log(err))
})

Router.put("/edit-pitch/:_id",(req,res)=>{
    const {_id}= req.params;
    const {name,adresse,phone1,phone2,email,capacite,prix,image} =req.body;
    Pitch.findOneAndUpdate({_id}, {$set:{ name,adresse,phone1,phone2,email,capacite,prix,image }})
    .then(Pitchs=>res.send("pitch modified",Pitchs))
    .catch(err=>console.log(err))
})

module.exports = Router;


