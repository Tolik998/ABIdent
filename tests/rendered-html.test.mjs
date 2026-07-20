import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders ABI Dent landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /ABI Dent/);
  assert.match(html, /Стоматология премиум-класса/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /77474906985/);
  assert.doesNotMatch(html, /Your site is taking shape/);
});

test("server-renders Kazakh locale", async () => {
  const response = await render("/kk");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Премиум-класс стоматологиясы/);
  assert.match(html, /Қызметтер/);
});
