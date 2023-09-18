class NewController {
  // [GET] /news
  index(req, res) {
    res.render('news');
  }

  // [GET] /news/:slug
  show(req, res) {
    console.log(req.params.slug);
    res.send('news details');
  }
}

module.exports = new NewController();
