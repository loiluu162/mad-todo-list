const renderProfile = (req, res) => {
  res.render('views/profile', {
    email: req.session.email,
    userId: req.session.userId,
  });
};

const renderChangeAvatar = (req, res) => {
  res.render('views/change-avatar');
};

module.exports = {
  renderProfile,
  renderChangeAvatar,
};
