import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';

async function deploy() {
  const Todo = await ethers.getContractFactory('TodoList');
  const todo = await Todo.deploy();
  await todo.deployed();
  return todo;
}

async function success(todo) {
  console.log({
    success: true,
    message: 'Todo Contract Deployed Successfully',
    address: todo.address,
    owner: await todo.getOwner(),
  });
}

deploy().then(success);

// Start Localhost with npx hardhat node
// Run this script with npx hardhat run .\scripts\deploy-todo.ts --network localhost
