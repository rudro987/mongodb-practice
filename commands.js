db.test.find({ gender: "male" }).project({name: 1, gender: 1, email: 1})

db.test.find({ age: { $eq: 20 } })

db.test.find({ age: { $ne: 20 } })

db.test.find({ age: { $gt: 30 } })

db.test.find({ age: { $gte: 30 } }).sort({age: 1})

db.test.find({ age: { $lte: 30 } }).sort({age: 1})

