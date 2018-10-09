const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

    beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {

        Topic.create({
            title: "The Moon",
            description: "The gray orb controlling our waves"
        })
        .then((topic) => {
            this.topic = topic;

        Flair.create({
            name: "Stargazer",
            color: "Blue",
            topicId: this.topic.id
        })
        .then((flair) => {
            this.flair = flair;
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

        it("should create a flair object with a name, color, and assigned topic", (done) => {

            Flair.create({
                name: "Asteroink",
                color: "Pink",
                topicId: this.topic.id
            })
            .then((flair) => {
                expect(flair.name).toBe("Asteroink");
                expect(flair.color).toBe("Pink");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create flair with missing name, color, or assigned topic", (done) => {
            Flair.create({
                name: "Asteroink"
            })
            .then((flair) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Flair.color cannot be null");
                expect(err.message).toContain("Flair.topicId cannot be null");
                done();
            })
        });
    });

    describe("#setTopic()", () => {
        it("should associate a topic and a flair together", (done) => {

            Topic.create({
                title: "The Moon",
                description: "The gray orb controlling our waves"
            })
            .then((newTopic) => {
                expect(this.flair.topicId).toBe(this.topic.id);
                this.flair.setTopic(newTopic)
                .then((flair) => {
                    expect(flair.topicId).toBe(newTopic.id);
                    done();
                    });
                })
            });
    });
});