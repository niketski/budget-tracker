import IncomeTable from "./_components/income-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { auth } from "@/auth";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog'
import AddIncomeForm from "./_components/add-income-form";

const items = [
    { label: 'Default', value: '' },
    { label: "Date (desc)", value: "date-desc" },
    { label: "Date (asc)", value: "date-asc" },
    { label: "Amount (desc)", value: "amount-desc" },
    { label: "Amount (asc)", value: "amount-asc" },
    { label: "User", value: "user" },
];

const IncomePage = async () => {
    const session = await auth();
    
    return ( 
        <>
            <div className="container">
                <h1 className="text-primary mb-8 md:mb-20">Income</h1>

                <div className="flex flex-col items-start md:flex-row gap-y-10 lg:gap-y-0 lg:items-center md:justify-between mb-10">
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="default" 
                                    className="app-btn h-auto py-2.5 lg:py-4.25 lg:px-7.5 px-3 rounded-[50px] font-semibold hover:bg-card hover:text-primary border border-transparent hover:border-primary">
                                    <Plus width={32} height={32}/>
                                    Add Income
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="px-5 py-10" >
                                <DialogHeader className="mb-6">
                                    <DialogTitle className="font-bold text-primary text-2xl">Add Income</DialogTitle>
                                    <DialogDescription>
                                        Please add the income details.
                                    </DialogDescription>
                                </DialogHeader>

                                <AddIncomeForm/>
                            
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="w-full sm:w-auto flex gap-y-4 sm:gap-y-0 flex-col sm:flex-row gap-x-4">
                        <Select>
                            <SelectTrigger className="w-full sm:min-w-46 field-input">
                                <SelectValue placeholder="Sort By" className="text-primary"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {items.map((item) => (
                                    <SelectItem className="px-5 py-2.5" key={item.value} value={item.value}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <InputGroup className="rounded-[50px] sm:min-w-77.5 field-input">
                            <InputGroupInput placeholder="Search..."/>
                            <InputGroupAddon align="inline-end">
                                <Search width={24} height={24} className="text-primary"/>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>

                <div className="min-h-72">
                    <IncomeTable userId={session?.user?.id as string}/>
                </div>
            </div>
        </>
     );
}
 
export default IncomePage;