const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName).where({ review_id: reviewId }).del();
}

const addCritics = () => {
  return mapProperties({
    "critic_id": "critic.critic_id",
    "created_at": "critic.created_at",
    "updated_at": "critic.updated_at",
    "preferred_name": "critic.preferred_name",
    "surname": "critic.surname",
    "organization_name": "critic.organization_name",
  })
}

async function list(movie_id) {
  // TODO: Write your code here
  return db(tableName)
  .join("critics as c", "reviews.critic_id", "c.critic_id")
  .select("reviews.*", "c.*")
  .where({ movie_id })
  .then(reviews => reviews.map(addCritics()));
  
}

async function read(reviewId) {
  // TODO: Write your code here
  return db("reviews").where({ review_id: reviewId }).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
