export const renderProfile = (req, res) => {
  res.render('views/profile', {
    email: req.session.email,
    userId: req.session.userId,
  });
};

export const renderChangeAvatar = (req, res) => {
  res.render('views/change-avatar');
};

export default {
  renderProfile,
  renderChangeAvatar,
};
