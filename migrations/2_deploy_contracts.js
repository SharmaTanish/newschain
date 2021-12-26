const DVideo = artifacts.require("DVideo");
// to migrate/put smart contracts on blockchain
module.exports = function(deployer) {
  deployer.deploy(DVideo);
};
