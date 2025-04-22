const mongoose = require('mongoose');
// api/sync/remote/:tablename
exports.getRemote = async (req, res) =>{
    //sends correct data
    const userId=req.user.userId;
    const tablename=req.params.tablename;

    const Model = mongoose.models[tablename];
    /**
     * body will have
     * body.data, [{mongo:111,timestamp:111},...] note timestamp is not used yet
     */
    try {
        const localMongo_id= req.body.map(item=>new mongoose.Types.ObjectId(item.mongo_id));
        ///this should also compare lastUpdated, but not yet implemented
        // should change to send {mongo_id:"12312", lastUpdated:"2022-128313"} and only send back  not in and newer entries, also tell to set synced to 0 for old dates
        const remoteOnly = await Model.find({
            "_id": {
                "$nin": localMongo_id
            }, 
            "userId":userId
        }).exec();
        res.status(200).json(remoteOnly);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};



// api/sync/local/:tablename
//does successfully insert
exports.sendLocal = async (req, res) =>{
    const userId=req.user.userId;
    const tablename=req.params.tablename;
    let body=req.body;
    for (item of body){
        item.userId= new mongoose.Types.ObjectId(userId);//or is it just userId?
    }
    const Model = mongoose.models[tablename];
    try {
        //add userId...

        result=await Model.insertMany(body);//body must be [ {}, ...]
        res.status(200).json({message:'insert success'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};