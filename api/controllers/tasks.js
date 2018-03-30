const mongoose = require('mongoose')
const Tasks = require('../model/tasks')
const User = require('../model/users')


exports.add_task = (req,res,next) => {

    User.findById(req.body.userId).then( result => {

        if(!result){
            res.status(404).json({
                message: "introuvable"
            })
        }
        let state = ""

        if(req.body.state === "en cours"){
            state = true
        }
        else{
            state = false
        }

        const task = new Tasks({
            _id: mongoose.Types.ObjectId(),
            userId:req.body.userId,
            task: req.body.task,
            state: state
        })
        return task.save()
    }).then(end => {
        res.status(201).json({
            message: "tâche créée"
        })
    }).catch(err => {
        res.status(500).json({})
    })
}

exports.all_tasks = (req,res,next)=>{
    const id = req.params.userId

    Tasks.find({
        userId:id
    }).select('_id task state').exec().then(tasks => {
        res.render('liste.ejs',{liste:tasks})
        // res.status(200).json({
        //     message: "tous les tâches:",
        //     tasks
        // })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })
}

exports.detail_task = (req,res,next)=>{
    const id = req.params.id

    Tasks.findById({
        _id:id
    }).select('_id task state').exec().then(task => {
        res.status(200).json({
            message: "tâche: "+id,
            task
        })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })}

exports.update_task = (req,res,next)=>{
    const id = req.params.id
    const updateObj = {}
    const reqBody = req.body
    for(let p in reqBody){
        if(p == "state" && reqBody[p] == "en cours"){
            updateObj[p] = true
        }
        else if(p == "state" && reqBody[p] == "fini"){
            updateObj[p] = false
        }
        else{
            updateObj[p] = reqBody[p]
        }
    }

    Tasks.update({_id:id},{$set: updateObj}).then(result => {
        res.status(200).json({
            message:"update reussite",
            result
        })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })
}

exports.delete_task = (req,res,next)=>{
    const id = req.params.id

    Tasks.findByIdAndRemove(id).then(result=>{
        res.status(200).json({
            message: "suppresion du post"
        })
    }).catch(err => {
        res.status(500).json({
            err
        })
    })
}
