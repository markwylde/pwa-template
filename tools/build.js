const util = require('util');
const exec = util.promisify(require('child_process').exec);

const fs = require('fs');

async function build (watch) {
  const esbuild = require('esbuild');

  const define = {
    'process.env.CLIENT_URL': process.env.CLIENT_URL ? '"' + process.env.CLIENT_URL + '"' : undefined,
    'process.env.API_SERVER_URL': process.env.API_SERVER_URL ? '"' + process.env.API_SERVER_URL + '"' : undefined,
    'process.env.CACHE_VERSION': "'cache-v" + Date.now() + "'",
    'process.env.BUILD_DATE': Date.now()
  };

  async function buildJs () {
    const gitLogResponse = await exec('git log --date=format:"%Y/%m/%d" --pretty=format:"%ad%x09%s"');
    const gitLog = gitLogResponse.stdout
      .split('\n')
      .reduce((logs, log) => {
        const logDate = log.substr(0, 10);
        const logMessage = log.substring(logDate.length + 1);
        logs[logDate] = logs[logDate] || [];
        logs[logDate].push(logMessage);
        return logs;
      }, {});

    const result = await esbuild.build({
      jsxFactory: 'm',
      entryPoints: ['./src/js/index.js'],
      bundle: true,
      sourcemap: true,
      metafile: true,
      outfile: './public/index.min.js',
      watch,
      minify: true,
      loader: {
        '.svg': 'dataurl',
        '.gif': 'dataurl',
        '.png': 'dataurl',
        '.js': 'jsx'
      },
      define: {
        ...define,
        'process.env.GIT_LOG': JSON.stringify(gitLog)
      }
    });
    fs.writeFileSync('meta.json', JSON.stringify(result.metafile, null, 2));

    const cacheFiles = require('glob')
      .sync('./public/**/*', { dot: true, nodir: true })
      .map(file => file.replace('./public', ''));

    if (!watch) {
      console.log('service worker will cache', cacheFiles);
    }

    await esbuild.build({
      entryPoints: ['./src/workers/cacheWorker.js'],
      bundle: true,
      sourcemap: true,
      outfile: './public/cache-worker.js',
      watch,
      minify: !watch,
      define: {
        ...define,
        'process.env.CACHE_FILES': "'" + JSON.stringify(cacheFiles) + "'"
      }
    });
  }

  async function buildCss () {
    await esbuild.build({
      entryPoints: ['./src/css/index.css'],
      bundle: true,
      sourcemap: true,
      outfile: './public/style.min.css',
      watch,
      loader: {
        '.svg': 'dataurl',
        '.png': 'dataurl'
      }
    });
  }

  async function buildHtml () {
    let html = await fs.promises.readFile('./src/index.html', 'utf8');

    html = html.replace('{BASE_URL}', process.env.BASE_URL || '/');

    await Promise.all([
      fs.promises.writeFile('./public/index.html', html),
      fs.promises.writeFile('./public/404.html', html)
    ]);
  }

  async function buildManifest () {
    let html = await fs.promises.readFile('./src/manifest.json', 'utf8');

    html = html.replace(/\{BASE_URL\}/g, process.env.BASE_URL || '/');

    await fs.promises.writeFile('./public/manifest.json', html);
  }

  await Promise.all([
    buildCss(),
    buildJs(),
    buildHtml(),
    buildManifest()
  ]);
}

const watch = (process.argv[2] === '-w' || process.argv[2] === '--watch');
build(watch);
