
import React, { useState } from 'react'
import { useNonce } from '../src/usenonce'

export const NonceComponent: React.FC<{}> = () => {
  const nonce = useNonce()
  return <div>{nonce}</div>
}

export const ListOfNonces: React.FC<{}> = ({}) => {
  const [count, setCount] = useState(3)

  const arr = []
  for (let i = 0; i < count; i++) {
    arr.push(<NonceComponent key={i} />)
  }
  const addComp = () => {
    setCount(count + 1)
  }

  return <>
    <button onClick={addComp}/>
    {arr}
  </>
}
