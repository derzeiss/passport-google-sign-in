import { NextFunction, Request, Response } from 'express';

type EnsureLoggedInOptions = {
  redirectTo: string;
  setReturnTo: boolean;
};

export const ensureLoggedIn = (options: string | Partial<EnsureLoggedInOptions>) => {
  let config: EnsureLoggedInOptions = {
    redirectTo: '/login',
    setReturnTo: true,
  };

  if (typeof options === 'string') config.redirectTo = options;
  else config = { ...config, ...options };

  return (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated && req.isAuthenticated()) return next();

    const session_typed = req.session as unknown as Record<string, unknown>;
    if (config.setReturnTo && req.session) session_typed.returnTo = req.originalUrl || req.url;
    res.redirect(config.redirectTo);
  };
};
