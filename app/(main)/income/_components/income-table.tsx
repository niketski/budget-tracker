import { Pen, Trash } from "lucide-react"
import { Button } from "@/components/ui/button";
import prisma from '@/lib/db';
import { getAllUserIncome } from '@/lib/actions/income';
import EditIncomeDialog from "./edit-income-dialog";
import EditIncomeForm from "./edit-income-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const IncomeTable = async ({ userId }: { userId: string }) => {
    const incomeData = await getAllUserIncome(userId);

    return ( 
        <>
            <Table className="rounded-lg overflow-hidden">
                <TableHeader className="bg-primary">
                    <TableRow>
                        <TableHead className="text-white w-25">ID</TableHead>
                        <TableHead className="text-white w-50">Amount</TableHead>
                        <TableHead className="text-white w-50">Name</TableHead>
                        <TableHead className="text-white w-50">User</TableHead>
                        <TableHead className="text-white w-25">Date</TableHead>
                        <TableHead className="text-white w-25"><span className="hidden">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {incomeData.data && incomeData?.data.map(income => {

                        // format the amount to PHP currency format
                        const formattedAmount = new Intl.NumberFormat('en-PH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'PHP',
                        }).format(income.amount.toNumber());


                        return (<TableRow key={income.id}>
                            <TableCell><span className="inline-block truncate max-w-25">{income.id}</span></TableCell>
                            <TableCell>{formattedAmount}</TableCell>
                            <TableCell>{income.name}</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>{income.date.toLocaleDateString('en-US')}</TableCell>
                            <TableCell>
                                <EditIncomeDialog>
                                    <EditIncomeForm incomeData={{
                                        id: income.id,
                                        name: income.name,
                                        amount: income.amount.toString(),
                                        date: income.date.toString()
                                    }}/>
                                </EditIncomeDialog>
                                <Button variant="ghost" aria-label="Delete"><Trash size={16} color="#008235" /></Button>
                            </TableCell>
                        </TableRow>)
                    })}
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Php 50,000.00</TableCell>
                        <TableCell>Monthly Salary</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>10/13/2026</TableCell>
                        <TableCell>
                            <Button variant="ghost" aria-label="Edit"><Pen size={16} color="#008235" /></Button>
                            <Button variant="ghost" aria-label="Delete"><Trash size={16} color="#008235" /></Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Php 50,000.00</TableCell>
                        <TableCell>Monthly Salary</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>10/13/2026</TableCell>
                        <TableCell>
                            <Button variant="ghost" aria-label="Edit"><Pen size={16} color="#008235" /></Button>
                            <Button variant="ghost" aria-label="Delete"><Trash size={16} color="#008235" /></Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
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
        </>
     );
}
 
export default IncomeTable;