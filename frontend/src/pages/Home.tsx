// import StellarWalletsKit from "../wallet/walletKit";
// import { testFreighter } from "../testWallet";



// const Home = () => {
//   const connectWallet = async () => {
//     try {
//       const { address } = await StellarWalletsKit.authModal();

//       console.log("Connected Address:", address);

//       alert(`Wallet Connected\n\n${address}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-6">
//       <h1 className="text-4xl font-bold">
//         GlobalRoots
//       </h1>

//       <button
//         onClick={connectWallet}
//         className="bg-blue-600 text-white px-8 py-3 rounded-lg"
//       >
//         Connect Wallet
//       </button>
//       <button onClick={testFreighter}>
//         Test Freighter
//       </button>
//     </div>
//   );
// };

// export default Home;

import ProductGrid from "../components/marketplace/ProductGrid";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-4">
        GlobalRoots Marketplace
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Secure cross-border trade powered by Stellar Escrow.
      </p>

      <ProductGrid />

    </div>
  );
};

export default Home;