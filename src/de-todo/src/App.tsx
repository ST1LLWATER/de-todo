import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { ethers } from 'ethers';

const App = () => {
  const [greeting, setGreetings] = useState('Hello World');
  const [loading, setLoading] = useState(true);

  function getEth() {
    const eth = window.ethereum;
    if (!eth) {
      throw new Error('You need to install MetaMask mara rha');
    }
    return eth;
  }

  async function hasAccounts() {
    const eth = getEth();
    const accounts = (await eth.request({
      method: 'eth_accounts',
    })) as string[];

    return accounts && accounts.length;
  }

  async function getAccounts() {
    const eth = getEth();
    const accounts = (await eth.request({
      method: 'eth_requestAccounts',
    })) as string[];

    return accounts && accounts.length;
  }

  async function init() {
    if (!(await hasAccounts()) && !(await getAccounts())) {
      setLoading(false);
      console.log('Account Access Error');
    }

    const provider = new ethers.providers.Web3Provider(getEth());
    // const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      [],
      provider
    );
  }

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>Hello world</>;
};

export default App;
