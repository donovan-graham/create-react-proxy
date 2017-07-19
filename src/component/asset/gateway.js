const path = (investorId, accountId) => `/component/asset/${investorId}/${accountId}`;

const gateway = ({ investorId, accountId, search, page }) => ({
  // method: 'GET',
  uri: path(investorId, accountId),
  qs: { search, page },
});

export { path };
export default gateway;
