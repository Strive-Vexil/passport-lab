import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await getUserByEmailIdAndPassword(email, password);

      if (!user) {
        return done(null, false, {
          message: `Couldn't find user with email: ${email}`,
        });
      }
      return done(null, user);
    } catch (err) {
      const msg = err && typeof (err as any).message === "string"
      ? (err as any).message
      : "Login failed";
      return done(null, false, { message: msg });
    }
  }
);

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: any, done: any) {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getUserById(id);
    if (user) 
      return done(null, user);
    return done({ message: "User not found" }, null);
  } catch (err) {
    return done(err, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
