import WalletConnectProvider from '@walletconnect/web3-provider'
export const provider = new WalletConnectProvider({
  infuraId: '8570afa4d18b4c5d9cb3a629b08de069',
  rpc: {
    97: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
    56: 'https://bsc-dataseed.binance.org/',
  },
})
