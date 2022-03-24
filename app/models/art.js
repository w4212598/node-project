const { Movie, Music, Sentence } = require("../models/classsic");

class Art {
  static async getData(art_id, type) {
    const finder = {
      where: {
        id: art_id,
      },
    };
    const typeList = {
      100: Movie,
      200: Music,
      300: Sentence,
    };
    return await typeList[type].findOne(finder)
  }
}

module.exports = {Art};
