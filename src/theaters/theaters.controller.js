const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  // const { movieId } = request.params;
  // const theaters = await service.list();
  // console.log("theaters", theaters);
  // const data = movieId
  //   ? theaters.filter((theater) => theater.movie_id === Number(movieId))
  //   : theaters;
  // response.json({ data });
  response.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
