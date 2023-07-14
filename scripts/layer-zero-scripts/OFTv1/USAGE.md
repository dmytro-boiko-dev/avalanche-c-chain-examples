step 0: deploy token OR use existing  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/deployToken.ts --network fuji`    
Token deployed to: 0xced36041886289cEcE85197991938DCD991427ad    

step 1: deploy Proxy  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/deployProxy.ts --network fuji`    
Proxy deployed to: 0x4787d1aC53751E32f8BF1bAA719Bcb5e78e7c226  

step 2: deploy OFT token on destination chain  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/deployTokenOFT.ts --network goerli`    
TokenOFT deployed to: 0x000265857A8A73272F44D484BD95648E2C4A0cf8  

step 3: set trusted remote on SOURCE chain (Fuji)  
docs: https://layerzero.gitbook.io/docs/evm-guides/master/set-trusted-remotes  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/setTrustedRemoteOnSource.ts --network goerli`    
tx: 0x436f45fad8558e37fcf837ea5f087f274fbf105eea7ad7c28bbe3311746e0995  

step 4: set trusted remote on DESTINATION chain (Goerli)  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/setTrustedRemoteOnDestination.ts --network goerli`  
0x6173fd2a896861f9dbcdfee2e4a91bb029b432e4fea0d9729cf65e0887184c93  

step 5: approve Proxy to use ERC20 token  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/approveProxy.ts --network fuji`  
0x0bf3c9a67997c6ca565386802589207f0c03a28eee0a97a84adc2250829e639f

step 6: transfer approved amount of tokens from SOURCE chain to DESTINATION chain  
`$ npx hardhat run scripts/layer-zero-scripts/OFTv1/sendTokens.ts --network fuji`  
0x80005667d63143bb4f7a16c7802862c944ed57739516d0c4fd303025fad431c6  

step 7: check balances on both chains  