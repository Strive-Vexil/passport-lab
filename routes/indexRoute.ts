import express from "express";
const router = express.Router();
import { ensureAuthenticated, checkAdmin, getAllSessions } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", checkAdmin, async (req, res) => {
  const sessions = await getAllSessions(req);
  res.render("admin", { user: req.user, sessions });
});

router.post("/admin/revoke/:sessionId", checkAdmin, (req, res) => {
  const { sessionId } = req.params;
  (req.sessionStore as any).destroy(sessionId, (err: any) => {
    if (err) {
      console.error("Revoke error:", err);
      return res.status(500).send("Error revoking session");
    }
    res.redirect("/admin");
  }); 
});


export default router;
