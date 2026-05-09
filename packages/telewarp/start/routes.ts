/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { createServer as createViteServer } from 'vite'

/**
 * Vite Singleton for Development SSR
 */
let vite: any
async function getVite() {
  if (!vite) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
  }
  return vite
}

/**
 * Hardcoded HTML Template
 */
const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"><!--ssr-outlet--></div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>
`

/**
 * API Routes (v1)
 */
router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

/**
 * SSR Catch-all Route
 * Matches everything except /api routes
 */
router.get('*', async (ctx) => {
  const { request, response } = ctx
  const url = request.url(true)

  try {
    const viteInstance = await getVite()

    // 2. Transform the HTML (Handles Vite client injection)
    let html = await viteInstance.transformIndexHtml(url, HTML_TEMPLATE)

    // 3. Load the SSR module
    // Using absolute path via import.meta.resolve for stability
    const { render } = await viteInstance.ssrLoadModule('telewarp-front')

    // 4. Render React
    // We pass a shimmed object to satisfy your entry-server.tsx req.get() calls
    const { html: appHtml } = await render({
      url: url,
      protocol: request.protocol(),
      headers: request.headers(),
      get: (key: string) => request.header(key),
    })

    // 5. Final output
    html = html.replace('<!--ssr-outlet-->', appHtml)
    return response.header('Content-Type', 'text/html').send(html)
  } catch (e: any) {
    if (vite) vite.ssrFixStacktrace(e)
    console.error('SSR Error:', e.stack)
    return response.status(500).send(e.stack)
  }
})
