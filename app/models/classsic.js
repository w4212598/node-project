const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db");

const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
};
const musicFields = Object.assign(classicFields,{
    // url: Sequelize.STRING,
});

class Movie extends Model {

}

class Sentence extends Model {

}

class Music extends Model {

}


Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
});

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
});

Music.init(musicFields, {
    sequelize,
    tableName: 'music'
});

module.exports = { Movie, Sentence, Music };
