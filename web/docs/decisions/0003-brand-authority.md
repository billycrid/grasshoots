# ADR 0003 — Brand authority and interim artwork

Status: accepted interim treatment; final vectors pending.

The written design spec prohibits eyebrows, while some smaller owl marks on the supplied reference board include them. The higher-priority written rule wins. The large primary wordmark is eyebrow-free and is displayed unchanged through a CSS viewport. No new owl geometry is invented, and the board's speculative product functionality is not copied.

The supplied theme is kept verbatim in the UI package and as a documentation source asset. Source specs are also kept verbatim. Manrope is bundled locally. The future standalone SVG/favicon/PWA export set is deferred until approved artwork is available; this is not an independent logo redesign.

Strongly typed public configuration holds brand, contacts, social handles and URLs. API environment settings override defaults, and a public allowlisted endpoint distributes these values. Changing the support mailbox therefore requires configuration, not component edits. The temporary Gmail is not rendered in this development shell. No settings administration UI is built.
