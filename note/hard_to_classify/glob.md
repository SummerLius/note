## 介绍

[glob](https://en.wikipedia.org/wiki/Glob_(programming))(global command)最早出现在类Unix系统命令行中，用来匹配文件路劲，例如lib/**/*.js匹配lib目录下所有js文件。  

处理命令行中，这一功能也会出现在许多程序中，很多编程语言也有了对glob的实现，例如nodejs库[node-glob](https://github.com/isaacs/node-glob)，[gulp](http://www.gulpjs.com.cn/docs/api/)中文件匹配便依赖于此库，还有Git下的.gitignore文件也是glob匹配。

## 匹配语法

不同的场景不同的库实现的匹配规则会略有不同，但是显而易见规则基本上和**正则表达式**相近

### node-glob

- `*` 匹配[0, +∞)个字符
- `?` 匹配1个字符
- `[xxx]` 匹配[]里面的1个字符。和正则表达式中的中括号表达式类似，如果里面第一个字符为`!`或`^`，则表示匹配非[]里面任何字符
- `!(pattern|pattern|pattern)`，不满足()里面任意一个pattern则匹配
- `?(pattern|pattern|pattern)`，满足[0, 1]个
- `+(pattern|pattern|pattern)`，满足[1, +∞)个
- `*(pattern|pattern|pattern)`，满足[0, +∞)个
- `@(pattern|pat*|pat?erN)`，仅满足其中1个
- `**`，跨路径匹配，匹配[0, +∞)个目录或子目录，不会匹配链接目录(目录的快捷方式)，例如lib/**/*.js，匹配lib目录下所有js文件
- 更多详细见[node-glob](https://github.com/isaacs/node-glob)

## .gitignore

.gitignore文件作用为，指定工作目录中Git需要忽略的文件或目录，即不纳入Git仓库中，如果文件已经纳入仓库，则.gitignore不会对此再生效了。

在gitignore文件中的每一行指定一个模式(pattern)

- 一行一个模式(pattern)

- 空行不匹配文件，所以空行可以作为pattern之间的分隔符，提高阅读性

- 一行首字符为`#`，表示此行为注释

- 以`!`开头的pattern表示反模式，会将之前忽略的文件重新纳入Git仓库。但是匹配到的文件，其父目录处理忽略状态，则反模式不会生效。`\!`转义字符表示仅作为字符，不作为反模式关键字。

```
# 忽略项目下所有.js文件
*.js

# 除了名为app.js的文件
!app.js
```

- 以斜杠`/`结尾，则只会匹配目录，例如`foo/`只会匹配foo目录，不会匹配文件和快捷方式目录或文件

- 如果pattern头部和中部不含`/`，则Git把pattern作为一个shell glob pattern，pattern会匹配项目根目录及其所有子目录下的文件名

- 如果pattern头部和中部含有`/`，pattern只会从项目根目录路径开始匹配，即gitignore所在目录，不会进入各个子目录所在路径开始匹配，通配符也不会匹配斜杠"/"字符，即通配符不会跨层级目录。

>Git treats the pattern as a shell glob suitable for consumption by fnmatch(3) with the FNM_PATHNAME flag:wildcards in the pattern will not match a / in the pathname

```
# ✕ doc/app.js 
# ✓ temp/doc/app.js
doc/*.js

# ✕ doc/app.js
# ✓ app.js
/*.js
```

- 两个连续星号
    - `**/`开头，会在跨路径，在所有目录下匹配，例如“**/foo”会匹配所有目录下的foo文件或目录
    - `/**`结尾，匹配里面的所有文件或目录，例如“abc/**”，匹配目录abc下所有文件，abc目录相对于gitignore文件
    - `a/**/b`，中间匹配[0, +∞)个目录，例如，“a/b”，“a/x/b”,“a/x/y/b”
    - 除了上面3种**用法，其它用法视为无效

## unix shell glob

**gitignore依赖于shell glob规则，其中文件名便依据此匹配**  

- 通配符匹配
    - `?` 匹配任何一个字符
    - `*` 匹配[0, +∞)个字符
    - `[...]`
        - 字符组：匹配其中的任意一个字符，里面不能为空，因此"]"字符可以作为第一个字符放在里面。例如，"[][!]"匹配"["，"]"，"!"
        - 范围：以"-"分隔的两个字符表示范围，如果欲将'-'作为普通字符，则应将其放置在[]里面的第一位或最后一位
        - 互补：`[!...]`表示不满足里面任何一个字符则匹配
- 路径名： 其中的斜杠"/"不会被"?"，"*"通配符所匹配；如果文件名包含"."符号，则此符号必须明确匹配，例如 "rm *" 不会删除".profile"文件

>Globbing is applied on each of the components of a pathname separately.  A '/' in a pathname cannot be matched by a '?' or '*' wildcard, or by a range like "[.-0]".  A range containing an explicit '/' character is syntactically incorrect.  (POSIX requires that syntactically incorrect patterns are left unchanged.) If a filename starts with a '.', this character must be matched explicitly.  (Thus, rm * will not remove .profile, and tar c * will not archive all your files; tar c . is better.)
- 详细见[glob(7)](http://man7.org/linux/man-pages/man7/glob.7.html)
