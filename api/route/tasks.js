const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../model/tasks')
const auth = require('../middleware/auth')
const { all_tasks, detail_task, update_task, delete_task, add_task } = require('../controllers/tasks')



router.get('/all/:userId', all_tasks)

router.get('/:id', detail_task)

router.get('/addTask', (req,res) => {
    res.render('add.ejs')
})

// router.post('/add', add_task)
//
// router.post('/update/:id', update_task)
//
// router.post('/delete/:id', delete_task)


module.exports = router