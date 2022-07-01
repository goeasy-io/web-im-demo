class RestApi {
	//用户数据示例
	users = [
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
	groups = [
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

	findFriends (user) {
		return this.users.filter((v) => v.uuid !== user.uuid);
	}

	findGroups (user) {
		return this.groups.filter((v) => v.userList.find((id) => id === user.uuid));
	}

	findUser (username, password) {
		return this.users.find((user) => user.name === username && user.password === password);
	}

	findGroupById (groupId) {
		return this.groups.find((group) => group.uuid === groupId);
	}

	findUserById (userId) {
		return this.users.find((user) => user.uuid === userId);
	}

	findGroupMemberAvatars (groupId) {
		let avatars = [];
		let group = this.groups.find((v) => v.uuid === groupId);
		this.users.map((user) => {
			group.userList.forEach((userId) => {
				if (user.uuid === userId) {
					avatars.push(user.avatar);
				}
			});
		});
		return avatars;
	}
}

export default new RestApi();
