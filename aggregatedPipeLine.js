db.test.aggregate([
    { $match: { gender: 'male', age: { $lt: 30 } } },
    { $project: { gender: 1, age: 1, name: 1 } }
]);


db.test.aggregate([
    { $match: { gender: 'male' } },
    { $addFields: { course: "level-2", eduTech: "Programming Hero" } },
    { $merge: "test" }
])


db.test.aggregate([
    { $group: { _id: "$isActive", count: { $sum: 1 } } },
])


db.test.aggregate([
    { $group: { _id: "$isActive", count: { $sum: 1 }, fullDoc: { $push: "$$ROOT" } } },
    { $project: { "fullDoc.name": 1, "fullDoc.phone": 1, "fullDoc.email": 1 } }
])

