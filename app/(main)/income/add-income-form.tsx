'use client';

import { useState } from "react";
import {
    Field,
    FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"

const AddIncomeForm = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return ( 
        <>
            <form>
                <Field className="mb-3.5">
                    <FieldLabel className="hidden" htmlFor="name">Name</FieldLabel>
                    <Input
                        className="field-input"
                        type="text"
                        name="name"
                        placeholder="Enter income name"/>
                </Field>
                <Field className="mb-3.5">
                    <FieldLabel className="hidden" htmlFor="amount">Amount</FieldLabel>
                    <Input
                        className="field-input"
                        type="number"
                        name="amount"
                        placeholder="Enter amount"/>
                </Field>
                <Field className="mb-3.5">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="field-input text-left flex w-full items-center justify-start">
                                { date ? date.toDateString() : "Select date" }
                                <CalendarIcon className="mr-2 h-4 w-4 ml-auto text-primary" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar 
                                selected={date}
                                onSelect={setDate}
                                mode="single" 
                                className="rounded-lg border"/>
                        </PopoverContent>
                    </Popover>
                </Field>

                <Button type="submit" className="app-btn">Submit</Button>
            </form>
        </>
    );
}
 
export default AddIncomeForm;