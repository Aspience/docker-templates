FROM rust:1-slim as builder

RUN apt-get update && apt-get install -y pkg-config libssl-dev

RUN cargo install figma-mcp

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y libssl3 curl && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/cargo/bin/figma-mcp /usr/local/bin/figma-mcp

ENTRYPOINT ["figma-mcp"]