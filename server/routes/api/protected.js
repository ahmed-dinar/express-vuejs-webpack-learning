

module.exports = function(req, res, next){

  if (!req.user)
  	return res.sendStatus(401);

  var usr = req.user;
  console.log(usr);

  res.status(200).json({ user: usr });
};