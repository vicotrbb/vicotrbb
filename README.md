<a href="https://blog.victorbona.dev">
  <img src="assets/banner.svg" width="100%" alt="Victor Bona: Senior Software Engineer, Distributed systems specialist and AI enthusiast">
</a>

<p align="center">
  <a href="https://blog.victorbona.dev"><code>P100 home</code></a>&nbsp;
  <a href="https://blog.victorbona.dev/about"><code>P200 profile</code></a>&nbsp;
  <a href="https://blog.victorbona.dev/projects"><code>P300 systems</code></a>&nbsp;
  <a href="https://blog.victorbona.dev/research"><code>P400 research</code></a>&nbsp;
  <a href="https://blog.victorbona.dev/blog"><code>P500 writing</code></a>&nbsp;
  <a href="https://blog.victorbona.dev/compendium"><code>P600 compendium</code></a>&nbsp;
  <a href="https://blog.victorbona.dev/now"><code>/now</code></a>
</p>

<br>

<img src="assets/h-node.svg" alt="$ describe node/victor-bona">

I build distributed systems and the infrastructure under them, mostly in Rust these days.
Eight years in: Amazon's fintech team in Brazil, first founding engineer at Valari (YC W22),
where I rebuilt the ledger in a week after a provider shut down, then Deel, and now
**Senior Software Engineer at [Hopper](https://hopper.com)**.

On the side I built **Guara Cloud**, a Kubernetes-native PaaS, and sold it. These days the
side work is observability databases, eBPF signal planes, HTTP servers, inference runtimes,
and the papers that come out of measuring them.

<br>

<img src="assets/h-systems.svg" alt="$ get systems --owner victor-bona">

| system | state | what it is |
| :-- | :-- | :-- |
| **[Positron](https://github.com/vicotrbb/positron)** | <img src="assets/s-building.svg" alt="building"> | Observability database for native logs and traces, in Rust. [case study](https://blog.victorbona.dev/projects/positron) |
| **[Maximus](https://github.com/vicotrbb/maximus)** | <img src="assets/s-building.svg" alt="building"> | Modular Rust HTTP server for Linux: one local executor per worker, io_uring and epoll, optional TLS, HTTP/2 and HTTP/3. |
| **[E&#8209;Navigator](https://github.com/guaracloud/e-navigator)** | <img src="assets/s-building.svg" alt="building"> | Rust and eBPF signal plane for Linux and Kubernetes observability, profiling, runtime security and diagnostics. [case study](https://blog.victorbona.dev/projects/e-navigator) |
| **[Ferrite](https://github.com/vicotrbb/ferrite)** | <img src="assets/s-building.svg" alt="building"> | CPU-native LLM inference engine: GGUF models, quantized SIMD kernels, an OpenAI-compatible server. |
| **[Locus](https://github.com/vicotrbb/locus)** | <img src="assets/s-building.svg" alt="building"> | Parameterless chunk-mailbox KV-block pool for CPU LLM serving, published as [`locus-alloc`](https://crates.io/crates/locus-alloc). |
| **[Nidus](https://github.com/vicotrbb/nidus)** | <img src="assets/s-maintained.svg" alt="maintained"> | Modular Rust backend framework with NestJS ergonomics on Axum, Tower and Tokio. [rustnidus.com](https://rustnidus.com) · [case study](https://blog.victorbona.dev/projects/nidus) |
| **[Purple&nbsp;Wolf](https://github.com/guaracloud/purple-wolf)** | <img src="assets/s-maintained.svg" alt="maintained"> | Low-memory WAF for Traefik, shipped as a WASM plugin with signed releases and SBOMs. |
| **[Devboxes](https://github.com/vicotrbb/devboxes)** | <img src="assets/s-maintained.svg" alt="maintained"> | Self-hosted, ephemeral dev environments on Kubernetes: create a box, SSH in, resume the same tmux session. |
| **[Gromaq](https://github.com/vicotrbb/gromaq)** | <img src="assets/s-maintained.svg" alt="maintained"> | GPU-rendered terminal emulator in Rust, with winit, wgpu and real PTYs. [gromaq.dev](https://gromaq.dev) |
| **[Imaginu](https://github.com/vicotrbb/imaginu)** | <img src="assets/s-maintained.svg" alt="maintained"> | AI-drivable procedural 3D asset compiler: JSON recipes in, deterministic game-ready GLB out. |
| **[SQLTemple](https://github.com/vicotrbb/sqltemple)** | <img src="assets/s-maintained.svg" alt="maintained"> | Open-source, AI-powered SQL IDE. [sqltemple.dev](https://sqltemple.dev) |
| **Guara&nbsp;Cloud** | <img src="assets/s-sold.svg" alt="sold"> | Kubernetes-native PaaS with catalog services, billing, observability and backups. Built, run, sold. [case study](https://blog.victorbona.dev/projects/guara-cloud) |

<br>

<img src="assets/h-lab.svg" alt="$ get experiments --namespace lab">

| experiment | what it is |
| :-- | :-- |
| **[Janus](https://github.com/vicotrbb/janus)** | Open-source observatory for autonomous strategic simulations, with inspectable world dynamics and optional LLM policy councils. |
| **[Aerostat](https://github.com/vicotrbb/aerostat)** | Rust drone simulation lab: isolated Rust/C++ flight programs, swarm radio simulation and a 3D interface. |
| **[Botcrew](https://github.com/vicotrbb/botcrew)** | Kubernetes-native deployment orchestrator for autonomous AI agents. |
| **[cache-fill-fences](https://github.com/vicotrbb/cache-fill-fences)** | Lean-verified state minimization for asynchronous cache-fill invalidation. |
| **[capacity-replay](https://github.com/vicotrbb/capacity-replay)** | Lean-verified exact state complexity for capacity-parametric counter replay. |

<details>
<summary><code>$ get systems --all-namespaces</code> &nbsp;older tools and utilities</summary>
<br>

- **[Victor Bona Blog](https://github.com/vicotrbb/victorbona.blog)**: the Next.js and MDX site this profile is styled after.
- **[Agent Skills](https://github.com/guaracloud/agent-skills)**: agent skills for deploying and managing apps on Guara Cloud.
- **[Codebase Guy](https://github.com/vicotrbb/codebase-guy)**: chat with multiple codebases at once.
- **[DataTide](https://github.com/vicotrbb/data-tide-js)**: Node.js library for processing large datasets on worker threads.
- **[SaaS Starter Template](https://github.com/vicotrbb/saas-starter-template)**: Next.js 15, Supabase and Stripe starter.
- **[Oh My GPT](https://github.com/vicotrbb/oh-my-gpt)**: ZSH plugin for talking to ChatGPT from the terminal.
- **[Agent Buddy](https://github.com/vicotrbb/agent-buddy)**: CLI ReAct agent for local terminal work.
- **[Pylexitext](https://github.com/vicotrbb/Pylexitext)**: Python library of NLP and text-analysis utilities.
- **[Data Science](https://github.com/vicotrbb/data_science)**: notes and studies on data science and machine learning.

</details>

<br>

<img src="assets/h-research.svg" alt="$ get papers --sort published">

- `2026-09-29` [Rigidity of Pattern-Avoiding Breadth-First Reading Words of Increasing Trees](https://doi.org/10.5281/zenodo.23042420) · [code](https://github.com/vicotrbb/bfs-avoidance-frontier)
- `2026-09-29` [Trace Sampling at the Collector Boundary: Costs and Diagnostic Evidence](https://doi.org/10.5281/zenodo.23032245) · [code](https://github.com/vicotrbb/trace-sampling-strategies)
- `2026-09-25` [Message Delivery Reliability and Recovery in Redis Streams and NATS JetStream](https://doi.org/10.5281/zenodo.22950140) · [code](https://github.com/vicotrbb/redis-jetstream-reliability)
- `2026-09-08` [Nidus: Explicit Application Composition for Rust Backend Services](https://blog.victorbona.dev/articles/nidus-whitepaper) · [code](https://github.com/vicotrbb/nidus)
- `2026-07-06` [Locus: Owner-Drained Chunk Mailboxes for KV-Block Recycling in CPU LLM Inference](https://blog.victorbona.dev/articles/locus-whitepaper) · [code](https://github.com/vicotrbb/locus)
- `2026-06-07` [Purple Wolf: A Low-Latency Traefik Web Application Firewall and Audit Relay](https://blog.victorbona.dev/articles/purple-wolf-whitepaper) · [code](https://github.com/guaracloud/purple-wolf)
- `2026-06-07` [The Missing HTTP Verb: STRUT](https://blog.victorbona.dev/articles/the-missing-http-verb-strut)

Citations and a reading list live at [blog.victorbona.dev/research](https://blog.victorbona.dev/research).

<br>

<img src="assets/h-writing.svg" alt="$ tail -n 5 /var/log/writing">

<!-- writing:start -->
- `2026-09-08` [A File Can Replace Your Tile Server: The Engineering Behind PMTiles](https://blog.victorbona.dev/blog/a-file-can-replace-your-tile-server)
- `2026-09-08` [Designing Data Pipelines That Stay Within a Memory Budget](https://blog.victorbona.dev/blog/data-pipelines-within-a-memory-budget)
- `2026-09-08` [Fast Spatial Queries Without Losing Correctness](https://blog.victorbona.dev/blog/fast-spatial-queries-without-losing-correctness)
- `2026-09-08` [Stop Reading the Whole Dataset: GeoParquet, Spatial Locality, and Query Pruning](https://blog.victorbona.dev/blog/geoparquet-spatial-locality-and-query-pruning)
- `2026-06-16` [Status Is a Distributed System](https://blog.victorbona.dev/blog/status-is-a-distributed-system)
<!-- writing:end -->

<sub>Refreshed daily from the [RSS feed](https://blog.victorbona.dev/rss). Everything else, including a 150-note engineering compendium, is on [the blog](https://blog.victorbona.dev).</sub>

<br>

<img src="assets/h-connect.svg" alt="$ connect --to victor-bona">

`web` [blog.victorbona.dev](https://blog.victorbona.dev) &nbsp;·&nbsp;
`linkedin` [in/victorbona](https://www.linkedin.com/in/victorbona/) &nbsp;·&nbsp;
`x` [@BonaVictor](https://x.com/BonaVictor) &nbsp;·&nbsp;
`email` [victor.bona@hotmail.com](mailto:victor.bona@hotmail.com)

<br>

<a href="https://blog.victorbona.dev">
  <img src="assets/footer.svg" width="100%" alt="exit: connection kept open at blog.victorbona.dev">
</a>
