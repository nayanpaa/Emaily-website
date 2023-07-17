const { createProxyMiddleware } = require("http-proxy-middleware");

//anytime we change this file we have to restart the server
//do not add the proxy configuration to the package.json file
//do not add changeOrigin: TRUE
//this allows a chnage in navigation despite the different prod and dev servers
  //this allows us to use relative links and change the domain depending on the prod and dev

//do i need ti change the uri mismatch: episode 68/
//prxy is only used in the dev environment
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
