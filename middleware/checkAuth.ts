import { Request, Response, NextFunction } from 'express';
/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}
/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

export async function getAllSessions(
  req: Request
): Promise<Array<{ sessionId: string; userId: string | number | undefined }>> {
  const store: any = req.sessionStore;

  return new Promise((resolve, reject) => {
    if (typeof store.all !== "function") {
      
      return resolve([]);
    }

    store.all((err: any, sessions: Record<string, any> | any[]) => {
      if (err) return reject(err);

      let entries: [string, any][] = [];

      if (Array.isArray(sessions)) {
        for (let i = 0; i < sessions.length; i++) {
          const sess = sessions[i];
          const id = typeof sess?.id === "string" ? sess.id : String(i);
          entries.push([id, sess]);
        }
      } else {
        entries = Object.entries(sessions || {});
      }

      const list: { sessionId: string; userId: string | number | undefined }[] = [];

      for (const [sid, sess] of entries) {
        const userId = sess?.passport?.user;
        list.push({ sessionId: sid, userId });
      }

      resolve(list);
    });
  });
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = (req.user as any)?.role;
  if (req.isAuthenticated && req.isAuthenticated() && role === "admin") return next();
  res.status(403).send("Access Denied: Admins only");
}