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

describe('ResetPassword', () => {
    let user;
    let token;
    beforeEach(async () => {
        await User.deleteMany({})
        user = await User.create({
            username: "username",
            email: "test@mail.com",
            password: "123456"
        });
        token = await PasswordResetToken.create({
            userId: user,
            token: crypto.randomBytes(16).toString('hex')
        })
    });

    describe('/POST auth/reset-password/:token', () => {
        it('it should not reset password if new password is not provided', (done) => {
            chai.request(server)
                .post(`/auth/reset-password/${token.token}`)
                .end(async (err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('password');
                    done();
                })
        });

        it('it should not reset password if token is invalid', (done) => {
            let invalidToken = "fakeToken";
            let resetPasswordDto = {
                password: "11111",
                password_confirmation: "11111",
            }
            chai.request(server)
                .post(`/auth/reset-password/${invalidToken}`)
                .send(resetPasswordDto)
                .end(async (err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.a('string');
                    assert.equal(res.body.error, "Invalid token");
                    done();
                })
        });

        it('it should reset password if data is valid', (done) => {
            let resetPasswordDto = {
                password: "11111",
                password_confirmation: "11111",
            }
            chai.request(server)
                .post(`/auth/reset-password/${token.token}`)
                .send(resetPasswordDto)
                .end(async (err, res) => {
                    res.should.have.status(200);
                    let updatedUser = await User.findById(user.id);
                    updatedUser.comparePassword(resetPasswordDto.password, (err, match) => {
                        assert.equal(match, true);
                        done();
                    })
                })
        });
    });
})