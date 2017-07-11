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
