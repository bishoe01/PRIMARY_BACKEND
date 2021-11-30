const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const m = require("../models/init-models");
const sequelize = require("../models").sequelize;
const models = m(sequelize);
const UserModel = models.User;
const AdminModel = models.Admin;

// connect-flash

module.exports = () => {
  passport.use(
    "userlocal",
    new LocalStrategy(
      { usernameField: "login_id", passwordField: "password" },
      async (login_id, password, done) => {
        try {
          const user = await UserModel.findOne({
            where: { login_id: login_id },
          });
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
        try {
          const { user, type } = payload;
          console.log(type);
          if (type === "user") {
            const foundUser = await UserModel.findOne({
              where: { login_id: user.login_id },
            });
            return done(null, foundUser);
          } else if (type === "employee") {
            const foundAdmin = await AdminModel.findOne({
              where: { login_id: user.login_id },
            });
            return done(null, foundAdmin);
          } else {
            return done(null, false, { message: "invalid token!!" });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "employeelocal",
    new LocalStrategy(
      { usernameField: "login_id", passwordField: "password" },
      async (login_id, password, done) => {
        try {
          const user = await AdminModel.findOne({
            where: { login_id: login_id },
          });
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

  // use if jwt strategy should be divided
  // passport.use(
  //   "employeejwt",
  //   new JwtStrategy(
  //     {
  //       jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: "secret",
  //     },
  //     async (payload, done) => {
  //       try {
  //         const foundEmployee = await AdminModel.findOne({
  //           where: { login_id: payload.user.login_id },
  //         });
  //         return done(null, foundEmployee);
  //       } catch (error) {
  //         done(error);
  //       }
  //     }
  //   )
  // );
};
