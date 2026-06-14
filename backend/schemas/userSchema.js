import { z  } from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(1,'Name is required.'),
    email: z.email('Email is not valid.'),
    password: z.string().min(4,'password must be 4 characters.'),
    role: z.enum(['admin','user']).optional()
})

export const loginSchema = z.object({
    email: z.email('Email is not valid.'),
    password: z.string().min(4, 'password must be 4 characters.')
})