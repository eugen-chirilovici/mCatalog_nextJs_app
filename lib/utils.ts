import { toast } from "@/components/ui/toast";

export { cn } from "cn"

export const showToast = (title: string, description: string) => {
    toast.add({
        title: title,
        description: description
    })
};