
# shell代码片段



```sh

handle_a()
{
    echo aaaaa：$@
}

handle_b()
{
    echo bbbbb：$@
}

handle_c()
{
    echo ccccc：$@
}

case $1 in
    aaaaa)

    handle_a $2 $3;;
    
    bbbbb)
    shift
    handle_b $@;;
    
    ccccc)
    
    handle_c;;
    
    *);;
esac
```

```sh
# shell.sh -a a_opt -b b_opt -c

while test -n "$1"
do
    case "$1" in
            -a) 
                param=$2
                shift
                ;;
            -b)
                param=$2
                shift
                ;;
            -c)
                ;;
            *)
                ;;
    esac
    
    shift
done

```