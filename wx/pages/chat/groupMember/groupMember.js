/* groupMember.js */
const app = getApp()

Page({
	data: {
		groupMemberNum: 0,
		currentUser : null,
		groupMembersMap : {}
	},
	onLoad(options){
		let group = JSON.parse(options.group);
		let groupMemberMap = app.globalData.service.getGroupMembers(group.uuid);
		let groupMemberNum = Object.keys(groupMemberMap).length;
		this.setData({
			groupMemberNum: groupMemberNum,
			groupMembersMap: groupMemberMap,
		});
	},
})
