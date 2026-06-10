import { Router, type Request, type Response } from 'express';
import type { User } from '../types/user';

const router = Router();

// In-memory store (we'll replace this with a real DB later)
let users: User[] = [
  { id: 1, name: 'Alice Mukamurenzi', email: 'alice@example.com' },
  { id: 2, name: 'Bob Nkurunziza', email: 'bob@example.com' },
];

// GET /users — return all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// GET /users/:id — return a single user
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(String(req.params.id)));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// POST /users — create a new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id — update a user
router.put('/:id', (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === parseInt(String(req.params.id)));
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE /users/:id — remove a user
router.delete('/:id', (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === parseInt(String(req.params.id)));
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

export default router;
