//用户数据示例
let users = [
    {
        uuid: '08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a',
        name: 'Mattie',
        password: '123',
        avatar: '/static/images/Avatar-1.png',
        email: 'Mattie@goeasy.io',
        phone: '138xxxxxxxx',
    },
    {
        uuid: '3bb179af-bcc5-4fe0-9dac-c05688484649',
        name: 'Wallace',
        password: '123',
        avatar: '/static/images/Avatar-2.png',
        email: 'Wallace@goeasy.io',
        phone: '138xxxxxxxx',
    },
    {
        uuid: 'fdee46b0-4b01-4590-bdba-6586d7617f95',
        name: 'Tracy',
        password: '123',
        avatar: '/static/images/Avatar-3.png',
        email: 'Tracy@goeasy.io',
        phone: '138xxxxxxxx',
    },
    {
        uuid: '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
        name: 'Juanita',
        password: '123',
        avatar: '/static/images/Avatar-4.png',
        email: 'Juanita@goeasy.io',
        phone: '138xxxxxxxx',
    },
];

//群数据示例
let groups = [
    {
        uuid: 'group-a42b-47b2-bb1e-15e0f5f9a19a',
        name: '小程序交流群',
        avatar: '/static/images/wx.png',
        userList: [
            '08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a',
            '3bb179af-bcc5-4fe0-9dac-c05688484649',
            'fdee46b0-4b01-4590-bdba-6586d7617f95',
            '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
        ],
    },
    {
        uuid: 'group-4b01-4590-bdba-6586d7617f95',
        name: 'UniApp交流群',
        avatar: '/static/images/uniapp.png',
        userList: [
            '08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a',
            'fdee46b0-4b01-4590-bdba-6586d7617f95',
            '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f',
        ],
    },
    {
        uuid: 'group-dbb0-4bc9-99c6-fa77b9eb763f',
        name: 'GoEasy交流群',
        avatar: '/static/images/goeasy.jpeg',
        userList: ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649'],
    },
];

function RestApi() {}

function User(uuid, name, avatar, email, phone) {
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
    this.email = email;
    this.phone = phone;
}

function Group(uuid, name, avatar) {
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
}

RestApi.prototype.findFriends = function (user) {
    let friendList = users.filter((v) => v.uuid !== user.uuid);
    return friendList;
};

RestApi.prototype.findGroups = function (user) {
    let groupList = groups.filter((v) => v.userList.find((id) => id === user.uuid));
    return groupList;
};

RestApi.prototype.findUser = function (username, password) {
    let user = users.find((user) => user.name === username && user.password === password);
    if (user) {
        return new User(user.uuid, user.name, user.avatar, user.email, user.phone);
    }
    return user;
};

RestApi.prototype.findGroupById = function (groupId) {
    let group = groups.find((group) => group.uuid === groupId);
    return new Group(group.uuid, group.name, group.avatar);
};

RestApi.prototype.findUserById = function (userId) {
    let user = users.find((user) => user.uuid === userId);
    return new User(user.uuid, user.name, user.avatar, user.email, user.phone);
};

RestApi.prototype.findGroupMembers = function (groupId) {
    let members = {};
    let group = groups.find((v) => v.uuid === groupId);
    users.map((user) => {
        let groupUserUuid = group.userList.find((uuid) => {
            return uuid === user.uuid;
        });
        if (groupUserUuid) {
            members[groupUserUuid] = new User(user.uuid, user.name, user.avatar);
        }
    });
    return members;
};

RestApi.prototype.findGroupMemberAvatars = function (groupId) {
    let avatars = [];
    let group = groups.find((v) => v.uuid === groupId);
    users.map((user) => {
        group.userList.forEach((userId) => {
            if (user.uuid === userId) {
                avatars.push(user.avatar);
            }
        });
    });
    return avatars;
};

export default new RestApi();
