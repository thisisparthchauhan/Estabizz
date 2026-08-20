# Estabizz Jobs AI Service

Foundation-only FastAPI service for future Estabizz Jobs AI workflows.

Implemented now:

- `GET /health`
- `GET /internal/health` protected by `x-estabizz-service-secret`
- environment-backed configuration
- internal service-secret authentication helper for future Next.js to FastAPI calls
- health endpoint tests

Not implemented yet:

- resume parsing
- LLM integration
- embeddings
- candidate matching
- OCR
- production AI processing

## Local Development

```bash
cd services/jobs-ai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
pytest
```

Health check:

```bash
curl http://127.0.0.1:8010/health
```

Internal health check:

```bash
curl -H "x-estabizz-service-secret: <local-secret>" http://127.0.0.1:8010/internal/health
```

Do not place real secrets in `.env.example`.
