'use client';

import { format } from "date-fns";
import { useActionState, useState, useEffect } from "react";
import {
    Field,
    FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { addIncome } from "@/lib/actions/income";
import { toast } from 'sonner';

const AddIncomeForm = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [state, formAction, isPending ] = useActionState(addIncome, {
        values: {
            name: '',
            amount: '',
            date: ''
        },
        idle: true,
        errors: {},
        message: '',
        success: false
    });

    useEffect(() => {

        if(state.success) {

            toast(state.message);
        }

        console.log(state);

    }, [state.success, state.message]);

    return ( 
        <>
            {!state.success && (<p>{state.message}</p>)}
            
            <form action={formAction}>
                <Field className="mb-3.5">
                    <FieldLabel className="hidden" htmlFor="name">Name</FieldLabel>
                    <Input
                        className={`field-input ${state.errors.name ? 'border-red-500' : ''}`}
                        type="text"
                        name="name"
                        placeholder="Enter income name"
                        defaultValue={state.values.name}/>

                    {state.errors.name && (<p className="text-red-500">{state.errors.name[0]}</p>) }
                </Field>
                <Field className="mb-3.5">
                    <FieldLabel className="hidden" htmlFor="amount">Amount</FieldLabel>
                    <Input
                        className={`field-input ${state.errors.amount ? 'border-red-500' : ''}`}
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        defaultValue={state.values.amount}/>
                    {state.errors.amount && (<p className="text-red-500">{state.errors.amount[0]}</p>) }
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
                    <Input 
                        type="hidden" 
                        name="date"
                        value={date ? format(date, "yyyy-MM-dd") : ""}/>
                </Field>

                <Button type="submit" className="app-btn">
                   {isPending ? 'Loading...' : 'Submit'} 
                </Button>
            </form>
        </>
    );
}
 
export default AddIncomeForm;