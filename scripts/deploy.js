const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const NAME = "TokenMaster";
  const SYMBOL = "TM";

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster");
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);
  await tokenMaster.deployed();

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`);

  const occasions = [
    {
      name: "MI vs CSK",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "7:30PM IST",
      location: "Wankhede Stadium - Mumbia, Maharashtra",
    },
    {
      name: "ETH Tokyo",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "1:00PM JST",
      location: "Tokyo, Japan",
    },
    {
      name: "ETH Privacy Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul",
    },
    {
      name: "RCB vs SRH",
      cost: tokens(1.5),
      tickets: 125,
      date: "April 23",
      time: "11:00AM IST",
      location: "Chinnaswami Stadium, Banglore",
    },
  ];

  for (var i = 0; i < 4; i++) {
    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        occasions[i].name,
        occasions[i].cost,
        occasions[i].tickets,
        occasions[i].date,
        occasions[i].time,
        occasions[i].location
      );

    await transaction.wait();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
