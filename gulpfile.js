const
    gulp = require("gulp"),
    clean = require('gulp-clean'),
    swc = require("gulp-swc"),
    exec = require('gulp-exec');


const swcOptions = {
    "jsc": {
        "target": "es2020",
        "parser": {
            "syntax": "typescript",
            "decorators": true,
            "dynamicImport": true
        },
        "transform": {
            "decoratorMetadata": true,
            "legacyDecorator": true
        },
        "keepClassNames": true,
        "externalHelpers": true,
        "loose": false
    },
    "module": {
        "type": "es6",
        "strict": true,
        "noInterop": true
    },
    "exclude": ["./src/**/.*.spec.ts$", "./**/.*.js$"],
    "sourceMaps": true,
    "isModule": true,
}

gulp.task('compile', function() {
    return gulp.src('src/**/*.ts').pipe(swc(swcOptions)).pipe(gulp.dest('build'));
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