import React from 'react'
import { auth } from '../api/auth_api'
import { useMutation } from '@tanstack/react-query'

export default function useRegister() {
  return useMutation({
    mutationFn:auth.register,
    onSuccess:(data)=>{

    },
    onError:(error)=>{
        
    }
  })
}
