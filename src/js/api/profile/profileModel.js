export class Profile {
    constructor({
        name,
        email,
        bio,
        avatar,
        banner,
    }) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.avatar = avatar;
        this.banner = banner;
    }

    static fromJson(json) {
        return new Profile({
            name: json.name,
            email: json.email,
            bio: json.bio,
            avatar: json.avatar,
            banner: json.banner,
        });
    }
}