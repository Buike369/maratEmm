const express = require('express')
const router = express.Router()
const { formSubmit } = require("../controller/post.js")
const { formSubmit1 } = require("../controller/post1.js")


router.post("/form", formSubmit)
router.post("/form1", formSubmit1)

module.exports = router