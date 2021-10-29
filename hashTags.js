const dotenv = require('dotenv');

dotenv.config();

let hashTag1 = process.env.HASHTAG_1;
let hashTag2 = process.env.HASHTAG_2;
let hashTag3 = process.env.HASHTAG_3;
let hashTag4 = process.env.HASHTAG_4;
let hashTag5 = process.env.HASHTAG_5;
let hashTag6 = process.env.HASHTAG_6;
let hashTag7 = process.env.HASHTAG_7;

module.exports = [
    hashTag1,
    hashTag2,
    hashTag3,
    hashTag4,
    hashTag5,
    hashTag6,
    hashTag7,
]
