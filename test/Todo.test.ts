import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Todo', () => {
  it('creates todo', async () => {
    try {
      const Todo = await ethers.getContractFactory('TodoList');
      const todo = await Todo.deploy();
      await todo.deployed();

      await todo.createUser('Alok Sharma');
      await todo.createTodo('Buy Milk');
      await todo.createTodo('Buy Bread');
      console.log(await todo.getUser());
      await todo.updateTodoStatus('12', true);
      console.log(await todo.getUser());
    } catch (error) {
      console.log({
        success: false,
        message: error,
      });
    }
  });
});
