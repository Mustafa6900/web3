
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async(taskArgs,hre)=> {
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts){
     console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/4hQulIRDiyjB75ClZZlF08wP3F7hxup3",
      accounts:["dc58fe9143a8f6baf36ca0666a0294cc5737f486deac5ebbf45cb4fee9845ab4"],
    }
  }
};
