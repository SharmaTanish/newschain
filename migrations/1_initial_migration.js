const Migrations = artifacts.require("Migrations"); // artifacts --> etherium blockchain engine that store all records permanent

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
