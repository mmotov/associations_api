process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();
const assert = chai.assert;
const crypto = require('crypto');

const User = require('../../app/models/user.model');
const PasswordResetToken = require('../../app/models/passwordResetToken.model');

chai.use(chaiHttp);

describe('ForgotPassword', () => {
    let user;
    beforeEach(async () => {
        await User.deleteMany({})
        user = await User.create({
            username: "username",
            email: "test@mail.com",
            password: "123456"
        });
    });

    describe('/POST auth/forgot-password', () => {
        it('it should not send forgot password email if email is not provided', (done) => {
            chai.request(server)
                .post('/auth/forgot-password')
                .end(async (err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                    done();
                })
        });

        it('it should not send forgot password email if previous token was send less than 15 min ago', (done) => {
            PasswordResetToken.create({
                userId: user,
                token: crypto.randomBytes(16).toString('hex')
            }, (err, token) => {
                chai.request(server)
                    .post('/auth/forgot-password')
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
    });
});