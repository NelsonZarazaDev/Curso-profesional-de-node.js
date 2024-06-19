const express = require("express");
const tweetsService = require("../services/tweetsService");
const boom = require("@hapi/boom");

const validation = require("../utils/middlewares/createValidationMiddleware");
const {
  createTweetSchema,
  tweetIdSchema,
  updateTweetSchema,
} = require("../utils/schemas/tweetsSchema");

const cache = require("../utils/middlewares/createCacheMiddleware");
const{
  ONE_MINUTE_IN_SECONDS,
  FIVE_MIUTES_IN_SECONDS
} = require("../utils/time")

const router = express.Router();

router.get("/",getTweets);
//Le digo que en el body voy a validar el createTweetSchema
router.post("/", validation({ body: createTweetSchema }), createTweet);
router.get("/:tweetId", validation({ params: tweetIdSchema }), getTweet);
router.delete("/:tweetId", validation({ params: tweetIdSchema }), deleteTweet);
router.patch(
  "/:tweetId",
  validation({ params: tweetIdSchema }),
  validation({ body: updateTweetSchema }),
  updateTweet
);

module.exports = router;

async function getTweets(req, res, next) {
  try {
    const tweets = await tweetsService.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
}

async function createTweet(req, res, next) {
  try {
    const tweet = req.body;
    // const validationError = validate(tweet, createTweetSchema);
    // if (validationError) {
    //   {
    //     return res
    //       .status(400)
    //       .json({ error: validationError.details[0].message });
    //   }
    // }

    const result = await tweetsService.createTweet(tweet);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getTweet(req, res, next) {
  try {
    const { tweetId } = req.params;
    const tweet = await tweetsService.getTweet(tweetId);
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTweet(req, res, next) {
  try {
    const { tweetId } = req.params;
    const tweet = await tweetsService.deleteTweet(tweetId);
    if (deleteRows > 0) {
      res.status(200).json({ message: "Tweet delete" });
    } else {
      res.status(400).json({ message: "Tweet not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateTweet(req, res, next) {
  try {
    const { tweetId } = req.params;
    const { content } = req.body;
    const updateRows = await tweetsService.updateTweet(tweetId, content);
    if (updateRows > 0) {
      res.status(200).json({ message: "Tweet updated" });
    } else {
      const {
        output: { statusCode, payload },
      } = boom.notFound();
      payload.message = "Tweet not found";
      res.status(statusCode).json(payload);
    }
  } catch (error) {
    next(error);
  }
}
