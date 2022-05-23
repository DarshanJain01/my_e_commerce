const router=require('express').Router()
const {getAllTask,getSingleTask,createTask,updateTask,deleteAllTask,deleteTask,getSingleProduct}=require('../controllers/tasks.js')
  router.route('/').get(getAllTask)
  router.post('/createTask',createTask)
  router.delete('/deleteAllTask',deleteAllTask)
  router.route('/single-product/:id').get(getSingleProduct)
  router.route('/:id').patch(updateTask).delete(deleteTask).get(getSingleTask)

module.exports=router