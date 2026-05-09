import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticRouter,
  StaticRouterProvider,
  createStaticHandler,
} from "react-router";
import { routes } from "./router";
import type { Request as ExpressRequest } from "express";

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes);

  /**
   * FIX: Reconstruct the full absolute URL.
   * Node's native Request object (undici) requires a full URL including protocol and host.
   */
  const protocol = req.protocol || "http";
  const host = req.get("host") || "localhost";
  const url = new URL(req.originalUrl || req.url, `${protocol}://${host}`);

  // Create the Fetch Request object required by React Router's static handler
  const fetchRequest = new Request(url.href, {
    method: req.method,
    headers: req.headers as HeadersInit,
    // Optional: Pass the body if you plan to use React Router Actions (POST/PUT)
    body: ["POST", "PUT", "PATCH", "DELETE"].includes(req.method) 
      ? JSON.stringify(req.body) 
      : null,
  });

  const context = await query(fetchRequest);

  // If the router produces a redirect response (e.g. from a loader)
  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const html = renderToString(
    <StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </StrictMode>
  );

  return { html };
}