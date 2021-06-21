module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for work  </h1>')
    return res.render('home',{
        title: "Home"
    })
}
module.exports.about = function(req,res){
    return res.end('<h1> About page </h1>')
}