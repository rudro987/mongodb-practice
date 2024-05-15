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
]);



db.test.aggregate([
    {
        $group: {
            _id: null,
            totalAge: { $sum: "$age" },
            maxAge: {$max: "$age"},
            minAge: {$min: "$age"},
            avgAge: {$avg: "$age"}
        }

    },
    {
        $project: {
            totalAge: 1,
            maxAge: 1,
            minAge: 1,
            averageAge: "$avgAge",
            rangeBetweenMaxAndMin: {$subtract: ["$maxAge","$minAge"]}
        }
    }

])



db.test.aggregate([
    {
        $unwind: "$interests"
    },
    {
        $group: {_id: "$age", interestsPerAge: {$push: "$interests"}}
    }
]);



db.test.aggregate([
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 40, 60, 80],
            default: "People aged above 80",
            output: {
                count: { $sum: 1 },
                name: { $push: "$$ROOT" }
            }
        }
    },
    {
        $sort: { count: -1 }
    },
    {
        $limit: 3
    },
    {
        $project: { count: 1 }
    }
]);






