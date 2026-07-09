import React from 'react'

export default function useFetchOpenTask() {
  return useQuery({
    queryKey: ['open-tasks'],
    queryFn:task.getAllOpenTask,
    
  })
}
