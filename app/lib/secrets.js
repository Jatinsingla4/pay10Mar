import { readFileSync } from 'node:fs';

// Resolves a secret from a file when one is pointed at, and from the environment
// otherwise. Read once, at server start.
//
// The file indirection is how a secrets manager reaches an app on a host without
// the app depending on that vendor's SDK: a boot unit running
// `aws secretsmanager get-secret-value`, a Vault agent template, systemd's
// LoadCredential, or a Docker/Kubernetes secret mount all end up as a path. Point
// BACKEND_AUTH_KEY_FILE at it and nothing else changes — and the value never has
// to sit in the environment, which is readable through /proc/<pid>/environ, gets
// captured in crash dumps, and is inherited by every child process.
//
// Node runtime only. Do not import this from middleware, which runs on the Edge
// runtime and has no filesystem.
export function secret(name) {
  const path = process.env[`${name}_FILE`];
  if (!path) return process.env[name];

  try {
    return readFileSync(path, 'utf8').trim();
  } catch (err) {
    // A path that was configured but can't be read is a deployment fault. Falling
    // back to the environment here would quietly run on an absent or stale secret,
    // which for the reCAPTCHA key means running with bot protection disabled.
    throw new Error(`${name}_FILE points at ${path} but it could not be read: ${err.message}`);
  }
}
