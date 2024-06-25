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
cp sources/message.json.example sources/message.json
# change the contents of the `sources/message.json`
yarn send
```

## License

MIT
