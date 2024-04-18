export class Post {
    constructor({
        id, title, body, tags, image, created, updated, _count,
    }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
        this.image = image;
        this.created = created;
        this.updated = updated;
        this._count = _count;
    }

    static fromJson(json) {
        return new Post({
            id: json.data.id,
            title: json.data.title,
            body: json.data.body,
            tags: json.data.tags,
            image: json.data.image,
            created: json.data.created,
            updated: json.data.updated,
            _count: json.data._count,
        });
    }
}