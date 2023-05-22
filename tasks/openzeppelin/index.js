const ERC20 = require('./deploy_ERC20_vanilla.js');
const ERC20Wrapper = require('./deploy_ERC20_wrapped.js');
const ERC20Votes = require('./deploy_ERC20_votes.js');
const ERC721Votes = require('./deploy_ERC721_votes.js');
const Contracts = require('./deploy_oz_contracts.js');
const Timelock = require('./deploy_timelock_oz.js');
const Governance = require('./deploy_gov.js');
const AllContracts = require('./deploy_oz_contracts.js')
const Mint = require('./mint_erc20_for.js')

module.exports = {
    ERC20,
    ERC20Wrapper,
    ERC20Votes,
    ERC721Votes,
    Timelock,
    Contracts,
    Governance,
    Mint,
    AllContracts
}