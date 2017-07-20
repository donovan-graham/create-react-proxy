import retailApi from '@scope/retailApi';

const getIdNumber = async (investorId, req) => {
  const { idNumber } = await sf.rest.request(retailApi.getParty({ investorId }), req);
  return idNumber;
};
const getAccount = async (accountId, idNumber, req) => {
  const account = await sf.rest.request(retailApi.getAccount(accountId, { idNumber }), req);
  return account;
};

const path = '/component/asset/:investorId/:accountId';

const handler = async (req, res) => {
  const { investorId, accountId } = req.params;
  const { search, page } = req.query;

  const idNumber = await getIdNumber(investorId, req);
  const account = await getAccount(accountId, idNumber, req);

  return res.json({ ...account, idNumber });
};

export { getIdNumber, getAccount };
export default { path, handler }; // { method: 'get' }

/*
import express from 'express'
import asset from './components/asset/route'
import fund from './components/asset/route'

const api = express.Router();

const apiRoutes = [ idNumber = getIdNum
  asset,
  fund,
];

for (const { method = 'get', path, handler} of apiRoutes) {
  api[method](path, handler);
}

// See for more:
// https://expressjs.com/en/guide/debugging.html
// https://expressjs.com/en/starter/generator.html

// https://stackoverflow.com/a/14934933

const routeLog = app
  ._router.stack          // registered routes
  .filter(r => r.route)    // take out all the middleware
  .map(r => r.route.path)  // get all the paths

console.log(routeLog);
console.log(api._router.stack);
console.log(api.stack)

*/
