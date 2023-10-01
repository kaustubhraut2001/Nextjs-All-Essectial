import React from 'react'

const userprofile = ({params} : any) => {
  return (
	<>
		<h1>Profile Page</h1>
		<p>Profile Page {params.id}</p>

	</>
  )
}

export default userprofile;