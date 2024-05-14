db.test.find({ gender: "male" }).project({ name: 1, gender: 1, email: 1 });

db.test.find({ age: { $eq: 20 } });

db.test.find({ age: { $ne: 20 } });

db.test.find({ age: { $gt: 30 } });

db.test.find({ age: { $gte: 30 } }).sort({ age: 1 });

db.test.find({ age: { $lte: 30 } }).sort({ age: 1 });

db.test.find({ age: { $gt: 18, $lt: 30 } }, { age: 1 }).sort({ age: 1 });

db.test
  .find({ gender: "female", age: { $nin: [20, 26] } }, { age: 1, gender: 1 })
  .sort({ age: 1 });

db.test
  .find({ gender: "female", age: { $in: [20, 26] } }, { age: 1, gender: 1 })
  .sort({ age: 1 });

db.test
  .find(
    {
      gender: "female",
      age: { $nin: [20, 26] },
      interests: { $in: ["Cooking", "Gaming"] },
    },
    { age: 1, gender: 1, interests: 1 }
  )
  .sort({ age: 1 });


  db.test.find(
    {
        $and: [
            {gender: "female"},
            { age: { $ne: 15 } },
            { age: { $lte: 30 } }
        ]
    }
).project({
    age: 1,
    gender: 1
}).sort({
    age: 1
})


db.test.find(
    {
        $or: [
            {interests: "Traveling"},
            { interests: "cooking" }
        ]
    }
).project({
    interests: 1
}).sort({
    age: 1
});


db.test.find(
    {
        $or: [
            {"friends.name": "Dina Pollard"},
            {"friends.name": "Vargas Combs"},
        ]
    }
).project({
    friends: 1
}).sort({
    age: 1
});


db.test.find({ age: { $exists: true} })

db.test.find({ friends: { $type: "array" } })

db.test.updateOne(
    {_id: ObjectId("654dbfa0ac03b4ef85f2a906")},
    {
        $set: {
            age: 80
        }
    }
)

db.test.updateOne(
    {_id: ObjectId("654dbfa0ac03b4ef85f2a906")},
    {
        $addToSet: {
            interests: {$each: ["Gaming", "Cooking"]}
        }
    }
);


db.test.updateOne(
    {_id: ObjectId("654dbfa0ac03b4ef85f2a906")},
    {
        $set: {
            "address.city": "Dhaka",
            "address.postalCode": "1216",
            "address.country": "Bangladesh"
        }
    }
)


