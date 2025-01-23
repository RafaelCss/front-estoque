const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path"); // Adicione esta linha para importar o módulo 'path'

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "front-estoque";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // Modify the webpack config however you'd like by adding to this object
    output: {
      path: path.resolve(process.cwd(), "dist"), // Resolve o caminho corretamente
      filename: "[name].js",
      publicPath: webpackConfigEnv && webpackConfigEnv.isLocal
        ? "/"
        : "https://root-config.vercel.app/", // Alterar para o domínio final
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};