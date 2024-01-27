const { Events } = require("../../models");
const { Users } = require("../../models");

const getFavorites = async (req, res, next) => {
  const { page = 1, perPage = 12 } = req.query;
  const id = req.params.id;

  try {
    const user = await Users.findById({ _id: id });
    let data = [];

    if (user.favorites !== "" && user.favorites !== undefined) {
      for (let key of user.favorites) {
        if (key !== "" && key !== undefined && key !== null) {
          data.push(await Catalog.findOne({ article: +key }));
        }
      }
    }
    let total = data.length;
    let catalog = [];
    for (
      i = page * perPage - perPage;
      i < page * perPage && i < data.length;
      i++
    ) {
      catalog.push(data[i]);
    }
    res.status(200).json({ data: catalog, total });
  } catch (error) {
    res.status(400).json({ message: "Invalid characters" });
  }
};
module.exports = getFavorites;
