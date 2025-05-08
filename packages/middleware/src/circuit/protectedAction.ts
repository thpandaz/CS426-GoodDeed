import { Request, Response, NextFunction } from 'express';

export function protectedExpressAction(req: Request, res: Response, next: NextFunction): Promise<void> {
  return new Promise((resolve, reject) => {
    let finished = false;

    function cleanup() {
      res.removeListener('finish', onFinish);
      res.removeListener('error', onError);
      res.removeListener('close', onClose);
    }

    function onFinish() {
      if (!finished) {
        finished = true;
        cleanup();
        if (res.statusCode >= 400) {
          reject(new Error(`Status ${res.statusCode}`));
        } else {
          resolve();
        }
      }
    }

    function onError(err: Error) {
      if (!finished) {
        finished = true;
        cleanup();
        reject(err);
      }
    }

    function onClose() {
      if (!finished && !res.writableEnded) {
        finished = true;
        cleanup();
        reject(new Error('Connection closed before finish'));
      }
    }

    res.once('finish', onFinish);
    res.once('error', onError);
    res.once('close', onClose);

    // proceed to next middleware / handler
    next();
  });
}