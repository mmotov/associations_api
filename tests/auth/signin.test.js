process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

const User = require('../../app/models/user.model');

chai.use(chaiHttp);

describe('SignIn', () => {
    let user;
    beforeEach(async () => {
        await User.deleteMany({});
        user = await User.create({
            username: "test",
            email: "email@test.com",
            password: "password"
        });
    });

    describe('/POST auth/sign-in', () => {
        it('it should not sign-in user if email or password is not provided', (done) => {
            let userDto = {
                email: "",
            };
            chai.request(server)
                .post('/auth/sign-in')
                .send(userDto)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                    res.body.errors.should.have.property('password');
                    done();
                });
        });

        it('it should not sign-in user if user with provided email is nt exist', (done) => {
            let userDto = {
                email: "fakeEmail@mail.com",
                password: "password"
            };
            chai.request(server)
                .post('/auth/sign-in')
                .send(userDto)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not sign-in user if provided wrong credentials', (done) => {
            let userDto = {
                email: user.email,
                password: "wrongPassword"
            };
            chai.request(server)
                .post('/auth/sign-in')
                .send(userDto)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it ('it should sign-in user if credentials are correct', (done) => {
            let userDto = {
                email: user.email,
                password: "password"
            };

            chai.request(server)
                .post('/auth/sign-in')
                .send(userDto)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user')
                    res.body.should.have.property('jwt')
                    done();
                });
        })
    });
});