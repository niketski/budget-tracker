import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const items = [
    { label: 'Default', value: '' },
    { label: "Date (desc)", value: "date-desc" },
    { label: "Date (asc)", value: "date-asc" },
    { label: "Amount (desc)", value: "amount-desc" },
    { label: "Amount (asc)", value: "amount-asc" },
    { label: "User", value: "user" },
];

const IncomePage = () => {

    return ( 
        <>
            <div className="container">
                <h1 className="text-primary mb-20">Income</h1>

                <div className="flex flex-col items-start lg:flex-row gap-y-10 lg:gap-y-0 lg:items-center lg:justify-between mb-10">
                    <Button 
                        variant="default" 
                        className="app-btn h-auto py-2.5 lg:py-4.25 lg:px-7.5 px-3 rounded-[50px] font-semibold hover:bg-card hover:text-primary border border-transparent hover:border-primary">
                        <Plus width={32} height={32}/>
                        Add Income
                    </Button>

                    <div className="flex gap-x-4">
                        <Select>
                            <SelectTrigger className="w-full min-w-46 rounded-[50px] min-h-10.25 lg:min-h-13.25 px-5 lg:px-6.25 py-4.25 text-primary font-semibold">
                                <SelectValue placeholder="Sort By" className="text-primary"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {items.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <InputGroup className="rounded-[50px] min-w-77.5 min-h-10.25 lg:min-h-13.25 px-5 lg:px-6.25 py-4.25 text-primary font-semibold border">
                            <InputGroupInput placeholder="Search..."/>
                            <InputGroupAddon align="inline-end">
                                <Search width={24} height={24} className="text-primary"/>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>

                <div className="min-h-72">
                    <Table className="rounded-lg overflow-hidden">
                        <TableHeader className="bg-primary">
                            <TableRow>
                                <TableHead className="text-white w-25">ID</TableHead>
                                <TableHead className="text-white w-50">Amount</TableHead>
                                <TableHead className="text-white w-50">Name</TableHead>
                                <TableHead className="text-white w-50">User</TableHead>
                                <TableHead className="text-white w-25">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Php 50,000.00</TableCell>
                                <TableCell>Monthly Salary</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>10/13/2026</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Php 50,000.00</TableCell>
                                <TableCell>Freelance</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>10/13/2026</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div>
                        <Pagination className="mt-12">
                            <PaginationContent>
                                <PaginationItem className="">
                                    <PaginationPrevious href="#" className="app-btn" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" className="hover:text-primary">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive className="bg-primary text-white">
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" className="hover:text-primary">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" className="app-btn"/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

            </div>
        </>
     );
}
 
export default IncomePage;