const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiMoment = require('chai-moment');
const faker = require('faker');
const mongoose = require('mongoose');


const {Poll} = require('../models');

const {DATABASE_URL, TEST_DATABASE_URL} = require('../config'); 
const {app, runServer, closeServer} = require('../index');

const should = chai.should();
chai.use(chaiHttp);
chai.use(chaiMoment);


function generatePoll() {
  return {
    choices: [{
      choice: faker.lorem.word(),
      vote: faker.lorem.word()
     
    }],
    text: faker.lorem.sentence(),
    title: faker.lorem.sentence(3)
   
      };
}

function seedPoll() {
  console.info('Seeding test data....');
    
  const seedData = [];
  for (let i = 0; i < 10; i++) {
    seedData.push(generatePoll());
  }
  return Poll.insertMany(seedData);
}


function dropTestData() {
  return mongoose.connection.dropDatabase();
}

describe('Posts', function(){
  before(function(){
    return runServer(TEST_DATABASE_URL);
  });
    
  beforeEach(function() {
    return (seedDriver(), seedBrokerShipper());
  });
    
  afterEach(function() {
    return dropTestData();
  });

  after(function() {
    return closeServer();
  });


        describe('Poll Test', function() {
            describe('GET', function(){
                it ('should get the all polls', function(){
                    
                })
            })
        })
})