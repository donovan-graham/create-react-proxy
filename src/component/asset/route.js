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

  const idNumber = getIdNumber(investorId, req);
  const account = getAccount(accountId, idNumber, req);

  return res.json({ ...account, idNumber });
};

export { getIdNumber, getAccount };
export default { method: 'get', path, handler };

/*
import express from 'express'
import asset from './components/asset/route'

const app = express();
app[asset.method](asset.path, asset.handler);
*/
