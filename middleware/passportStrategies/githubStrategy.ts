import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request, Response, NextFunction } from 'express';
import { Profile } from 'passport-github2';
require("dotenv").config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user?: any) => void
  ) => {
    try {

      const user = { id: profile.id, name: profile.displayName, email: profile.emails?.[0].value };
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
