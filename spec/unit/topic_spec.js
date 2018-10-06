const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Dog Walking",
                description: "Getting walked by a dog"
            })
            .then((topic) => {
            this.topic = topic;

        Post.create({
            title: "Chocolate Lab Personal Trainer",
            body: "The dog got me into shape",
            topicId: this.topic.id
        })
        .then((post) => {
            this.post = post;
            done();
        });
    })
    .catch((err) => {
        console.log(err);
        done();
        });
    });

    });

    describe("#create()", () => {
        it("should create a topic object and store it in the database", (done) => {
            Topic.create({
                title: "Adventurous Cats",
                description: "Where has the cat been?",
            })
            .then((topic) => {
                expect(topic.title).toBe("Adventurous Cats");
                expect(topic.description).toBe("Where has the cat been?");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a topic with a missing title or description", (done) => {
            Topic.create({
                title: "Adventurous Cats",
            })
            .then((topic) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });

    describe("#getPosts()", () => {
        it("should create and return associated posts", (done) => {
            Post.create({
                title: "Ripley the Crazy Tabby",
                body: "He lost his collar",
                topicId: this.topic.id
            })
            .then((post) => {
                this.topic.getPosts()
                .then((associatedPost) => {
                expect(this.topic.id).toBe(post.topicId);
                done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});
