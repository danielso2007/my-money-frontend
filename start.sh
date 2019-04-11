#!/bin/bash
echo "$1"
fn_desenvolvimento() {
    echo "Executando como Desenvolvimento..."
    yarn run dev

}
fn_producao() {
    echo "Executando como Produção..."
    yarn run prod

}
case "$1" in
    dev|DEV|"")
        fn_desenvolvimento
    ;;
    prod|PROD)
        fn_producao
    ;;
    *)
       fn_desenvolvimento
    ;;
esac