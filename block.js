// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  // Initialise the provider to connect to the remote polkadot node
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // get command line arguments
  const args = process.argv.slice(2);

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });
  const chain = await api.rpc.system.chain();

  console.log(`Command Line Argument: ${args}`)
  console.log(`BlockChain Info: ${chain}`)

  if(args.length === 0) {
    await getNextBlock(api);
  }
  else if(args.length === 1) {
    const search_arg = args[0];
    if(/^0x/.test(search_arg)) {
      await searchHash(api, search_arg);
    }
    else {
      await searchBlockNumber(api, search_arg);
    }
  }
}

main().catch(console.error).finally(() => process.exit());


async function getNextBlock(api) {
    const response_content = await api.rpc.chain.getBlock();
    console.log(`Latest block information: ${response_content}`)
}

async function searchBlockNumber(api, blockNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    const block = await api.rpc.chain.getBlock(blockHash);
    console.log(`Block ${blockNumber} info: ${block}`);
}

async function searchHash(api, blockHash) {
    const block = await api.rpc.chain.getBlock(blockHash);
    console.log(`Block ${blockHash} info: ${block}`);
}