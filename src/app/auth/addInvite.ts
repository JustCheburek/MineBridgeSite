import {userModel} from "@server/models";

export async function AddInvite(userId: string, name: string, inviterId?: string): Promise<string | undefined> {
	if (!inviterId || inviterId === userId) return

	const inviter = await userModel.findById(inviterId)

	if (inviter && !inviter.invites.includes(userId)) {
		inviter.invites.push(userId)
		inviter.punishments.push({
			reason: `Позвал ${name}`,
			rating: 5,
			author: "AutoMod",
			createdAt: new Date(),
			updatedAt: new Date()
		})
		inviter.mostiki += 5
		inviter.save()
	}

	return inviter?._id
}