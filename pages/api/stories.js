import clientPromise from '../../lib/mongodb';

let storiesArray;

export default async (req, res) => {

    const client = await clientPromise;

    const db = client.db("test");

    const stories = await db
        .collection("stories")
        .find({})
        .limit(20)
        .toArray();
    res.json(stories);
    storiesArray = stories
    return stories
};

export { storiesArray };










