const babel = require("gulp-babel"),
    gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    clean = require('gulp-clean'),
    exec = require('gulp-exec');
typescript = require("gulp-typescript");

gulp.task('compile', function() {
    const typeScript = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript({
            target: "es5",
            module: "commonjs",
            declaration: true,
            outDir: './build',
            experimentalDecorators: true,
            resolveJsonModule: true,
            esModuleInterop: true,
            inlineSourceMap: true,
        }));

    return typeScript.js
        .pipe(babel({
            "presets": ["@babel/preset-env", "@babel/preset-typescript"],
            "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
        }))
        .pipe(gulp.dest('build'))
})

gulp.task('init', function() {
    gulp.src(`src/assets/config.json`)
        .pipe(gulp.dest(`build/assets/`));

    return gulp.src(`include/*`)
        .pipe(gulp.dest(`build/`));
})

gulp.task('clean', function() {
    return gulp.src("build", { read: false }).pipe(clean());
})

gulp.task('linkBuild', function() {
    return gulp.src("build").pipe(exec("yarn link")).pipe(exec.reporter());
})

gulp.task('unlinkBuild', function() {
    return gulp.src("build").pipe(exec("yarn unlink")).pipe(exec.reporter());
})

gulp.task('build', gulp.series("clean", "compile", "init"))
gulp.task('link', gulp.series("unlinkBuild", "linkBuild"))