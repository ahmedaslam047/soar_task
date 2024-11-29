import axios from 'axios'
import { useEffect, useState } from 'react'

interface UseAxiosProps<T> {
  url: string
  initialData?: T | null
}

interface UseAxiosReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useQuery<T>({
  url,
  initialData = null,
}: UseAxiosProps<T>): UseAxiosReturn<T> {
  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get<T>(url)
      setData(response.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}
