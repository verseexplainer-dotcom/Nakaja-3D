# Nakaja Meta Integration Skill

## Purpose

Guide safe integration of Messenger, WhatsApp click-to-chat, and Meta webhook foundations.

## Scope

- Messenger m.me deep links
- WhatsApp click-to-chat links
- Cloudflare Pages Functions webhook endpoints
- Server-side token handling only

## Security Rules

- Never expose `WHATSAPP_ACCESS_TOKEN` client-side.
- Verify webhook payload signatures where applicable.
- Store verify/app secrets in environment bindings only.

## Endpoint Guidance

Suggested function responsibilities:
- `meta-webhook.ts`: verification + inbound event handling
- `whatsapp-send.ts`: server-side outbound messaging orchestration

## Logging Rules

- Log minimal metadata for debugging.
- Avoid logging PII-rich message content where not necessary.
- Correlate events with internal lead IDs when possible.

## Operational Rule

New Astro integration must be validated in preview first.
Do not interfere with old live-stack Meta integrations.
