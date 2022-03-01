//用户数据示例
let users = [
    {
        "uuid": "08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "Mattie",
        "password": "123",
        "avatar": '/static/images/Avatar-1.png'
    },
    {
        "uuid": "3bb179af-bcc5-4fe0-9dac-c05688484649",
        "name": "Wallace",
        "password": "123",
        "avatar": '/static/images/Avatar-2.png'
    },
    {
        "uuid": "fdee46b0-4b01-4590-bdba-6586d7617f95",
        "name": "Tracy",
        "password": "123",
        "avatar": '/static/images/Avatar-3.png'
    },
    {
        "uuid": "33c3693b-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "Juanita",
        "password": "123",
        "avatar": '/static/images/Avatar-4.png'
    }
];

//群数据示例
let groups = [
    {
        "uuid": "group-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "小程序交流群",
        "avatar" : '/static/images/wx.png',
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f']
    },
    {
        "uuid": "group-4b01-4590-bdba-6586d7617f95",
        "name": "UniApp交流群",
        "avatar" : '/static/images/uniapp.png',
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f']
    },
    {
        "uuid": "group-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "GoEasy交流群",
        "avatar" : '/static/images/goeasy.jpeg',
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649']
    }
];


function RestApi() {

}

RestApi.prototype.findFriends = function (user) {
    var friendList = users.filter(v => v.uuid != user.uuid);
    return friendList;
}

RestApi.prototype.findGroups = function (user) {
    var groupList = groups.filter(v => v.userList.find(id => id == user.uuid));
    return groupList;
}

RestApi.prototype.findUser = function (username, password) {
    let user = users.find(user => (user.name == username && user.password == password))
    return {
        uuid : user.uuid,
        avatar : user.avatar,
        name : user.name
    };
}

RestApi.prototype.findGroupById = function (groupId) {
    var group = groups.find(group => (group.uuid == groupId));
    return group;
};


RestApi.prototype.findUserById = function (userId) {
    var user = users.find(user => (user.uuid == userId))
    return user;
};



RestApi.prototype.findGroupMembers = function (groupId) {
    let members = [];
    let group = groups.find(v => v.uuid == groupId);
    users.map(user => {
        if (group.userList.find(v => v == user.uuid)) {
            members.push(user)
        }
    });
    return members;
}

export default new RestApi();