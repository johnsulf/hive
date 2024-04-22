export class Post {
    constructor({
        id, title, body, tags, media, created, updated, _count, author, reactions, comments,
    }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
        this.media = media;
        this.created = created;
        this.updated = updated;
        this._count = _count;
        this.author = author;
        this.reactions = reactions;
        this.comments = comments;
    }

    static fromJson(json) {
        return new Post({
            id: json.data.id,
            title: json.data.title,
            body: json.data.body,
            tags: json.data.tags,
            media: json.data.media,
            created: json.data.created,
            updated: json.data.updated,
            _count: json.data._count,
            author: json.data.author,
            reactions: json.data.reactions,
            comments: json.data.comments,
        });
    }
}