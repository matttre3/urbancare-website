import type { Access, Where } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin'
export const published: Access = ({ req }) => req.user ? true : {
  and: [
    { _status: { equals: 'published' } },
    { publishedAt: { less_than_equal: new Date().toISOString() } },
  ],
} as Where
