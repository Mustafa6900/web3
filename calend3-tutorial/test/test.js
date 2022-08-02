const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("calend3", function(){

    let Contract,contract;
    let owner,addr1,addr2;
    
    beforeEach(async function(){

        [owner,addr1,addr2]= await ethers.getSigners();
        Contract = await ethers.getContractFactory("Calend3");
        contract = await Contract.deploy();
        await contract.deployed();
    
    });
    it("Should set the minutely rate", async function(){
        const tx = await contract.setRate(1000);

        await tx.wait();

        expect(await contract.getRate()).to.equal(1000);
        
       
    });

    it("Should fail if non-owner sets rate", async function(){

        await expect(
            contract.connect(addr1).setRate(500)
        ).to.be.revertedWith('Only the owner can set the rate');
    });

    it("Should add two appointments", async function(){
        
        const tx1 = await contract.setRate(ethers.utils.parseEther("0.001"));
        await tx1.wait();

        const tx2 = await contract.connect(addr1).createAppointment("Meeting with FitbullTeam",1644154200,1644159600,{value: ethers.utils.parseEther("2")});
        await tx2.wait();

        const tx3 = await contract.connect(addr2).createAppointment("Breakfast at musti",1644154200,1644159600,{value: ethers.utils.parseEther("1.5")});
        await tx3.wait();

        const appointments = await contract.getAppointments();
        const ownerBalance = await ethers.provider.getBalance(owner.address);
        const addr1Balance= await ethers.provider.getBalance(addr1.address);
        const addr2Balance = await ethers.provider.getBalance(addr2.address);
        
        console.log(owner);
        console.log(addr1);
        console.log(addr2);

        console.log(ownerBalance);
        console.log(addr1Balance);
        console.log(addr2Balance);

    });
});