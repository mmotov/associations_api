process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const User = require('../../app/models/user.model');

chai.use(chaiHttp);

describe('SignUp', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/POST auth/signup', () => {
        it('it should not register user without username, email or password', (done) => {
            let user = {
                username: "",
                email: "",
            };
            chai.request(server)
                .post('/auth/sign-up')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('username');
                    res.body.errors.should.have.property('email');
                    res.body.errors.should.have.property('password');
                    done();
                });
        });

        it('it should not register user when passwords does not match', (done) => {
            let user = {
                username: "username",
                email: "test@mail.com",
                password: "11111",
                password_confirmation: "22222",
            };
            chai.request(server)
                .post('/auth/sign-up')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('password');
                    res.body.errors.password.should.be.equals("Passwords does not match")
                    done();
                });
        })

        it('it should not register user when email is already in use', (done) => {

            User.create({
                username: "username",
                email: "test@mail.com",
                password: "123456"
            }, async function (err) {
                let user = {
                    username: "username",
                    email: "test@mail.com",
                    password: "11111",
                    password_confirmation: "11111",
                };
                chai.request(server)
                    .post('/auth/sign-up')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(409);
                        done();
                    });
            });
        });
    });
});
