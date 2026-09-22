const users = require("../data/users");

// Not real security — just enough to mimic "you must be logged in" so the
// app's auth flow has something real to fail against.
const requireAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const user = users.find((u) => u.token === token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};

module.exports = { requireAuth };
