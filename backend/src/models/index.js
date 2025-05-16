import User from "./user.model.js";
import Channel from "./channel.model.js";
import Video from "./video.model.js";
import Comment from "./comment.model.js";
import Like from "./like.model.js";
import Tweet from "./tweet.model.js";


const db = {};

db.user= User;
db.channel= Channel;
db.video= Video;
db.comment= Comment
db.like= Like;
db.tweet= Tweet



export default db;
