"use client"
import React from 'react'
import withAuth from '@/app/components/withAuths/page';
const NewResult = () => {
  return (
    <div>NewResult</div>
  )
}


export default withAuth(NewResult, ['SCRUTATEUR']);