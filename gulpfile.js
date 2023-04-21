const gulp = require("gulp"),
    swc = require("gulp-swc"),
    swcOptions = require("./swcrc.json");

gulp.task("compile", function() {
    return gulp.src("src/**/*.ts").pipe(swc(swcOptions)).pipe(gulp.dest("build"));
});

gulp.task("init", function() {
    return gulp.src(`include/**/*`).pipe(gulp.dest(`build/`));
});

gulp.task("build", gulp.series("compile", "init"));