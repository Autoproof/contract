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

To send a transaction, change the contents of the `sources/message.json` and run `yarn send`.

## License

MIT
