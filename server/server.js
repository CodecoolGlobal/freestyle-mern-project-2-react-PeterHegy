const mongoose = require('mongoose');
const Activity = require('./model/Activity')
mongoose.connect("mongodb+srv://farkasgergot:8QbrkKOTPQfZsWhZ@cluster0.osvlcqp.mongodb.net/")
const cors = require('cors');


const express = require('express');
const app = express();
app.use(express.json());
app.use(cors())

app.listen(3000, () => console.log('Server started on port 3000'));


app.post('/api/activity',  (req, res) => {
    console.log(req.body)
    const activity = req.body.activity
    const accessibility = req.body.accessibility
    const type = req.body.type
    const participants = req.body.participants
    const price = req.body.price
    const link = req.body.link
    const key = req.body.key

    const ACT = new Activity({
        activity,
        accessibility,
        type,
        participants,
        price,
        link,
        key,
    });
     ACT.save()
    res.send('SIKER')
})

app.get('/api/favourites', async (req, res) => {
try {
    const favourites =  await Activity.find({})
    console.log(favourites)
    res.send(favourites)
} catch {
    console.error(error)
}
})

app.delete('/api/favourites/:id', async (req, res) => {
    const delKey = req.params.id
    console.log(delKey)
    try {
        const delItem = await Activity.deleteOne({key : delKey})
        console.log(delItem)
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/edit', async (req, res, next) => {
    const data = req.body
    try {
        const modifyActivity = await Activity.findOne({ key : data.key})
        modifyActivity.activity = data.activity
        modifyActivity.accessibility = data.accessibility
        modifyActivity.type = data.type
        modifyActivity.participants = data.participants
        modifyActivity.price = data.price
        await modifyActivity.save();
        return res.sendStatus(200);
    } catch (error) {
        return next(error);
    }
});

