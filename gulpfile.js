const gulp = require("gulp"),
    clean = require("gulp-clean"),
    swc = require("gulp-swc"),
    swcOptions = require("./swcrc.json");

gulp.task("compile", function() {
    return gulp.src("src/**/*.ts").pipe(swc(swcOptions)).pipe(gulp.dest("build"));
});

gulp.task("init", function() {
    return gulp.src(`include/**/*`).pipe(gulp.dest(`build/`));
});

gulp.task("clean", function() {
    return gulp.src("build", { read: false }).pipe(clean());
});

gulp.task("build", gulp.series("clean", "compile", "init"));