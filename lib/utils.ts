import { toast } from "@/components/ui/toast";

export { cn } from "cn"

export const showToast = (title: string, description: string) => {
    const id = toast.add({
        title: title,
        description: description
        // actionProps: {
        //     children: "Undo",
        //     onClick() {
        //         toast.close(id)
        //     },
        // },
    })
};