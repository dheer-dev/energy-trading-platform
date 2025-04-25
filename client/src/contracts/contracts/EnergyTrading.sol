// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTrading {
    struct Listing {
        address seller;
        uint256 amountKWh;
        uint256 pricePerKWh;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;

    event Listed(uint256 indexed id, address seller, uint256 amount, uint256 price);
    event Purchased(uint256 indexed id, address buyer, uint256 amount);

    function listEnergy(uint256 _amountKWh, uint256 _pricePerKWh) external {
        listings[nextListingId] = Listing(msg.sender, _amountKWh, _pricePerKWh, true);
        emit Listed(nextListingId, msg.sender, _amountKWh, _pricePerKWh);
        nextListingId++;
    }

    function buyEnergy(uint256 _id, uint256 _amountKWh) external payable {
        Listing storage listing = listings[_id];
        require(listing.isActive, "Listing inactive");
        require(msg.value >= _amountKWh * listing.pricePerKWh, "Insufficient payment");
        
        payable(listing.seller).transfer(msg.value);
        emit Purchased(_id, msg.sender, _amountKWh);
    }
}