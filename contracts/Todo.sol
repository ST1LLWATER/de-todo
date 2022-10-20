// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

 contract TodoList {
    uint public userCount=0;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

     struct Todo {
        string id;
        string todo;
        bool completed;
    }

    struct User{
        uint id;
        string name;
        Todo[] todos;
        uint todoCount;
    }

    mapping(address => User) public users;

    function getOwner() public view returns (address) {
        return owner;
    }

    function createUser(string memory _name) public{
        userCount++;
        console.log(userCount);
        users[msg.sender].id = userCount;
        users[msg.sender].name = _name;
        users[msg.sender].todoCount = 0;
    }

    function createTodo( string memory _todo) public  {
        // User memory user=;
        users[msg.sender].todoCount++;
        string memory user_id=Strings.toString(users[msg.sender].id);
        string memory todo_count=Strings.toString(users[msg.sender].todoCount);
        string memory todo_id=string(abi.encodePacked(user_id,todo_count));
        users[msg.sender].todos.push(Todo(todo_id,_todo,false));
    }

    function updateTodoStatus(string memory _id,bool _completed) public {
        for(uint i=0;i<users[msg.sender].todos.length;i++){
            if(keccak256(abi.encodePacked(users[msg.sender].todos[i].id))==keccak256(abi.encodePacked(_id))){
                users[msg.sender].todos[i].completed=_completed;
            }
        }
    }

    function getUser() public view returns (User memory) {
        return users[msg.sender];
    }
  
 }