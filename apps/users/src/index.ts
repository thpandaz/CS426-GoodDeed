import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();
app.use(express.json());

// Retry logic for registry
async function registerWithRetry(name: string, url: string, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`${REGISTRY_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      log.info("Registered with registry");
      return;
    } catch (err) {
      log.warn(
        `Failed to register (attempt ${i + 1}): ${(err as Error).message}`,
      );
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error("Could not register with registry. Exiting.");
  process.exit(1);
}

async function lookupService(name: string): Promise<string | null> {
  try {
    const res = await fetch(`${REGISTRY_URL}/lookup?name=${name}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { url } = await res.json();
    return url;
  } catch (err) {
    log.error(`Lookup failed for ${name}: ${(err as Error).message}`);
    return null;
  }
}

app.post("/", async (req: Request, res: Response) => {
  const serviceCUrl = await lookupService("service-c");
  if (!serviceCUrl) return res.status(502).send("Could not resolve service-c");

  try {
    const cResponse = await fetch(serviceCUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "users", message: req.body.message }),
    });

    log.info(cResponse);

    const cData = await cResponse.json();

    const response = {
      from: "users",
      originalMessage: req.body.message,
      serviceCResponse: cData,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (err) {
    log.error(`Error contacting service-c: ${(err as Error).message}`);
    res.status(500).send("Error contacting service-c");
  }
});

app.listen(PORT, () => {
  log.info(`Users service listening on port ${PORT}`);
  registerWithRetry("users", `http://users:${PORT}`);
});
