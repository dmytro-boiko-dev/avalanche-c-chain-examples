0. deploy LZ token to Fuji  
`$ npx hardhat run scripts/layer-zero-scripts/deployCrossChainToken.ts --network fuji`  
lzContract deployed to: 0xb4b4034DFAf33e0dD7d791d63b1ADBeC369289A9  

1. deploy CCT to Goerli  
`$ npx hardhat run scripts/layer-zero-scripts/deployCrossChainToken.ts --network goerli`  
lzContract deployed to: 0xB1154E693AD240F8cFf2dB3057A1AF703E88ac96  

2. trust Goerli contract to Fuji  
3. trust Fuji contract to Goerli  
4. transfer tokens from Goerli to Fuji  
5. transfer tokens from Fuji to Goerli  