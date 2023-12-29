import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
// import { Request, Response } from 'express';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(sinonChai);
chai.use(chaiHttp);

import { expect } from 'chai';

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { matches } from './mocks/Match.mocks';
import { token, user } from './mocks/User.mocks';
import JWT from '../utils/JWT';

describe('Matches Tests', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return all matches', async function () {
    // Arrange
    const matchesBuild = SequelizeMatch.bulkBuild(matches, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesBuild as any);

    // Log the result of SequelizeMatch.findAll()
    // SequelizeMatch.findAll().then(result => console.log(result));

    // Act
    const { status, body } = await chai.request(app).get('/matches');

    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return all matches in progress', async function () {
    // Arrange
    const matchesBuild = SequelizeMatch.bulkBuild(matches, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesBuild as any);

    // Act
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return all finished matches', async function () {
    // Arrange
    const matchesBuild = SequelizeMatch.bulkBuild(matches, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesBuild as any);

    // Act
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matches);
  });

  // it('should return a match by id', async function () {
  //   // Arrange
  //   const matchBuild = SequelizeMatch.bulkBuild(matches, {
  //     include: [
  //       { model: SequelizeTeam, as: 'homeTeam' },
  //       { model: SequelizeTeam, as: 'awayTeam' },
  //     ],
  //   });
  //   sinon.stub(SequelizeMatch, 'findByPk').resolves(matchBuild[0] as any);

  //   // Act
  //   const { status, body } = await chai.request(app).get('/matches/1');

  //   // Assert
  //   expect(status).to.be.equal(200);
  //   expect(body).to.deep.equal(matches[0]);
  // });

  // it('should return a 404 when match is not found', async function () {
  //   // Arrange
  //   sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

  //   // Act
  //   const { status, body } = await chai.request(app).get('/matches/1');

  //   // Assert
  //   expect(status).to.be.equal(404);
  //   expect(body).to.deep.equal({ message: 'Match not found' });
  // });

  // it('should return a 409 when match is already finished', async function () {
  //   // Arrange
  //   const matchBuild = SequelizeMatch.build(matches[0], {
  //     include: [
  //       { model: SequelizeTeam, as: 'homeTeam' },
  //       { model: SequelizeTeam, as: 'awayTeam' },
  //     ],
  //   });
  //   sinon.stub(SequelizeMatch, 'findByPk').resolves(matchBuild as any);
  //   sinon.stub

  //   // Act
  //   const { status, body } = await chai.request(app).patch('/matches/1/finish');

  //   // Assert
  //   expect(status).to.be.equal(409);
  //   expect(body).to.deep.equal({ message: 'Match is already finished' });
  // });

  // it('should finish a match', async function () {
  //   // Arrange
  //   const matchBuild = SequelizeMatch.build(matches[1], {
  //     include: [
  //       { model: SequelizeTeam, as: 'homeTeam' },
  //       { model: SequelizeTeam, as: 'awayTeam' },
  //     ],
  //   });
  //   sinon.stub(SequelizeMatch, 'findByPk').resolves(matchBuild as any);
  //   sinon.stub(SequelizeMatch, 'update').resolves(matchBuild as any);

  //   // Act
  //   const { status, body } = await chai.request(app).patch('/matches/41/finish');

  //   // Assert
  //   expect(status).to.be.equal(200);
  //   expect(body).to.deep.equal({ message: 'Finished' });
  // });

  it('should finish a match', async function () {
    // Arrange
    sinon.stub(JWT, 'verify').resolves(user);
    const matchBuild = SequelizeMatch.bulkBuild(matches);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchBuild[1] as any);

    // Act
    const { status, body } = await chai.request(app)
    .patch('/matches/41/finish')
    .set('authorization', `Bearer ${token}`);

    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });
}

);