const mongoose = require('mongoose');

//const Schema = mongoose.Schema; 아래로 변경
const { Schema } = mongoose;

const Post = new Schema ({
  title: String,
  body: String,
  tags: [String], // 문자열 배열
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본 값으로 지정
  }
});

module.exports = mongoose.model('Post', Post);