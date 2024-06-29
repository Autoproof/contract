## autoproof contract

Setup the env first:

```shell
cp setup.sh.example setup.sh
source setup.sh
```

and then run:

```shell
yarn test # To test contract
yarn build # To build contract
yarn deploy # To deploy contract
```

To send a transaction:

```shell
cp sources/declaration.json.example sources/declaration.json
# change the contents of the `sources/declaration.json`
yarn send-declaration-tx
```

## License

MIT
