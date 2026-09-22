import { toast } from "@/components/ui/toast";

export { cn } from "cn"

export const showToast = (title: string, description: string) => {
    toast.add({
        title: title,
        description: description
        // className: "!bg-white !text-slate-900 !opacity-100 border border-slate-200 shadow-2xl relative z-[9999]"
    });
};