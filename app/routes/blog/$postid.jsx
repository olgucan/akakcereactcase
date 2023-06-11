import React from 'react'
import { useParams } from '@remix-run/react'
const Postid = () => {
  const params = useParams()
  return (
    <div>
      <h2>A Blog Post titled {params.postid}</h2>
    </div>
  )
}

export default Postid
