const mongoose = require('mongoose');
const Users = require('../models/users');
const Opinion = require('../models/opinion');
const Likes = require('../models/likes');

const OpinionCtrlr = {};

OpinionCtrlr.getOpinions = async (req, res) => {
    const opinions = await Opinion.find()
    const Opinions = []
    for (let opinion of opinions){
        const user = await Users.findById(opinion.user_id);
        opinion.user = user.name;
        const totalLikes = await Likes.find({opinion_id: opinion._id})
        const liked = await Likes.findOne({send_by: req.user, opinion_id: opinion._id});
        opinion.likes = totalLikes;
        if (liked) {
            opinion.liked = true;
        } else {
            opinion.liked == false;
        }
        Opinions.push({
            _id: opinion._id,
            tag: opinion.tag,
            content: opinion.content,
            user: opinion.user,
            date: opinion.created_at,
            liked: opinion.liked,
            likes: totalLikes
        });
    }   
    return res.status(200).json({
        status: 'success',
        data: Opinions
    });
}

OpinionCtrlr.createOpinion = async function (req, res) {
    const {tag, content} = req.body;
    const user_id = req.user;
    const newOpinion = new Opinion({_id: new mongoose.Types.ObjectId(), tag, content, user_id});
    await newOpinion.save((err) => {
        if (err) {
            console.log(err)
        }      
    });

    console.log(newOpinion);
    res.status(200).json({
        status: 'success',
        data: 'Opinion Saved'
    });

}

OpinionCtrlr.addLike = async (req, res) => {
    const objective = await Opinion.findById(req.params.id)
    if (objective) {
        const liked = await Likes.findOne({send_by: req.user, opinion_id: req.params.id});
        if (liked) {
            await liked.remove();
            res.status(200).send({
                status: 'success',
                message: 'Like Romoved!!'
            })
        } else {
            const opinion_id = objective._id;
            const send_by = req.user;
            const newLike = new Likes({_id: new mongoose.Types.ObjectId(),send_by, opinion_id});
            await newLike.save();
            res.status(200).json({
                status: 'success',
                message: 'Like added!!'
            })
        }
    } else {
        res.status(200).json({
            status: 'fail',
            message: 'the opinion does not exist!!'
        })
    }
}

OpinionCtrlr.reloadLikes = {}

module.exports = OpinionCtrlr;