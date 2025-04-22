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
    //we assume that body will be in format [{id, field1, ...}, ...]
    const userId=req.user.userId;
    const tablename=req.params.tablename;
    const sqlite_id=req.body.map(item=>item.id)//just get id
    let body=req.body.map(({id, ...rest})=>rest);//remove id
    for (item of body){
        item.userId= new mongoose.Types.ObjectId(userId);//or is it just userId?
    }
    const Model = mongoose.models[tablename];
    try {
        //add userId...

        const result=await Model.insertMany(body, {ordered:true});//body must be [ {}, ...]
        count=0;
        returnObj=[]
        for (const item in result){
            returnObj=[...returnObj, {id:body[count].id, mongo_id:item._id}, ]
        }
        //need to then get their mongo_id's
        res.status(200).json({message:'insert success', mongo_ids:returnObj});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};