const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// npx hardhat run scripts/deploy.js --network polygon

describe("Freelancing", function () {
  let Freelancing_Factory, freelancing;

  this.beforeEach(async function () {
    Freelancing_Factory = await ethers.getContractFactory("Freelancing");
    freelancing = await Freelancing_Factory.deploy();
  });


// ----------------------------------------------------------------------------------------------------- 

// Part-2
  it("Should create a job", async function () {
    let all;
    const _job = await freelancing.createJob(
      ["ss","ss","ss","ss","ss","ss","s","ss","ss","ss","ss","ss"] , [1,2,3], "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"], "Tech"
    );
    all = await freelancing.getJobs();

    assert.equal(all.length, 1);
    assert.equal(all[0].intArray[0], 1);
    assert.equal(all[0].req_skills[0], "CSS");
  });

  it("Should return all jobs", async function () {
    let all;
    const _job = await freelancing.createJob(
      ["ss","ss","ss","ss","ss","ss","s","ss","ss","ss","ss","ss"] , [1,2,3], "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"], "Tech"
    );
    all = await freelancing.getJobs();

    assert.equal(all.length, 1);
  });


  it("Should create a bid", async function () {
    let all;
    const _job = await freelancing.createJob(
      ["ss","ss","ss","ss","ss","ss","s","ss","ss","ss","ss","ss"] , [1,2,3], "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"], "Tech"
    );
    await freelancing.addBid(0,"ss",2,2,2,0,"KYA BE","img");

    all = await freelancing.getJobs();

    assert.equal(all.length, 1);
    assert.equal(all[0].bidders.length, 1);
    assert.equal(all[0].bidders[0].bidArray[0], 2);
  });

  it("Should select a final developer", async function () {
    let all;
    const _job = await freelancing.createJob(
      ["ss","ss","ss","ss","ss","ss","s","ss","ss","ss","ss","ss"] , [1,2,3], "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"], "Tech"
    );
    const _int = await freelancing.final_select(
      0, 0, 4
    );
    all = await freelancing.getJobs();

    assert.equal(all.length, 1);
    assert.equal(all[0].final_selection, 0);
  });

  it("Should make an ask", async function () {
    let all;
    const _job = await freelancing.createJob(
      ["ss","ss","ss","ss","ss","ss","s","ss","ss","ss","ss","ss"] , [1,2,3], "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"], "Tech"
    );
    const _int = await freelancing.makeAsk(
      0, "Hello"
    );
    all = await freelancing.getJobs();

    assert.equal(all.length, 1);
    assert.equal(all[0].ask[0], 'Hello');
  });

  it("Should make a response", async function () {
    let all;
    const _job = await freelancing.createJob(
      ["ss","ss","ss","ss","ss","ss","s","ss","ss","ss","ss","ss"] , [1,2,3], "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"], "Tech"
    );

    const _nt = await freelancing.final_select(
      0, 0, 4, {value: 6}
    );

    const _n = await freelancing.getBalance();

    assert.equal(_n, 6);

    const _int = await freelancing.makeResponse(
      0, 1, "0x863441952A806c680cea03915077B72876DA17f3", 4
    );
    all = await freelancing.getJobs();

    const _pn = await freelancing.getBalance();

    assert.equal(_pn, 2);
    assert.equal(all.length, 1);
    assert.equal(all[0].resp[0], 1);
  });


  // -------------------------------------------------------------------------------------------------------------- 


  it("Should create a profile", async function () {
    let all;
    const _profile = await freelancing.createProfile(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"],["ss","ss"],["ss","ss"],["0","1"],["ss","ss"],["ss","ss"],["ss","ss"]
    );
    all = await freelancing.getProfile(0);

    // also tests the getProfile here only.
    assert.equal(all.stringArray[0], "ss");
    assert.equal(all.skills[0], "CSS");
    assert.equal(all.pro_title[0], "ss");
    assert.equal(all.developer, 0x863441952A806c680cea03915077B72876DA17f3);
  });

  it("Should update a profile", async function () {
    let all;
    const _profile = await freelancing.createProfile(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"],["ss","ss"],["ss","ss"],["0","1"],["ss","ss"],["ss","ss"],["ss","ss"]
    );

    const _pro = await freelancing.updateProfile(
      0,["pp","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , "0x863441952A806c680cea03915077B72876DA17f3",["TS"],[],[],[],[],[],[]
    );

    all = await freelancing.getAllProfiles();

    assert.equal(all.length, 1);
    assert.equal(all[0].skills[2], "TS");
    assert.equal(all[0].stringArray[0], "pp");
  });


  it("Should rate a profile", async function () {
    let all , rr;
    const _profile = await freelancing.createProfile(
      ["ss","ss","ss","ss","ss","ss","ss","ss","ss","ss"] , "0x863441952A806c680cea03915077B72876DA17f3",["CSS","JS"],["ss","ss"],["ss","ss"],["0","1"],["ss","ss"],["ss","ss"],["ss","ss"]
    );

    rr = await freelancing.rate(0, 4);

    all = await freelancing.getAllProfiles();

    assert.equal(all[0].rating, 4);
  });

});
