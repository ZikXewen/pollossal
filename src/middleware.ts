import { nanoid } from 'nanoid'
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.cookies.get('pollossal-token')) return
  const res = NextResponse.next()
  res.cookies.set('pollossal-token', nanoid(), {
    sameSite: 'strict',
    maxAge: 3000000,
  })
  return res
}
