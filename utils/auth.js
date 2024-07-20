const withAuth = (req, res, next) => {
    console.log("Session Obj: ", req.session);
    // If the user isn't logged in, redirect them to the login route

    if (!req.session.logged_in) {
    //  res.redirect('/');
        console.log("User NOT Authorized ...")
      res.redirect('/login');
    } else {
        console.log("User Authorized ...")
      next();
    }
  };
  
  module.exports = withAuth;