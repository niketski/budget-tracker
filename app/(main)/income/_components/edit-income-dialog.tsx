import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
 } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import EditIncomeForm from "./edit-income-form";

const EditIncomeDialog = ({ children }: { children: React.ReactNode }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" aria-label="Edit">
                    <Pen size={16} color="#008235" />
                </Button>
            </DialogTrigger>
            <DialogContent className="px-5 py-10">
                <DialogHeader className="mb-6">
                    <DialogTitle className="font-bold text-primary text-2xl">Edit Income</DialogTitle>
                    <DialogDescription>
                        You can update the income details here.
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
 
export default EditIncomeDialog;