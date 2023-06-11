import React from 'react'
import { useParams } from '@remix-run/react'

const $code = () => {
    const params = useParams()
  return (
    <div>
      dasdsad {params.code}
    </div>
  )
}

export default $code
