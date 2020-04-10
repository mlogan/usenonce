
import React, { ReactNode, createContext, useContext, useState } from 'react'

import Alea from 'alea'

type AleaType = ReturnType<typeof Alea>

export class NonceGenerator {
  _rng: AleaType
  constructor (seed: string) {
    // @ts-ignore
    this._rng = new Alea(seed)
  }

  next (): string {
    return this._rng().toString(36).substring(2, 15)
  }
}

export const NonceGeneratorCtx = createContext<NonceGenerator | null>(null)

export const NonceProvider: React.FC<{
  children: ReactNode,
  seed?: string
}> = ({children, seed = 'default seed'}) => {

  const generator = new NonceGenerator(seed)
  return <NonceGeneratorCtx.Provider value={generator}>
    {children}
  </NonceGeneratorCtx.Provider>
}

export const useNonce = (prefix: string = '') => {

  const nonceGenerator = useContext(NonceGeneratorCtx)

  if (nonceGenerator == null) {
    throw new Error("useNonce() must be called from within <NonceProvider>")
  }

  const [nonce] = useState(() => {
    return nonceGenerator.next()
  })

  return prefix + nonce
}
