import { Router, Request, Response } from "express";
import axios from "axios";

export const createProxyRoutes = (getInstances: (name: string) => string[]): Router => {
  const router = Router();

  router.all("/:service/*", async (req: Request, res: Response) => {
    const serviceName = req.params.service;
    const instances = getInstances(serviceName);
    if (instances.length === 0) {
      return res.status(502).send("No instances available");
    }

    // simple round-robin selection
    const targetUrl = instances[Math.floor(Math.random() * instances.length)];
    const url = `${targetUrl}/${req.params[0]}`;

    try {
      const proxied = await axios({
        method: req.method as any,
        url,
        data: req.body,
        headers: { ...req.headers, host: undefined },
        params: req.query,
        responseType: "stream",
      });
      proxied.data.pipe(res);
    } catch (err: any) {
      res.status(err.response?.status || 500).send(err.message);
    }
  });

  return router;
};
