const authMiddleware = (req, res, next)=>{
    const authKey = "8a60348b-d4a4-564a-9b45-aab518adb7f4"
    const {apiauthkey} = req.headers; 
    if(!apiauthkey){
        return res.status(403).json({ error: 'apiauthkey is missing or invalid' });
    }
    if (apiauthkey !== authKey) {
        return res.status(403).json({ error: 'Failed to authenticate apiauthkey' });
      }
      next()
}

module.exports = authMiddleware;