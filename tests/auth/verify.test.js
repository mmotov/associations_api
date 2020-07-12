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

describe('Verify', () => {
    let user;
    let verificationToken;
    beforeEach(async () => {
        await EmailVerificationToken.deleteMany();
        await User.deleteMany({})
        user = await User.create({
            username: "username",
            email: "test@mail.com",
            password: "123456"
        });
        verificationToken = await EmailVerificationToken.create({
            userId: user,
            token: crypto.randomBytes(16).toString('hex')
        });

    });

    describe('/POST auth/verify', () => {
        it('it should verify user if token is valid', (done) => {
            chai.request(server)
                .post(`/auth/verify/${verificationToken.token}`)
                .end(async (err, res) => {
                    res.should.have.status(200);
                    let currentUser = await User.findById(user.id);
                    assert.equal(currentUser.isVerified, true);
                    done();
                })
        });

        it('it should not verify user if token is not valid', (done) => {
            let fakeToken = crypto.randomBytes(16).toString('hex');
            chai.request(server)
                .post(`/auth/verify/${fakeToken}`)
                .end(async (err, res) => {
                    res.should.have.status(404);
                    let currentUser = await User.findById(user.id);
                    assert.equal(currentUser.isVerified, false);
                    done();
                })
        });

        it('it should not verify user if user is already verified', (done) => {
            user.isVerified = true;
            user.save();
            chai.request(server)
                .post(`/auth/verify/${verificationToken.token}`)
                .end(async (err, res) => {
                    res.should.have.status(409);
                    done();
                })
        });
    });
});