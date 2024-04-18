export class Profile {
    constructor({
        name,
        email,
        bio,
        avatar,
        banner,
        _count,
    }) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.avatar = avatar;
        this.banner = banner;
        this._count = _count;
    }

    static fromJson(json) {
        return new Profile({
            name: json.data.name,
            email: json.data.email,
            bio: json.data.bio,
            avatar: json.data.avatar,
            banner: json.data.banner,
            _count: json.data._count,
        });
    }
}