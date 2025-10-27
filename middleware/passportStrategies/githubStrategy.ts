import { Strategy as GitHubStrategy } from "passport-github2";
import { Profile } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";
import fs from "node:fs/promises";
import dotenv from "dotenv";

dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (_req: Request, _accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => 
    {
    try {
      
      let data: Express.User[];
      try {
        const file = await fs.readFile("database.json", "utf8");
        data = JSON.parse(file);
      } catch {
        data = [];
      }

      let user = data.find((account: Express.User) => account.id === `${profile.id}-github`);
      
      if (!user) {
        const newUser: Express.User = {
          id: `${profile.id}-github`,
          name: profile.displayName || profile.username || "GitHub User",
          email: profile.emails?.[0]?.value, 
          role: "user",
        };

        data.push(newUser);
        await fs.writeFile("database.json", JSON.stringify(data, null, 2), "utf8");

        user = newUser;
      }

      // Pass user to Passport
      return done(null, user);
    } catch (err) {
      return done(err as Error);
    }
  }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
