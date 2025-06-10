"use server"

import { userModel } from "@db/models";
import { revalidateTag } from "next/cache";
import { Notifications, notificationsLabels } from "@/types/notification";
import { z } from "zod/v4";
import type { StateId } from "@/types/state";

const notificationSchema = z.object({
    news: z.string().optional(),
    mostiki: z.string().optional(),
    rating: z.string().optional(),
    hours: z.string().optional(),
    invite: z.string().optional(),
    code: z.string().optional()
});

type NotificationSettings = {
    [key: string]: string | undefined;
}

export async function UpdateNotification({data: {_id}}: StateId, formData: FormData): Promise<StateId> {
    const result = notificationSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!result.success) {
        return {
            success: false,
            error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '), data: {_id}
        }
    }

    const notificationSettings = result.data as NotificationSettings

    try {
        const user = await userModel.findById(_id)
        if (!user) return { success: false, error: 'Пользователь не найден', data: {_id} }

        if (!user.notifications) {
            user.notifications = new Notifications();
        }

        // Получаем список всех полей уведомлений
        const allNotificationFields = notificationsLabels.map(label => label.name);

        // Обновляем настройки уведомлений
        allNotificationFields.forEach(fieldName => {
            // Если поле есть в formData, устанавливаем true, иначе false
            (user.notifications as any)[fieldName] = notificationSettings[fieldName] === "on";
        });

        console.log("Отправлено в форме:", notificationSettings);
        console.log("Сохранено в базе:", user.notifications);

        await user.save()
        revalidateTag("userLike")

        return { success: true, data: { _id: user._id } }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ошибка при обновлении настроек уведомлений', data: {_id}
        }
    }
}