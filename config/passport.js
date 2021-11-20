const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const UserModel = models.User;

// connect-flash
module.exports = () => {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ where: { email: email } });
          if (!user) {
            return done(null, false, { message: "user not found" });
          }
          if (user.password === password) {
            return done(null, user, { message: "user found" });
          } else {
            return done(null, false, { message: "password incorrect" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
      },
      async (payload, done) => {
        const foundUser = await UserModel.findOne({
          where: { email: payload.email },
        });
        return done(null, foundUser);
      }
    )
  );
};
