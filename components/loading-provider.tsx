'use client'

import { createContext, useContext, useState, useTransition } from 'react'

const LoadingContext = createContext(null)

export function LoadingProvider({ children }) {
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)

  const value = {
    loading: loading || isPending,
    setLoading,
    startTransition,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {value.loading && (
        <div className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary' />
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
