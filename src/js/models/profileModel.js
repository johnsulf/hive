export class Profile {
    constructor({
        name,
        email,
        bio,
        avatar,
        banner,
        followers,
        following,
        posts,
        _count,
    }) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.avatar = avatar;
        this.banner = banner;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
        this._count = _count;
    }

    static fromJson(json) {
        return new Profile({
            name: json.data.name,
            email: json.data.email,
            bio: json.data.bio,
            avatar: json.data.avatar,
            banner: json.data.banner,
            followers: json.data.followers,
            following: json.data.following,
            posts: json.data.posts,
            _count: json.data._count,
        });
    }
}