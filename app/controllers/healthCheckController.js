const healthCheck = async (req, res, next) => {
    try{
        return res.json({message: "success"});
    }catch(error){
        return res.status(500).json(error.message);
    }
}

module.exports = {healthCheck}