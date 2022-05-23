const Task = require("../models/schema")
const asyncWrapper = require("../middleware/async")
const {customErrorFun} = require("../errors/custom-errors")
const axios = require("axios")

const getAllTask = asyncWrapper(async (req, res) => {
  const data = await Task.find()
  if (!data) return next(customErrorFun("NO PRODUCT FOUND", 401))
  return res.status(200).send(data)
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const {id: TaskId} = req.params
  const data = await Task.findOne({_id: TaskId})
  if (!data) {
    console.log("hello")
    next(customErrorFun(`NO TASK FOUND WITH THIS ID `, 404))
  }
  return res.status(200).json(data)
})

const getSingleProduct = asyncWrapper(async (req, res, next) => {
  const {id: TaskId} = req.params
  const {data} = await axios.get(
    `https://course-api.com/react-store-single-product?id=${TaskId}`
  )
  if (!data) {
    next(customErrorFun("NO TASK FOUND WITH THIS ID", 404))
  }
  res.status(201).send(data)
})

const createTask = async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json(task)
}



const updateTask = asyncWrapper(async (req, res, next) => {
  const {id: TaskId} = req.params

  const arr = await Task.findById(TaskId)

  if (req.body.hasOwnProperty("color")) {
    arr.totalCount += 1
    arr.totalPrice += arr.price
    arr.color = arr.color.map((item) => {
      if (item.singleColor === req.body.color) {
        return {
          singleColor: item.singleColor,
          count: item.count + 1,
          _id: item._id,
        }
      } else return item
    })
  } else if (req.body.hasOwnProperty("increment")) {
    if (req.body.increment) {
      arr.totalCount += 1
      arr.totalPrice += arr.price
    } else {
      if (arr.totalCount > 1) {
        arr.totalCount -= 1
        arr.totalPrice -= arr.price
      }
    }
  } else {
    arr.totalCount += 1
    arr.totalPrice += arr.price
    arr.color.push(req.body)
  }
  const data = await Task.findOneAndUpdate({_id: TaskId}, arr, {
    new: true,
    runValidators: true,
  })

  if (!data) {
    next(customErrorFun("PLEASE ENTER CORRECT ID NUMBER", 401))
  }
  res.status(200).json(data)
})
const replaceAllTask = asyncWrapper(async (req, res, next) => {
  const data = await Task.findOneAndUpdate({_id: TaskId}, arr, {
    new: true,
    runValidators: true,
  })

  if (!data) {
    next(customErrorFun("PLEASE ENTER CORRECT ID NUMBER", 401))
  }
  res.status(200).json(data)
})
const deleteAllTask = asyncWrapper(async (req, res, next) => {
  const data = await Task.remove({})
  if (!data) {
    next(customErrorFun("NO TASK FOUND WITH THIS ID", 404))
  }
  res.status(201).json("ITEM DELETED")
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const {id: TaskId} = req.params
  const data = await Task.findOneAndDelete({_id: TaskId})
  if (!data) {
    next(customErrorFun("NO TASK FOUND WITH THIS ID", 404))
  }
  res.status(201).json("ITEM DELETED")
})
module.exports = {
  getAllTask,
  getSingleTask,
  getSingleProduct,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTask,
  replaceAllTask,
}
