db.test.aggregate([
  { $match: { gender: "male", age: { $lt: 30 } } },
  { $project: { gender: 1, age: 1, name: 1 } },
]);

db.test.aggregate([
  { $match: { gender: "male" } },
  { $addFields: { course: "level-2", eduTech: "Programming Hero" } },
  { $merge: "test" },
]);

db.test.aggregate([{ $group: { _id: "$isActive", count: { $sum: 1 } } }]);

db.test.aggregate([
  {
    $group: {
      _id: "$isActive",
      count: { $sum: 1 },
      fullDoc: { $push: "$$ROOT" },
    },
  },
  { $project: { "fullDoc.name": 1, "fullDoc.phone": 1, "fullDoc.email": 1 } },
]);

db.test.aggregate([
  {
    $group: {
      _id: null,
      totalAge: { $sum: "$age" },
      maxAge: { $max: "$age" },
      minAge: { $min: "$age" },
      avgAge: { $avg: "$age" },
    },
  },
  {
    $project: {
      totalAge: 1,
      maxAge: 1,
      minAge: 1,
      averageAge: "$avgAge",
      rangeBetweenMaxAndMin: { $subtract: ["$maxAge", "$minAge"] },
    },
  },
]);

db.test.aggregate([
  {
    $unwind: "$interests",
  },
  {
    $group: { _id: "$age", interestsPerAge: { $push: "$interests" } },
  },
]);

db.test.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 40, 60, 80],
      default: "People aged above 80",
      output: {
        count: { $sum: 1 },
        name: { $push: "$$ROOT" },
      },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 3,
  },
  {
    $project: { count: 1 },
  },
]);

db.test.aggregate([
  {
    $facet: {
      //pipeline-1
      tagsCount: [
        //stage-1
        { $unwind: "$tags" },
        //stage-2
        { $group: { _id: "$tags", count: { $sum: 1 } } },
      ],
      //pipeline-2
      friendsCount: [
        //stage-1
        { $unwind: "$friends" },
        //stage-2
        { $group: { _id: "$friends", count: { $sum: 1 } } },
      ],
    },
  },
]);

db.getCollection("massive-data")
  .find({ $text: { $search: "dolor" } })
  .project({ about: 1 });

db.getCollection("massive-data").createIndex({ about: "text" });

db.getCollection("massive-data").createIndex({ email: 1 });

db.massiveData.aggregate([
  { $match: { isActive: true, favoriteFruit: "banana" } },
  {
    $group: {
      _id: "$gender",
      count: { $sum: 1 },
      name: { $push: "$name" },
      email: { $push: "$email" },
    },
  },
]);


db.massiveData.aggregate([
    {
        $group: {
            _id: "$favoriteFruit",
            count: {$sum: 1},
            averageAge: {$avg: "$age"},
        }
    },
    {
        $sort: {averageAge: -1},
    }
  ]);



  db.massiveData.aggregate([
    {
        $unwind: "$friends"
    },
    {
        $match: {
            "friends.name": /^W/,
        }
    },
    {
        $group: {
            _id: "$_id",
            uniqueFriends: { $addToSet: "$friends.name" },
        }
    }
]);




db.massiveData.aggregate([
    {
        $facet: {
            below30: [
                {
                    $match: { age: { $lt: 30 } }
                },
                {
                    $bucket: {
                        groupBy: "$age",
                        boundaries: [20, 25, 30],
                        default: "Other",
                        output: {
                            names: { $push: "$name" }
                        }
                    }
                },
                {
                    $sort: { age: 1 }
                }
            ],
            above30: [
                {
                    $match: { age: { $gte: 30 } }
                },
                {
                    $bucket: {
                        groupBy: "$age",
                        boundaries: [30, 35, 40],
                        default: "Other",
                        output: {
                            names: { $push: "$name" }
                        }
                    }
                },
                {
                    $sort: { age: 1 }
                }
            ]
        }
    },

]);




db.massiveData.aggregate([
    {
        $group: {
            _id: "$company",
            totalBalance: {
                $sum: {
                    $toDouble: { $substr: ["$balance", 1, -1] }
                }
            }
        }
    },
    {
        $sort: {
            totalBalance: -1
        }
    },
    {
        $limit: 2
    }

]);


