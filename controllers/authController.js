const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.register = async (req, res, next) => {
//   console.log("BODY RECEBIDO:", req.body); // << Adicione isto
//     try {
//         const { name, email, phone, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'Email already registered!' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, phone, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ message: 'Registration successful!' });
//     } catch (err) {
//         next(err);
//     }
// };

//

exports.register = async (req, res, next) => {
  console.log("✅ /register endpoint hit"); // log que endpoint foi chamado
  console.log("Body received:", req.body); // log do que chegou

  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();

    console.log("User saved successfully"); // log do sucesso
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Registration error:", err); // log de erro
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password!" });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};
