process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();
const assert = chai.assert;
const crypto = require('crypto');

const User = require('../../app/models/user.model');
const EmailVerificationToken = require('../../app/models/emailVerificationToken.model');

chai.use(chaiHttp);

describe('ResendVerification', () => {
    let user;
    beforeEach(async () => {
        await EmailVerificationToken.deleteMany();
        await User.deleteMany({})
        user = await User.create({
            username: "username",
            email: "test@mail.com",
            password: "123456"
        });
    });

    describe('/POST auth/resend-verification', () => {
        it('it should send new token if email is valid', (done) => {
            chai.request(server)
                .post('/auth/resend-verification')
                .send({email: user.email})
                .end(async (err, res) => {
                    res.should.have.status(200);
                    let token = await EmailVerificationToken.findOne({userId: user.id});
                    assert.isNotNull(token);
                    done();
                })
        });

        it('it should not create new token if email is not valid', (done) => {
            const fakeEmail = "fakeEmail";
            chai.request(server)
                .post('/auth/resend-verification')
                .send({email: fakeEmail})
                .end(async (err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                    let token = await EmailVerificationToken.findOne({userId: user.id});
                    assert.isNull(token);
                    done();
                })
        });

        it('it should not create new token if previous token was send less than 15 min ago', (done) => {
            EmailVerificationToken.create({
                userId: user,
                token: crypto.randomBytes(16).toString('hex')
            }, (err, token) => {
                chai.request(server)
                    .post('/auth/resend-verification')
                    .send({email: user.email})
                    .end(async (err, res) => {
                        res.should.have.status(409);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('string');
                        assert.equal(res.body.error, "Last token issued less than 15 minutes ago")
                        done();
                    })
            });
        });

        it('it should not send new token if user is already verified', (done) => {
            user.isVerified = true;
            user.save();
            chai.request(server)
                .post('/auth/resend-verification')
                .send({email: user.email})
                .end(async (err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.a('string');
                    assert.equal(res.body.error, "Account is already verified")
                    done();
                })
        });
    });
})