import type { BuildOptions } from "esbuild";

import { build, context } from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
import {nodeExternalsPlugin } from "esbuild-node-externals";

const isDev = process.env.NODE_ENV === "development";

const common: BuildOptions = {
  outdir: "dist",
  assetNames: "assets/[name]-[hash]",
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  define: {
    DEBUG: isDev ? "true" : "false",
  },
};

const main: BuildOptions = {
  ...common,
  entryPoints: ["src/main.ts", "src/preload.ts"],
  platform: "node",
  external: ["electron"],
  plugins: [ nodeExternalsPlugin() ]
};

const renderer: BuildOptions = {
  ...common,
  entryPoints: ["src/web/index.tsx"],
  platform: "node",
  metafile: true,
  loader: {
    ".png": "file",
    ".svg": "file",
    ".node": "file"
  },
  plugins: [
    nodeExternalsPlugin(),
    sassPlugin(),
    htmlPlugin({
      files: [
        {
          entryPoints: ["src/web/index.tsx"],
          filename: "index.html",
          htmlTemplate: "src/web/index.ejs",
        },
      ],
    }),
  ],
};

const watch = async () => {
  const mainCtx = await context({ ...main });
  const rendererCtx = await context({ ...renderer });
  await mainCtx.watch();
  await rendererCtx.watch();
};

const prod = async () => {
  await build({ ...main });
  await build({ ...renderer });
};

isDev ? watch() : prod();
