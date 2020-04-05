const mongoose = require('mongoose');
const Users = require('../models/users');
const Opinion = require('../models/opinion');
const Likes = require('../models/likes');

const OpinionCtrlr = {};

OpinionCtrlr.getOpinions = async (req, res) => {
    const Opinions = await Opinion.find() 
    for (let opinion of Opinions){
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
    }   
    return res.status(200).send({
        status: 'succes',
        data: Opinions
    });
}

OpinionCtrlr.createOpinion = async function (req, res) {
    const {tag, content, user} = req.body;
    const user_id = user;
    const newOpinion = new Opinion({_id: new mongoose.Types.ObjectId(), tag, content, user_id});
    await newOpinion.save()
    console.log(newOpinion);
    res.status(200).json({
        status: 'success',
        data: 'Opinion Saved'
    });

}

OpinionCtrlr.addLike = async (req, res) => {
    const objective = await Opinion.findById(req.params.id)
    if (objective) {
        const liked = await Likes.findOne({send_by: req.user.id, opinion_id: req.params.id});
        if (liked) {
            await liked.remove();
            res.redirect('/index');
        } else {
            const opinion_id = objective._id;
            const send_by = req.user.id;
            const newLike = new Likes({_id: new mongoose.Types.ObjectId(),send_by, opinion_id});
            await newLike.save();
            res.redirect('/index');
        }
    } else {
        res.redirect('/index');
    }
}

OpinionCtrlr.reloadLikes = {}

module.exports = OpinionCtrlr;