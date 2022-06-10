const express = require("express");
const dbo = require("../db/conn");

const load = require("../utils/loading");
const { error, log, info, good } = require("../utils/chalk");

dbo.connectToServer((err) => {
  if (err) log(error(err));
});

const recordRoutes = express.Router();

recordRoutes.post("/query", async (req, res) => {
  load.start();
  try {
    const { which, year, month, specialization, hospital } = req.body;
    let result = [];
    console.log(which);
    switch (which) {
      case "1":
        result = await MostUsedHospitals({ year, month });
        break;
      case "2":
        result = await MostUsedDiagnosis({ specialization });
        break;
      case "3":
        result = await AverageTimeOfConsultation({ specialization, hospital });
        break;
      case "4":
        result = await MostUsedPatienceTypes({ year, month });
        break;
      case "5":
        result = await MostUsedConsultationTypes({ year, month });
        break;
    }
    console.log(result);
    res.send({ result });
  } catch (err) {
    console.log(err);
  }
  load.stop();
});

// This section will help you get a list of all the documents.
recordRoutes.get("/get", async (req, res) => {
  load.start();
  const dbConnect = dbo.getDb();
  const { collection } = req.query;
  log(info(`Fetching ${collection}`));
  await dbConnect
    .collection(collection)
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        log(error(`Error fetching ${collection}!`));
        res.status(400).send(`Error fetching ${collection}!`);
      } else {
        log(good("Query executed correctly"));
        res.json(result);
      }
    });
  load.stop();
});

// This section will help you create a new document.
recordRoutes.post("/insert", async (req, res) => {
  load.start();
  const dbConnect = dbo.getDb();
  const { collection, many } = req.body;
  if (many) {
    const { list } = req.body;
    await dbConnect
      .collection(collection)
      .insertMany([...list], function (err, result) {
        if (err) {
          log(error("Error inserting!"));
          res.status(400).send("Error inserting!");
        } else {
          log(good(`Added ${list.length} elements`));
          res.status(200).send("Ok");
        }
      });
  } else {
    const data = req.body.options;
    await dbConnect
      .collection(collection)
      .insertOne(data, function (err, result) {
        if (err) {
          log(error("Error inserting!"));
          res.status(400).send("Error inserting!");
        } else {
          log(good(`Added a new match with id ${result.insertedId}`));
          res.status(200).send("Ok");
        }
      });
  }
  load.stop();
});

// This section will help you update a document by id.
recordRoutes.post("/update", async (req, res) => {
  load.start();
  const dbConnect = dbo.getDb();
  const { collection } = req.body;
  const data = req.body.options;
  const listingQuery = { id: data.oldId ? data.oldId : data.id };
  console.log(data);
  const updates = {
    $set: { ...data },
  };
  await dbConnect
    .collection(collection)
    .updateOne(listingQuery, updates, function (err, _result) {
      console.log(_result, data);
      if (err) {
        log(error(`Error updating on listing with id ${listingQuery.id}!`));
        res
          .status(400)
          .send(`Error updating on listing with id ${listingQuery.id}!`);
      } else {
        log(good("1 document updated"));
        res.status(200).send("Ok");
      }
    });
  load.stop;
});

module.exports = recordRoutes;
