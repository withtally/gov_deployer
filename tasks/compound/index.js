const ERC20 = require('./deploy_ERC20_compound.js');
const Timelock = require('./deploy_timelock_compound.js');
const AlphaGovernance = require('./deploy_governance_alpha.js');
const BravoGovernance = require('./deploy_governance_bravo.js');
const AlphaAll = require('./deploy_alpha_contracts.js');
const BravoAll = require('./deploy_bravo_contracts.js');

module.exports = {
    ERC20,
    Timelock,
    AlphaGovernance,
    AlphaAll,
    BravoGovernance,
    BravoAll
}