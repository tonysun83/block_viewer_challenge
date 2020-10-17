// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  // Initialise the provider to connect to the remote polkadot node
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });
  
  const chain = await api.rpc.system.chain();
  const next_block = await api.rpc.chain.getBlock();

  console.log(`BlockChain Info: ${chain}`)
  console.log(`Latest Block Info: ${next_block}`)
}

main().catch(console.error).finally(() => process.exit());