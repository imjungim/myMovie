const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
var cors = require("cors");
const { send } = require("process");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const { MONGODB_URI } = process.env;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(MONGODB_URI, function (error, client) {
  //연결되면
  if (error) return console.log(error);
  db = client.db("MyMoviePlace");
  app.listen(8080, function () {
    console.log("listening on 8080");
  });
});

app.use(express.static(path.join(__dirname, "mymovieplace_frontend/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/mymovieplace_frontend/build/index.html"));
});

//리뷰목록
app.get("/api/get", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (err, result) {
      res.send(result);
    });
});

//리뷰등록
app.post("/api/insert", function (req, res) {
  res.send("성공ㅇ");
  db.collection("counter").findOne({ name: "count" }, function (err, res) {
    let total = res.totalPost;
    let saveContent = {
      title: req.body.title,
      content: req.body.content,
      grade: req.body.grade,
      date: new Date(),
      id: total + 1,
    };
    db.collection("post").insertOne(saveContent, function (err, result) {
      db.collection("counter").updateOne(
        { name: "count" },
        { $inc: { totalPost: 1 } },
        function (err, result) {
          if (err) {
            return console.log(err);
          }
        }
      );
    });
  });
});

//리뷰수정

app.post("/edit/", function (req, res) {
  console.log("수정id", req.body);
  db.collection("post").updateOne(
    {id : req.body.id},
    {
      $set: { content: req.body.content },
    },
    function (error, result) {
      console.log('수정완료')
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

//리뷰삭제
app.delete("/api/delete", function (req, res) {
  //db 삭제요청
  console.log("id!", req.body);
  db.collection("post").deleteOne(req.body, function (error, result) {
    console.log("삭제완료");
    if (error) {
      console.log("error!", error);
    }
    res.send(result);
  });
});

