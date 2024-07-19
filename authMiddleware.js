var jwt = require("./lib/jwt");

module.exports = {
  isUserAuthenticated: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({
        status: 403,
        message: "FORBIDDEN"
      });
    } else {
      const token = authHeader;

      if (token) {
        jwt
          .verify(token)
          .then(() => {
            return jwt
              .decode(token)
              .then(decodedStore => {
                // ------------------------------------
                // HI I'M THE UPDATED CODE BLOCK, LOOK AT ME
                // ------------------------------------
                console.log("decodedStore : " + JSON.stringify(decodedStore));
                const { username, user_id } = decodedStore;

                res.locals.auth = {
                  username,
                  user_id
                };
                next();
              })
              .catch(err => {
                console.log(err);

                return res.status(401).json({
                  status: 401,
                  message: "UNAUTHORIZED"
                });
              });
          })
          .catch(err => {
            return res.status(401).json({
              status: 401,
              message: "UNAUTHORIZED"
            });
          });
        // else {
        //   return res.status(401).json({
        //     status: 401,
        //     message: 'UNAUTHORIZED'
        //   })
        // }
      } else {
        return res.status(403).json({
          status: 403,
          message: "FORBIDDEN"
        });
      }
    }
  },

  isAdminAuthenticated: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({
        status: 403,
        message: "FORBIDDEN"
      });
    } else {
      const token = authHeader;

      if (token) {
        jwt
          .verify(token)
          .then(() => {
            return jwt
              .decode(token)
              .then(decodedStore => {
                // ------------------------------------
                // HI I'M THE UPDATED CODE BLOCK, LOOK AT ME
                // ------------------------------------
                console.log("decodedStore : " + JSON.stringify(decodedStore));
                const { username, user_id } = decodedStore;

                res.locals.auth = {
                  username,
                  user_id
                };

                if(username != 'admin'){
                  return res.status(401).json({
                    status: 401,
                    message: "UNAUTHORIZED"
                  });
                }else{
                  next();
                }
              })
              .catch(err => {
                console.log(err);

                return res.status(401).json({
                  status: 401,
                  message: "UNAUTHORIZED"
                });
              });
          })
          .catch(err => {
            return res.status(401).json({
              status: 401,
              message: "UNAUTHORIZED"
            });
          });
        // else {
        //   return res.status(401).json({
        //     status: 401,
        //     message: 'UNAUTHORIZED'
        //   })
        // }
      } else {
        return res.status(403).json({
          status: 403,
          message: "FORBIDDEN"
        });
      }
    }
  }
};


