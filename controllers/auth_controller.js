import knex from 'knex';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY= process.env.SECRET_KEY;

function authorize(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send("Please login");
    }
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];
  
    try {
      const payload = jwt.verify(authToken, SECRET_KEY)
      req.decoded = payload.name
      next()
  
    } catch (error) {
      console.log(error)
    }
  }

export async function register (req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export async function login (req, res) {
  const { email, password } = req.body;

  try {
    const user = await knex('users').where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export async function logout (_req, res)  {
  res.status(200).json({ message: 'Logout successful' });
};
