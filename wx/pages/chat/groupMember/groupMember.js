/* groupMember.js */
import restApi from '../../../static/lib/restapi';
Page({
	data: {
		groupMemberNum: 0,
		currentUser : null,
		groupMembersMap : {}
	},
	onLoad(options){
        let group = JSON.parse(options.group);
        let groupMemberMap = restApi.findGroupMembers(group.id);
		let groupMemberNum = Object.keys(groupMemberMap).length;
		this.setData({
			groupMemberNum: groupMemberNum,
			groupMembersMap: groupMemberMap,
		});
	},
})
