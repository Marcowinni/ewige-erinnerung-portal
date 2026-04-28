import { useState } from 'react'

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(() => {
    return localStorage.getItem('memora-admin-auth') === 'true'
  })

  const login = (pw: string): boolean => {
    if (pw === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem('memora-admin-auth', 'true')
      setIsAuthed(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('memora-admin-auth')
    setIsAuthed(false)
  }

  return { isAuthed, login, logout }
}
