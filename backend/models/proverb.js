const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

// mongoDB에 제시어를 저장할 스키마를 
const themeWord = new mongoose.Schema({
    theme : String,
    name: String
  });

// 제시어 모델정의
const ProverbWord = mongoose.model('Proverb', themeWord)
module.exports = ProverbWord