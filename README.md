
# useNonce(prefix: string = '')

useNonce() is a React hook for providing deterministic random strings.

*Do not use useNonce() in any situation where you need unguessable or
cyptographically strong random values. Just don't do it.*

The main use-case for `useNonce()` is when you need to create a unique id for an
html element that won't collide with any other elements on the page, but you
are using SSR (server side rendering) and you want your page to render
identically on both client and server. Traditional means for doing this
that rely on `Math.random()` or crypto APIs will produce different output
on client and server, which in turn causes strange behavior on the part of
React.

`useNonce()` produces identical output on both client and server, which allows
React to work correctly with SSR.

If you're not doing SSR, then you don't need determinism, but you can still use
this hook as a convenient way to get random strings in a react app.

## Installation:

    $ yarn add usenonce

## Usage:

In your `app.jsx` file (or anywhere that will enclose all uses of `useNonce()`):

    import { NonceProvider } from 'usenonce'

    export default class extends App {
      render() {
        const {props} = this as any
        const {Component, pageProps} = props

        return <NonceProvider>
          <Component {...pageProps} />
        </NonceProvider>
      }
    }

Then, anywhere you need a deterministic nonce:

    import { useNonce } from 'usenonce'

    MyComponent = () => {
      const nonce = useNonce('id-prefix-')
      return <div id={nonce}>
        Hello World
      </div>
    }

This will render:

    <div id="id-prefix-wkt0bhqq2ub">Hello World</div>

The generated nonce should remain stable unless the component's state is reset (e.g. if its `key` prop changes).

That's all!
