const users = require("../data/users");

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const { password: _password, ...safeUser } = user;
  res.json(safeUser);
};

module.exports = { login };
