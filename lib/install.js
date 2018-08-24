'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

(async () => {
	await bin.run(['--version'])
		.catch((err) => {
			log.warn(err.message);
			log.warn('optipng pre-build test failed');
			log.info('compiling from source');

			const cfg = [
				'./configure --with-system-zlib',
				`--prefix="${bin.dest()}" --bindir="${bin.dest()}"`
			].join(' ');

			binBuild.url('https://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.7/optipng-0.7.7.tar.gz', [
				cfg,
				'make install'
			])
				.then(() => {
					log.success('optipng built successfully');
				})
				.catch(err => {
					log.error(err.stack);

					// eslint-disable-next-line unicorn/no-process-exit
					process.exit(1);
				});
		});

		log.success('optipng pre-build test passed successfully');
})();
