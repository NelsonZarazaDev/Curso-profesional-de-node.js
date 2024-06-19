const connection = require("../lib/connect");

module.exports = {
  getTweets,
  createTweet,
  getTweet,
  deleteTweet,
  updateTweet,
};

//GET: http://localhost:5173/tweets
async function getTweets() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tweets";
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//POST: http://localhost:5173/tweets
/*
{
    "content":"Hola como estas",
    "userId":1
}
*/
async function createTweet(tweet) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tweets SET ?";
    connection.query(sql, tweet, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: res.insertId, ...tweet });
      }
    });
  });
}

//GET: http://localhost:5173/tweets/id
async function getTweet(tweetId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tweets WHERE tweetId = ?";
    connection.query(sql, tweetId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}

//DELETE: http://localhost:5173/tweets/13
async function deleteTweet(tweetId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tweets WHERE tweetId = ?";
    connection.query(sql, tweetId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.affectedRows);
      }
    });
  });
}


//PATCH: http://localhost:5173/tweets/14
/*
{
    "content":"Hola como estas?"
}
*/
async function updateTweet(tweetId, content) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE tweets SET content= ? WHERE tweetId = ?";
    connection.query(sql, [content,tweetId], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.affectedRows);
      }
    });
  });
}
